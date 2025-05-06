const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const pool = require('../db')
const bcrypt = require('bcryptjs')
const { SESSION_DESERIALIZE_USER_QUERY: deserializeQuery, SIGNIN_USER_QUERY: loginQuery } = require('../queries/auth')

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
    try {
        const result = await pool.query(deserializeQuery, [id]);
        const user = result.rows[0];

        if (!user) {
            return done(null, false, { message: 'Utente non trovato con relativo id' });
        }

        done(null, user);
    } catch (err) {
        done(err);
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

module.exports = passport