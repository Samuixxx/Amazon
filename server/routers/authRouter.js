const { Router } = require('express')
const { body, param } = require('express-validator')
const passport = require('passport')
const jwt = require('jsonwebtoken')
const i18next = require('i18next')
const { sanitizeBody } = require('../middleware/sanitizeBody')
const validateBody = require('../middleware/validateBody')
const { signUpSchema } = require('../schemas/signUpSchema')
const { signInSchema } = require('../schemas/signInSchema')
const { signInUser, signUpNewUser, getOTPFromEmail, verifyEmailOtp, getOTPFromMessage, verifySmsOtp, getOTPFromCall, verifyCallOtp, getUserSocialSignUpInfo, isPhoneNumberAlreadyUsed } = require('../controllers/authController')
const { verifyXSRFToken } = require('../controllers/apiController')
const validateOrigin = require('../middleware/validateOrigin')
const validateRequest = require('../middleware/validateRequest')
const validateUuid = require('../middleware/validateUuid')


const authRouter = Router()

authRouter.post("/signup", validateBody(signUpSchema), sanitizeBody, validateOrigin, verifyXSRFToken, signUpNewUser)
authRouter.post("/signin", validateBody(signInSchema), sanitizeBody, validateOrigin, verifyXSRFToken, signInUser)
authRouter.post(
    "/signup/getOtpToEmail",
    body('mail')
        .isEmail()
        .withMessage('Invalid email format')
        .normalizeEmail(),
    validateRequest,
    sanitizeBody,
    validateOrigin,
    verifyXSRFToken,
    getOTPFromEmail
)

authRouter.post(
    "/signup/verifyEmailOtp",
    body('code')
        .isNumeric()
        .withMessage('Il codice deve essere numerico.')
        .isLength({ min: 6, max: 6 })
        .withMessage('Il codice deve essere di 6 cifre.')
        .escape(),
    body('clientId')
        .isString()
        .withMessage('L\'ID cliente deve essere una stringa.')
        .escape(),
    validateRequest,
    validateUuid,
    sanitizeBody,
    validateOrigin,
    verifyXSRFToken,
    verifyEmailOtp
)

authRouter.post(
    "/signup/getOtpToSms",
    body('phoneNumber')
        .isString()
        .withMessage('Il numero di telegono dev\'essere una stringa.')
        .escape(),
    validateRequest,
    sanitizeBody,
    validateOrigin,
    verifyXSRFToken,
    getOTPFromMessage
)

authRouter.post(
    "/signup/verifySmsOtp",
    body('code')
        .isNumeric()
        .withMessage('Il codice deve essere numerico.')
        .isLength({ min: 6, max: 6 })
        .withMessage('Il codice deve essere di 6 cifre.')
        .escape(),
    body('clientId')
        .isString()
        .withMessage('L\'ID cliente deve essere una stringa.')
        .escape(),
    validateRequest,
    validateUuid,
    sanitizeBody,
    validateOrigin,
    verifyXSRFToken,
    verifySmsOtp
)

authRouter.post(
    "/signup/getOtpToCall",
    body('phoneNumber')
        .isString()
        .withMessage('Il numero di telegono dev\'essere una stringa.')
        .escape(),
    validateRequest,
    sanitizeBody,
    validateOrigin,
    verifyXSRFToken,
    getOTPFromCall
)

authRouter.post(
    "/signup/verifyCallOtp",
    body('code')
        .isNumeric()
        .withMessage('Il codice deve essere numerico.')
        .isLength({ min: 6, max: 6 })
        .withMessage('Il codice deve essere di 6 cifre.')
        .escape(),
    body('clientId')
        .isString()
        .withMessage('L\'ID cliente deve essere una stringa.')
        .escape(),
    validateRequest,
    validateUuid,
    sanitizeBody,
    validateOrigin,
    verifyXSRFToken,
    verifyCallOtp
)

// AUTH UTILS
authRouter.get(
    "/user/getUserSocialInfo/:method",
    validateOrigin,
    param('method')
        .isIn(['google', 'facebook', 'microsoft'])
        .withMessage(() => i18next.t('Sign up method not allowed'))
        .escape(),
    validateRequest,
    getUserSocialSignUpInfo
)

authRouter.post(
    "/phonenumber/isUsed",
    body('phone')
        .matches(/^\+?[0-9]+$/)
        .withMessage(i18next.t("Phone number can contain only '+' and numbers"))
        .trim()
        .escape(),
    validateRequest,
    validateOrigin,
    verifyXSRFToken,
    sanitizeBody,
    isPhoneNumberAlreadyUsed
)

// PASSPORT AUTH ENDPOINTS
authRouter.get(
    "/signup/google",
    validateOrigin,
    passport.authenticate('google', {
        scope: ['profile', 'email'],
        state: 'signup'
    })
)

authRouter.get(
    "/signin/google",
    validateOrigin,
    passport.authenticate('google', {
        scope: ['profile', 'email'],
        state: 'signin'
    })
)


authRouter.get(
    "/google/callback",
    (req, res, next) => {
        passport.authenticate('google', { failureRedirect: '/login' }, (err, user, info) => {
            if (err) {
                return res.redirect(`${process.env.CLIENT_ORIGIN_URL}/auth?error=${encodeURIComponent('Errore durante l\'autenticazione')}`)
            }

            const { message, id, state } = info || {}
            
            if (state === 'signup' && id) {
                const token = jwt.sign(
                    { id },
                    process.env.JWT_SECRET,
                    {
                        expiresIn: '30m'
                    }
                )

                res.cookie('gg_sp_tn', token, {
                    sameSite: 'none',
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    maxAge: 60 * 30 * 1000
                })

                return res.redirect(`${process.env.CLIENT_ORIGIN_URL}/finishRegistrationWithGoogle`)
            } else if (state === 'signin' && user) {
                const token = jwt.sign(
                    { id },
                    process.env.JWT_SECRET,
                    {
                        expiresIn: '30m'
                    }
                )

                res.cookie('ur_pf_tk', token, {
                    sameSite: 'none',
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    maxAge: 60 * 30 * 1000
                })
                return res.redirect(`${process.env.CLIENT_ORIGIN_URL}/`)
            }
        })(req, res, next)
    }
)


module.exports = { authRouter }