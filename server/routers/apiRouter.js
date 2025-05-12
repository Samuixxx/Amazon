const Router = require('express')
const { getAllCountries, validateAddress, getXSRFToken, setLanguage } = require('../controllers/apiController')
const { param, body, validationResult } = require('express-validator')
const { sanitizeBody } = require('../middleware/sanitizeBody')
const validateOrigin = require('../middleware/validateOrigin')

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

apiRouter.get("/xsrf-token/new", validateOrigin, getXSRFToken)

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

apiRouter.post(
            "/preferences/setlang", 
            body("lang").isString().isIn(["it", "en", "es", "cn", "de", "fr"]).escape(),
            sanitizeBody,
            setLanguage           
            )



module.exports = { apiRouter }