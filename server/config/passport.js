const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const GoogleStrategy = require('passport-google-oauth20').Strategy
const pool = require('../db')
const bcrypt = require('bcryptjs')
const { SESSION_DESERIALIZE_USER_QUERY: deserializeQuery, SIGNIN_USER_QUERY: loginQuery, SEARCH_USER_GOOGLE: searchUserWithGoogleId } = require('../queries/auth')
const redis = require('../db/redisClient')
const { generateTokens } = require('../tokens/generateTokens')

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
    try {
        const result = await pool.query(deserializeQuery, [id])
        const user = result.rows[0]

        if (!user) {
            return done(null, false, { message: 'Utente non trovato con relativo id' })
        }

        done(null, user)
    } catch (err) {
        done(err)
    }
})

passport.use(new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password',
    },
    async (email, password, done) => {
        try {
            const result = await pool.query(loginQuery, [email]);
            const user = result.rows[0];

            if (!user) {
                return done(null, false, { message: 'Utente non trovato' });
            }

            const match = await bcrypt.compare(password, user.password);

            if (!match) {
                return done(null, false, { message: 'Password errata' });
            }

            return done(null, user);
        } catch (err) {
            return done(err);
        }
    }
))

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    passReqToCallback: true,
    callbackURL: `${process.env.SERVER_ORIGIN_URL}/auth/google/callback`
}, async (req, accessToken, refreshToken, profile, done) => {
    const state = req.query.state

    try {
        const result = await pool.query(searchUserWithGoogleId, [profile.id]); 
        const user = result.rows[0]

        if (state === 'signup') {
            if (!user) {
                const tempUser = {
                    googleId: profile.id,
                    email: (profile.emails && profile.emails.length > 0) ? profile.emails[0].value : null,
                    name: profile.givenName,
                    surname: profile.familyName

                }

                if (!tempUser.email) {
                    return done(null, false, { message: 'Nessun indirizzo email fornito da Google.', tempUserId: profile.id, name: profile.givenName })
                }

                try {
                    await redis.set(`tempuser:google:${profile.id}`, JSON.stringify(tempUser), 'EX', 1800)
                } catch (redisError) {
                    return done(redisError, false)
                }

                return done(null, false, { ok: true, message: 'Utente temporaneo creato. Completa la registrazione.', tempUserId: profile.id })
            } else {
                return done(null, false, { message: 'Un account è già associato a questo indirizzo Google.' })
            }
        }

        if (state === 'signin') {
            if (!user) {
                // Nessun utente trovato con questo Google ID
                return done(null, false, { ok: true, message: 'Nessun account utente collegato a questo account Google.' });
            }

            // Utente trovato, autenticazione riuscita
            return done(null, user);
        }

        // Stato non riconosciuto nella query string
        return done(null, false, { message: 'Parametro "state" non valido.' });

    } catch (error) {
        console.error('Errore durante l\'autenticazione con Google:', error);
        return done(error, false);
    }
}));




module.exports = passport