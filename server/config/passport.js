const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const GoogleStrategy = require('passport-google-oauth20').Strategy
const pool = require('../db')
const bcrypt = require('bcryptjs')
const { SESSION_DESERIALIZE_USER_QUERY: deserializeQuery, SIGNIN_USER_QUERY: loginQuery, FIND_USER_BY_GOOGLEID: searchUserWithGoogleId, FIND_USER_BY_EMAIL } = require('../queries/auth')
const redis = require('../db/redisClient')
const i18next = require('i18next')

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
    const state = req.query?.state

    if (!state) return done(null, false, { message: i18next.t('Parametro "state" mancante dalla richiesta OAuth.') })
    try {
        const result = await pool.query(searchUserWithGoogleId, [profile.id]);
        const user = result.rows[0]

        if (state === 'signup') {
            const email = profile.emails?.[0]?.value
            if (!email) return done(null, false, { message: i18next.t("No email given by google") })

            if (!user) {
                const result = await pool.query(FIND_USER_BY_EMAIL, [email])
                if (result.rows.length > 0)
                    return done(null, false, { ok: false, message: i18next.t("This email is already used by another account") })
                return done(null, false, { ok: true, message: i18next.t("Temporary user created. Complete registration."), id: profile.id, state })
            } else {
                return done(null, false, { message: i18next.t("An account is already associated with this Google address.") })
            }
        }
        else if (state === 'signin') {
            if (!user) {
                return done(null, false, { ok: true, message: 'Nessun account utente collegato a questo account Google.' });
            }

            return done(null, user, { state });
        }

        return done(null, false, { message: 'Parametro "state" non valido.' });

    } catch (error) {
        console.error('Errore durante l\'autenticazione con Google:', error);
        return done(error, false);
    }
}))




module.exports = passport