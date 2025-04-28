import validator from 'validator'
import DOMPurify from 'dompurify'
import { useTranslation } from 'react-i18next'

const validateSignUp = (data) => {
    const errors = {}
    const { t } = useTranslation()

    // Name
    const name = DOMPurify.sanitize(data.uname.trim())
    if (!validator.isAlpha(name, 'en-US', { ignore: ' ' })) {
        errors.uname = t("Name characters must contain only letters")
    } else if (name.length < 2) {
        errors.uname = t("Name must be at least 2 letters")
    }

    // Surname
    const surname = DOMPurify.sanitize(data.surname.trim())
    if (!validator.isAlpha(surname, 'en-US', { ignore: ' ' })) {
        errors.surname = t("Surname characters must contain only letters")
    } else if (surname.length < 2) {
        errors.surname = t("Surname must be at least 2 letters")
    }

    // Email
    const email = DOMPurify.sanitize(data.mail.trim())
    if (!validator.isEmail(email)) {
        errors.mail = t("Invalid email format")
    }

    // Phone number
    const phone = DOMPurify.sanitize(data.phone.trim())
    if (!validator.isMobilePhone(phone, 'any', { strictMode: true })) {
        errors.phone = t("Invalid phone number")
    }

    // Password
    const password = data.psw
    if (!validator.isStrongPassword(password, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    })) {
        errors.psw = t("Password must be at least 8 characters long and contain uppercase, lowercase, number and symbol")
    }

    // Confirm Password
    const confirmPassword = data.cpsw
    if (password !== confirmPassword) {
        errors.cpsw = t("Passwords do not match")
    }

    return errors
}

export default validateSignUp
