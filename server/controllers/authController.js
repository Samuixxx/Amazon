const pool = require('../db')
const redis = require('../db/redisClient')
const bcrypt = require('bcryptjs')
const passport = require('../config/passport')
const { SIGNUP_USER_QUERY } = require('../queries/auth')
const { generateTokens } = require('../tokens/generateTokens')
const { generateOtp } = require('../utils/otp')
const { v4: uuidv4 } = require('uuid')
const sendVerificationMail = require('../utils/mailer')

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
        const { userID, name, email, country, cookiesaccepted } = newUser

        req.login(newUser, async (err) => {
            if (err) return res.status(500).json({ message: 'Errore nel login automatico' });

            const { accessToken, refreshToken } = generateTokens(userID)

            res.cookie('access_token', accessToken, {
                secure: process.env.NODE_ENV === "production",
                httpOnly: true,
                sameSite: 'Strict',
                maxAge: 15 * 60 * 1000 // 15 minuti
            })

            res.cookie('refresh_token', refreshToken, {
                secure: process.env.NODE_ENV === "production",
                httpOnly: true,
                sameSite: 'Strict',
                maxAge: 7 * 24 * 60 * 60 * 1000 // 7 giorni
            })

            req.session.userID = userID

            // Gestione corretta di Redis
            try {
                await redis.set(`user${userID}`, JSON.stringify(newUser))
            } catch (redisError) {
                console.error('Errore Redis:', redisError);  // log dell'errore
            }
            res.status(201).json({
                ok: true,
                message: 'User registered',
                route: "/",
                user: {
                    name,
                    email,
                    country,
                    cookiesAccepted: cookiesaccepted
                }
            })
        })
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

            const { userID, name, email, country, cookiesaccepted } = user
            const { accessToken, refreshToken } = generateTokens(userID)

            res.cookie('access_token', accessToken, {
                secure: process.env.NODE_ENV === "production",
                httpOnly: true,
                sameSite: 'None',
                maxAge: 15 * 60 * 1000 // 15 minuti
            })

            res.cookie('refresh_token', refreshToken, {
                secure: process.env.NODE_ENV === "production",
                httpOnly: true,
                sameSite: 'None',
                maxAge: 7 * 24 * 60 * 60 * 1000 // 7 giorni
            })

            try {
                redis.set(`user${userID}`, JSON.stringify(user))
            } catch (redisError) {
                console.error('Errore di redis')
            }

            req.session.userID = userID

            return res.json({ 
                ok: true, 
                route: "/",
                user: {
                    name,
                    email,
                    country,
                    cookiesAccepted: cookiesaccepted
                }
            })
        })

    })(req, res, next)
}

const getOTP = async (req, res) => {
    const userMail = req.body.mail
    const userLanguage = req.cookies['usr.lang'] || 'en'
    const otp = generateOtp()
    const clientId = uuidv4()

    try {
        sendVerificationMail(userMail, otp, userLanguage)
        await redis.set(`otp:${clientId}`, otp, 'EX', 300)
        await redis.set(`otp:attempts:${clientId}`, 3)
        res.json({ ok: true, clientId })
    } catch (error) {
        res.status(500).json({ ok: false, message: `Redis error: ${error.message}` })
    }
}

const verifyOtp = async (req, res) => {
    const { code, clientId } = req.body

    const clientAttemptsKey = `otp:attempts:${clientId}`
    const attempts = await redis.get(clientAttemptsKey)
    if(!attempts) {
        await redis.del(clientAttemptsKey)
        return res.status(400).json({ ok: false, message: 'Attempts finished, ask for another code'})
    }

    const clientKey = `otp:${clientId}`
    const ttlMilliseconds = await redis.pTTL(clientKey)
    if(ttlMilliseconds === -2) return res.status(401).json({ ok: false, message: 'The code is expired, ask for another code'})

    const clientCode = await redis.get(clientKey)
    if(!clientCode) return res.status(400).json({ ok: false, message: 'No codes for given client id'})

    if(code !== clientCode) {
        await redis.set(clientAttemptsKey, attempts - 1)
        return res.status(401).json({ ok: false, message: `Wrong code, ${attempts} attempts left`})
    }
    
    await redis.del(clientAttemptsKey)
    await redis.del(clientKey)
    res.json({ ok: true })
}



module.exports = { signInUser, signUpNewUser, getOTP, verifyOtp }