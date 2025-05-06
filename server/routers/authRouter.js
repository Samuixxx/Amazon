const { Router } = require('express')
const { sanitizeBody } = require('../middleware/sanitizeBody')
const validateBody = require('../middleware/validateBody')
const { signUpSchema } = require('../schemas/signUpSchema')
const { signInSchema } = require('../schemas/signInSchema')
const { signUpNewUser, signInUser } = require('../controllers/authController')

const authRouter = Router()

authRouter.post("/signup", validateBody(signUpSchema), sanitizeBody, signUpNewUser)
authRouter.post("/signin", signInUser)

module.exports = { authRouter }