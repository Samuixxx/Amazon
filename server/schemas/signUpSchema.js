const Joi = require('joi')
const { parsePhoneNumberFromString } = require('libphonenumber-js')
const { postcodeValidator } = require('postcode-validator')

const signUpSchema = Joi.object({
    name: Joi.string().min(2).max(50).required(),
    surname: Joi.string().min(2).max(50).required(),
    email: Joi.string().email().required(),
    fullNumber: Joi.string().custom((value, helpers) => {
        const phone = parsePhoneNumberFromString(value);
        if (!phone || !phone.isValid()) {
            return helpers.message("The phone number is not valid")
        }
        return value
    }),
    password: Joi.string().min(8).required(),
    confirmpassword: Joi.valid(Joi.ref('password')).required().messages({
        'any.only': 'Passwords do not match',
    }),
    country: Joi.string().min(2).max(2).uppercase().required(),
    addressone: Joi.string().min(5).required(),
    addresstwo: Joi.string().allow('', null),
    city: Joi.string().required(),
    postalcode: Joi.string().custom((value, helpers) => {
        const { country } = helpers.state.ancestors[0]

        const isValid = postcodeValidator(value, country)

        if (!isValid) {
            return helpers.error('any.invalid')
        }
        return value;  // Restituisci il valore valido
    }),
    specifications: Joi.string().allow('', null).max(300),
    coordinates: Joi.object({
        latiditude: Joi.number().required(),
        longitude: Joi.number().required(),
    }),
    termsconfirm: Joi.object({
        terms: Joi.boolean().valid(true).required(),
        privacy: Joi.boolean().valid(true).required(),
        cookies: Joi.boolean().valid(true).required(),
        marketing: Joi.boolean(), // opzionale
    }),
})

module.exports = { signUpSchema }
