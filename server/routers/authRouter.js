const { Router } = require('express')
const { sanitizeBody } = require('../middleware/sanitizeBody')
const validateBody = require('../middleware/validateBody')
const { signUpSchema } = require('../schemas/signUpSchema')
const { signInSchema } = require('../schemas/signInSchema')
const { signInUser, signUpNewUser, getOTP, verifyOtp } = require('../controllers/authController')
const { verifyXSRFToken } = require('../controllers/apiController')
const validateOrigin = require('../middleware/validateOrigin')
const { body } = require('express-validator')

const authRouter = Router()

authRouter.post("/signup", validateBody(signUpSchema), sanitizeBody, validateOrigin, verifyXSRFToken, signUpNewUser)
authRouter.post("/signin", validateBody(signInSchema), sanitizeBody, validateOrigin, verifyXSRFToken, signInUser)
authRouter.post(
    "/signup/getCode",
    body('mail')
        .isEmail()
        .withMessage('Invalid email format')
        .normalizeEmail(),
    sanitizeBody,
    validateOrigin,
    verifyXSRFToken,
    getOTP
)

authRouter.post(
    "/signup/verifyCode",
    body('code')
        .isNumeric()
        .withMessage('Il codice deve essere numerico.')
        .isLength({ min: 6, max: 6})
        .withMessage('Il codice deve essere di 6 cifre.')
        .escape(),
    body('clientId')
        .isString()
        .withMessage('L\'ID cliente deve essere una stringa.')
        .isAlphanumeric()
        .withMessage('L\'ID cliente deve contenere solo lettere e numeri.')
        .escape(),
    sanitizeBody,
    validateOrigin,
    verifyXSRFToken,
    verifyOtp
);


module.exports = { authRouter }