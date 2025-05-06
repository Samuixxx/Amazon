const pool = require('../db')
const redis = require('../db/redisClient')
const bcrypt = require('bcryptjs')
const passport = require('../config/passport')
const { SIGNUP_USER_QUERY } = require('../queries/auth')
const { generateTokens } = require('../tokens/generateTokens')

const signUpNewUser = async (req, res) => {
    const {
        name,
        surname,
        email,
        fullNumber,
        password,
        country,
        addressone,
        addresstwo,
        city,
        postalcode,
        specifications,
        coordinates,
        termsconfirm
    } = req.body

    const { terms, privacy, cookies, marketing } = termsconfirm
    const { latitude, longitude } = coordinates
    const address = `${addressone || ''} ${addresstwo || ''}`.trim()

    try {
        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(password, salt)

        const result = await pool.query(SIGNUP_USER_QUERY, [
            name,
            surname,
            email,
            fullNumber,
            hashedPassword,
            country,
            address,
            city,
            postalcode,
            specifications,
            latitude,
            longitude,
            terms,
            privacy,
            cookies,
            marketing
        ])

        const newUser = result.rows[0]
        const userID = newUser.id

        req.login(newUser, async(err) => {
            if (err) return res.status(500).json({ message: 'Errore nel login automatico' });

            const { accessToken, refreshToken } = generateTokens(userID)

            res.cookie('access_token', accessToken, {
                httpOnly: true,
                sameSite: 'Strict',
                maxAge: 15 * 60 * 1000 // 15 minuti
            })

            res.cookie('refresh_token', refreshToken, {
                httpOnly: true,
                sameSite: 'Strict',
                maxAge: 7 * 24 * 60 * 60 * 1000 // 7 giorni
            })

            req.session.userID = userID
            req.session.isAuthenticated = true

            // Gestione corretta di Redis
            try {
                await redis.set(`user${userID}`, JSON.stringify(newUser), { ttl: 15 * 60 * 1000 })
            } catch (redisError) {
                console.error('Errore Redis:', redisError);  // log dell'errore
            } 
            res.status(201).json({
                ok: true,
                message: 'User registered',
            });
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const signInUser = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) { return next(err) }
        if (!user) { return res.status(401).json(info) }

        req.login(user, (err) => {
            if (err) { return next(err); }

            const userID = user.id
            const { accessToken, refreshToken } = generateTokens(userID)

            res.cookie('access_token', accessToken, {
                httpOnly: true,
                sameSite: 'Strict',
                maxAge: 15 * 60 * 1000 // 15 minuti
            })

            res.cookie('refresh_token', refreshToken, {
                httpOnly: true,
                sameSite: 'Strict',
                maxAge: 7 * 24 * 60 * 60 * 1000 // 7 giorni
            })

            try {
                redis.set(`user${userID}`, JSON.stringify(user), { ttl: 15 * 60 * 1000 })
            } catch (redisError) {
                console.error('Errore di redis')
            }

            req.session.userID = userID
            req.session.isAuthenticated = true

            return res.json({ message: 'Login successful', user: user });
        })

    }) (req, res, next)
}

module.exports = { signUpNewUser, signInUser }