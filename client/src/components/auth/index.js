import validator from 'validator'
import DOMPurify from 'dompurify'

const strongPasswordOptions = {
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1
}

const sanitize = (value) => DOMPurify.sanitize(value.trim())

const validateStepOne = (data, t) => {
    const errors = {}

    const name = sanitize(data.uname)
    const surname = sanitize(data.surname)
    const email = sanitize(data.mail)
    const phone = sanitize(data.telephone)
    const password = data.psw
    const confirmPassword = data.cpsw

    if (!validator.isAlpha(name, 'en-US', { ignore: ' ' })) {
        errors.uname = t("Name characters must contain only letters")
    } else if (name.length < 2) {
        errors.uname = t("Name must be at least 2 letters")
    }

    if (!validator.isAlpha(surname, 'en-US', { ignore: ' ' })) {
        errors.surname = t("Surname characters must contain only letters")
    } else if (surname.length < 2) {
        errors.surname = t("Surname must be at least 2 letters")
    }

    if (!validator.isEmail(email)) {
        errors.mail = t("Invalid email format")
    }

    if (!validator.isMobilePhone(phone, 'any', { strictMode: true })) {
        errors.telephone = t("Invalid phone number")
    }

    if (!validator.isStrongPassword(password, strongPasswordOptions)) {
        errors.psw = t("Password must be at least 8 characters long and contain uppercase, lowercase, number and symbol")
    }

    if (password !== confirmPassword) {
        errors.cpsw = t("Passwords do not match")
    }

    return errors
}

export default validateStepOne
