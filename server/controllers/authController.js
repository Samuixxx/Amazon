const pool = require('../db')
const redis = require('../db/redisClient')
const bcrypt = require('bcryptjs')
const passport = require('../config/passport')
const jwt = require('jsonwebtoken')
const { SIGNUP_USER_QUERY, FIND_USER_BY_TELEPHONE } = require('../queries/auth')
const { generateTokens } = require('../tokens/generateTokens')
const { generateOtp } = require('../utils/otp')
const { v4: uuidv4 } = require('uuid')
const { sendVerificationMail } = require('../utils/mailer')
const { sendVerificationMessage } = require('../utils/messages')
const { sendVerificationCall } = require('../utils/calls')
const i18next = require('i18next')

const signUpNewUser = async (req, res) => {

    try {
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
            termsconfirm,
            socialSignUp
        } = req.body

        if (!coordinates || !termsconfirm) {
            return res.status(400).json({ message: "Missing coordinates or terms confirmation" })
        }

        const { terms, privacy, cookies, marketing } = termsconfirm
        const { googleid, facebookid, microsoftid } = socialSignUp
        const { latitude, longitude } = coordinates
        const address = `${addressone || ''} ${addresstwo || ''}`.trim()
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
            marketing,
            googleid || null,
            facebookid || null,
            microsoftid || null,
            true
        ])

        const newUser = result.rows[0]
        const { userID, userDisplayName, userEmail, userCountry, cookiesaccepted } = newUser

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
                    userDisplayName,
                    userEmail,
                    userCountry,
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
                    userDisplayName: name,
                    userEmail: email,
                    userCountry: country,
                    userCookiesAccepted: cookiesaccepted
                }
            })
        })

    })(req, res, next)
}

const getOTPFromEmail = async (req, res) => {
    const userMail = req.body.mail
    const userLanguage = req.cookies['usr.lang'] || 'en'
    const otp = generateOtp()
    const clientId = uuidv4()

    try {
        sendVerificationMail(userMail, otp, userLanguage)
        await redis.set(`otp:email:${clientId}`, otp, 'EX', 300)
        await redis.set(`otp:email:attempts:${clientId}`, 3)
        res.json({ ok: true, clientId })
    } catch (error) {
        res.status(500).json({ ok: false, message: `Redis error: ${error.message}` })
    }
}

const verifyEmailOtp = async (req, res) => {
    const { code, clientId } = req.body

    const clientAttemptsKey = `otp:email:attempts:${clientId}`
    const attemptsStr = await redis.get(clientAttemptsKey)
    const attempts = parseInt(attemptsStr, 10)

    if (isNaN(attempts) || attempts <= 0) {
        await redis.del(clientAttemptsKey)
        return res.status(400).json({ ok: false, message: 'Attempts finished, ask for another code' })
    }

    const clientKey = `otp:email:${clientId}`
    const ttlMilliseconds = await redis.pTTL(clientKey)
    if (ttlMilliseconds === -2)
        return res.status(401).json({ ok: false, message: 'The code is expired, ask for another code' })

    const clientCode = await redis.get(clientKey)
    if (!clientCode)
        return res.status(400).json({ ok: false, message: 'No codes for given client id' })

    if (code !== clientCode) {
        const newAttempts = attempts - 1
        await redis.set(clientAttemptsKey, newAttempts)
        return res.status(401).json({
            ok: false,
            message: `Wrong code, ${newAttempts} attempt${newAttempts === 1 ? '' : 's'} left`
        })
    }

    await redis.del(clientAttemptsKey)
    await redis.del(clientKey)
    res.json({ ok: true })
}


const getOTPFromMessage = async (req, res) => {
    const phoneNumber = req.body.phoneNumber.trim()
    const userLanguage = req.cookies['usr.lang'] || 'en'
    const otp = generateOtp()
    const clientId = uuidv4()

    try {
        sendVerificationMessage(otp, phoneNumber, userLanguage)
        await redis.set(`otp:message:${clientId}`, otp, 'EX', 300)
        await redis.set(`otp:message:attempts:${clientId}`, 3)
        res.json({ ok: true, clientId })
    } catch (error) {
        res.status(500).json({ ok: false, message: `Redis error: ${error.message}` })
    }

}

