const Router = require('express')
const { getAllCountries, validateAddress, signUpNewUser } = require('../controllers/apiController')
const { param, body, validationResult } = require('express-validator')
const { sanitizeBody } = require('../middleware/sanitizeBody')
const validateBody = require('../middleware/validateBody')
const { signUpSchema } = require('../schemas/signUpSchema')

const apiRouter = Router()

apiRouter.get(
    "/countries/all/:lang",
    [
        param('lang')
            .isIn(['cn', 'en', 'it', 'fr', 'es', 'de'])
            .withMessage('Invalid language parameter'),
    ],
    (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        next()
    },
    getAllCountries
)

// POST ROUTES
apiRouter.post(
    "/address/validateaddress",
    body("address")
        .isString()
        .isLength({ min: 5 })
        .withMessage("Address must be a string and at least 5 characters long")
        .trim()
        .escape(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array().map(error => ({
                    field: error.param,
                    message: error.msg
                }))
            })
        }
        next()
    },
    sanitizeBody,
    validateAddress
)

//
//  AUTH
//
apiRouter.post("/auth/signup", validateBody(signUpSchema), sanitizeBody, signUpNewUser)


module.exports = apiRouter