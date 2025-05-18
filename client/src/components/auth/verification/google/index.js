import validator from 'validator'
import DOMPurify from 'dompurify'
import i18n from '../../../../i18n'

const sanitize = (value) => {
    return DOMPurify.sanitize(value)
}

const strongPasswordOptions = {
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
}

const validateStepOne = (data) => {
    const errors = {}

    const fullNumber = data.prefix + sanitize(data.telephone)
    const password = data.password.trim()
    const confirmPassword = data.confirmpassword.trim()

    if (!validator.isMobilePhone(fullNumber, 'any')) {
        errors.telephone = i18n.t('Number not valid')
    }

    if (!validator.isStrongPassword(password, strongPasswordOptions)) {
        errors.password = i18n.t("Password must be at least 8 characters long and contain uppercase, lowercase, number and symbol")
    }

    if (password !== confirmPassword) {
        errors.confirmpassword = i18n.t("Passwords do not match")
    }

    return errors
}