const verifySmsOtp = async (req, res) => {
    const { code, clientId } = req.body

    const clientAttemptsKey = `otp:message:attempts:${clientId}`
    const attemptsStr = await redis.get(clientAttemptsKey)
    const attempts = parseInt(attemptsStr, 10)

    if (isNaN(attempts) || attempts <= 0) {
        await redis.del(clientAttemptsKey)
        return res.status(400).json({ ok: false, message: 'Attempts finished, ask for another code' })
    }

    const clientKey = `otp:message:${clientId}`
    const ttlMilliseconds = await redis.pTTL(clientKey)
    if (ttlMilliseconds === -2)
        return res.status(401).json({ ok: false, message: 'The code is expired, ask for another code' })

    const clientCode = await redis.get(clientKey)
    if (!clientCode)
        return res.status(400).json({ ok: false, message: 'No codes for given client id' })

    if (code !== clientCode) {
        const newAttempts = attempts - 1
        await redis.set(clientAttemptsKey, newAttempts)
        return res.status(401).json({
            ok: false,
            message: `Wrong code, ${newAttempts} attempt${newAttempts === 1 ? '' : 's'} left`
        })
    }

    await redis.del(clientAttemptsKey)
    await redis.del(clientKey)
    res.json({ ok: true })
}


const getOTPFromCall = async (req, res) => {
    const phoneNumber = req.body.phoneNumber
    const userLanguage = req.cookies['usr.lang'] || 'en'
    const otp = generateOtp()
    const clientId = uuidv4()

    try {
        sendVerificationCall(otp, phoneNumber, userLanguage)
        await redis.set(`otp:call:${clientId}`, otp, 'EX', 300)
        await redis.set(`otp:call:attempts:${clientId}`, 3)
        res.json({ ok: true, clientId })
    } catch (error) {
        res.status(500).json({ ok: false, message: `Redis error: ${error.message}` })
    }
}

const verifyCallOtp = async (req, res) => {
    const { code, clientId } = req.body
    const clientAttemptsKey = `otp:call:attempts:${clientId}`
    const attemptsStr = await redis.get(clientAttemptsKey)
    const attempts = parseInt(attemptsStr, 10)

    if (isNaN(attempts) || attempts <= 0) {
        await redis.del(clientAttemptsKey)
        return res.status(400).json({ ok: false, message: 'Attempts finished, ask for another code' })
    }

    const clientKey = `otp:call:${clientId}`
    const ttlMilliseconds = await redis.pTTL(clientKey)
    if (ttlMilliseconds === -2)
        return res.status(401).json({ ok: false, message: 'The code is expired, ask for another code' })

    const clientCode = await redis.get(clientKey)
    if (!clientCode)
        return res.status(400).json({ ok: false, message: 'No codes for given client id' })

    if (code !== clientCode) {
        const newAttempts = attempts - 1
        await redis.set(clientAttemptsKey, newAttempts)
        return res.status(401).json({
            ok: false,
            message: `Wrong code, ${newAttempts} attempt${newAttempts === 1 ? '' : 's'} left`
        })
    }

    await redis.del(clientAttemptsKey)
    await redis.del(clientKey)
    res.json({ ok: true })
}


const getUserSocialSignUpInfo = async (req, res) => {
    const { method } = req.params

    const mapper = {
        google: 'gg',
        facebook: 'fk',
        microsoft: 'ms'
    }

    const tokenKey = `${mapper[method]}_sp_tn`
    const token = req.cookies?.[tokenKey]

    if (!token) {
        return res.status(401).json({
            ok: false,
            message: i18next.t("The request presents no token.")
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const userSocialID = decoded.id || decoded.payload?.id

        if (!userSocialID) {
            return res.status(400).json({
                ok: false,
                message: i18next.t("No id found")
            })
        }
        try {
            const profile = await redis.get(`tempuser:google:${userSocialID}`)
            if (!profile) {
                return res.status(401).json({ ok: false, message: i18next.t("No profile found for given id") })
            }

            return res.json({ ok: true, profile: JSON.parse(profile) })
        } catch (redisError) {
            res.status(500).json({ ok: false, message: i18next.t("Redis error") })
        }

    } catch (err) {
        return res.status(403).json({
            ok: false,
            message: i18next.t("Invalid or expired token")
        })
    }
}

const isPhoneNumberAlreadyUsed = async (req, res) => {
    const { phone } = req.body

    try {
        const result = await pool.query(FIND_USER_BY_TELEPHONE, [phone])
        const isAlreadyUsed = result.rows.length > 0
        if (isAlreadyUsed) {
            return res.status(400).json({ ok: false, message: i18next.t("This phone number is already used by another user") })
        }

        return res.json({ ok: true })
    } catch (error) {
        console.error("Error checking the phone number", error)
        res.status(500).json({ ok: false, message: i18next.t("Error in the number verification process") })
    }
}

module.exports = { signInUser, signUpNewUser, getOTPFromEmail, verifyEmailOtp, getOTPFromMessage, verifySmsOtp, getOTPFromCall, verifyCallOtp, getUserSocialSignUpInfo, isPhoneNumberAlreadyUsed }