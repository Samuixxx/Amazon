const Router = require('express')
const { getAllCountries, validateAddress, getXSRFToken, setLanguage, createProduct, getHomeData, getProductsByCategory, getProductForPage, getProductsBySubcategory, addItemToCart } = require('../controllers/apiController')
const { param, body, query, validationResult } = require('express-validator')
const { sanitizeBody } = require('../middleware/sanitizeBody')
const validateOrigin = require('../middleware/validateOrigin')
const validateRequest = require('../middleware/validateRequest')
const { uploadMiddleware, multerErrorHandler } = require('../config/multer')
const i18next = require('i18next')

const apiRouter = Router()

apiRouter.get(
    "/countries/all/:lang",
    [
        param('lang')
            .isIn(['cn', 'en', 'it', 'fr', 'es', 'de'])
            .withMessage('Invalid language parameter'),
    ],
    validateRequest,
    getAllCountries
)

apiRouter.get("/xsrf-token/new", validateOrigin, getXSRFToken)

// HOME PAGE
apiRouter.get("/home/getData", validateOrigin, getHomeData)
apiRouter.get(
    "/home/getDataByCategory",
    query('categoryName')
        .isString()
        .withMessage("Category must be a string")
        .trim()
        .escape(),
    query('limit')
        .isNumeric()
        .withMessage("Limit must be a number")
        .toInt()
        .custom((value) => value <= 30)
        .withMessage("Limit can reach only 30"),
    validateRequest,
    validateOrigin,
    getProductsByCategory
)

apiRouter.get(
    "/home/getDataBySubcategory",
    query('subCategoryName')
        .isString()
        .withMessage("Category must be a string")
        .trim()
        .escape(),
    query('limit')
        .isNumeric()
        .withMessage("Limit must be a number")
        .toInt()
        .custom((value) => value <= 19)
        .withMessage("Limit can reach only 10"),
    validateRequest,
    validateOrigin,
    getProductsBySubcategory
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
    validateRequest,
    sanitizeBody,
    validateAddress
)

apiRouter.post(
    "/preferences/setlang",
    body("lang").isString().isIn(["it", "en", "es", "cn", "de", "fr"]).escape(),
    validateRequest,
    validateOrigin,
    sanitizeBody,
    setLanguage
)

// ------- STORAGE --------
apiRouter.post(
    "/products/createProduct",
    uploadMiddleware,
    createProduct,
    multerErrorHandler
)

// --------- PRODUCTS ----------
apiRouter.get(
    "/products/info/:productId",
    param('productId')
        .isNumeric()
        .withMessage(i18next.t("product.invalidIdType"))
        .custom((value) => value > 0)
        .withMessage(i18next.t("product.idLessThan0")),
    validateRequest,
    validateOrigin,
    getProductForPage
)

// -------- CART ---------
apiRouter.post(
    '/cart/user/add',
    body('productId')
        .isNumeric()
        .withMessage('Product id must be an integer')
        .trim()
        .escape(),
    body('quantity')
        .isInt({ min: 1 })
        .withMessage('Quantity must be a positive integer'),
    body('authenticated')
        .isBoolean()
        .withMessage('Authenticated must be a boolean'),
    body('cartId')
        .optional({ nullable: true })
        .isUUID()
        .withMessage('Invalid cartId format')
        .trim()
        .escape(),
    validateRequest,
    validateOrigin,
    sanitizeBody,
    addItemToCart
)



module.exports = { apiRouter }