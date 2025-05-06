import validator from 'validator'
import DOMPurify from 'dompurify'
import api from '../../axios'

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

    const name = sanitize(data.name)
    const surname = sanitize(data.surname)
    const email = sanitize(data.email)
    const prefix = data.prefix
    const phone = sanitize(data.telephone)
    const password = data.password
    const confirmPassword = data.confirmpassword

    if (!validator.isAlpha(name, 'en-US', { ignore: ' ' })) {
        errors.name = t("Name characters must contain only letters")
    } else if (name.length < 2) {
        errors.name = t("Name must be at least 2 letters")
    }

    if (!validator.isAlpha(surname, 'en-US', { ignore: ' ' })) {
        errors.surname = t("Surname characters must contain only letters")
    } else if (surname.length < 2) {
        errors.surname = t("Surname must be at least 2 letters")
    }

    if (!validator.isEmail(email)) {
        errors.email = t("Invalid email format")
    }

    if (!validator.isMobilePhone(prefix + phone, 'any', { strictMode: true })) {
        errors.telephone = t("Number not valid")
    }

    if (!validator.isStrongPassword(password, strongPasswordOptions)) {
        errors.password = t("Password must be at least 8 characters long and contain uppercase, lowercase, number and symbol")
    }

    if (password !== confirmPassword) {
        errors.confirmpassword = t("Passwords do not match")
    }

    return errors
}

const validateStepTwo = async(data, t, setFormData) => {
    const errors = {}

    const country = data.country
    const addressLineOne = sanitize(data.addressone)
    const addressLineTwo = sanitize(data.addresstwo)
    const city = sanitize(data.city)
    const postalcode = sanitize(data.postalcode)
    const specifications = sanitize(data.specifications)

    if (!country) {
        errors.country = t("Country is required")
    }

    if (!addressLineOne || !validator.isLength(addressLineOne, { min: 3 })) {
        errors.addressone = t("Address must be at least 3 characters long")
    } else if (!validator.matches(addressLineOne, /^[a-zA-Z0-9\s/\-,.]+$/)) {
        errors.addressone = t("Address can only contain letters, numbers, spaces, slashes, hyphens, commas, and periods")
    }

    if (addressLineTwo && !validator.matches(addressLineTwo, /^[a-zA-Z0-9\s/\-,.]*$/)) {
        errors.addresstwo = t("Second address line can only contain letters, numbers, spaces, slashes, hyphens, commas, and periods")
    }

    if (!city || !validator.isAlpha(city.replace(/\s/g, ''))) {
        errors.city = t("City name must contain only letters")
    }

    if (!postalcode || !validator.isPostalCode(postalcode, 'any')) {
        errors.postalcode = t("Invalid postal code")
    }

    // Specifications: optional max length
    if (specifications && !validator.isLength(specifications, { max: 300 })) {
        errors.specifications = t("Specifications can't be more than 300 characters")
    }

    if (Object.keys(errors).length === 0) {
        const requestBody = [addressLineOne, addressLineTwo, city, postalcode, country].join(",")
        const request = await api.post("/api/address/validateaddress", JSON.stringify({ address: requestBody }))
        const response = request.data 
        console.log(response)
        if (response.ok) setFormData(prev => ({
            ...prev, 
            coordinates : {
                ...prev.coordinates,
                latitude: parseFloat(response.latitude), 
                longitude: parseFloat(response.longitude)
            }
        }))
    }

    return errors
}

const handleFinalSubmit = async (formData) => {

    const requestBody = {
        name: formData.name,
        surname: formData.surname,
        email: formData.email,
        fullNumber: formData.prefix + formData.telephone,
        password: formData.password,
        confirmpassword: formData.confirmpassword,
        country: formData.country,
        addressone: formData.addressone,
        addresstwo: formData.addresstwo,
        city: formData.city,
        postalcode: formData.postalcode,
        specifications: formData.specifications,
        coordinates: formData.coordinates,
        termsconfirm: formData.termsconfirm
    }

    try {
        const request = await api.post("/api/auth/signup", requestBody)
        const response = request.data

        if (response.ok) {
            console.log("Registrazione riuscita!")
        } else {
            console.error("Errore nella registrazione:", response.message)
        }
    } catch (error) {
        console.error("Errore di rete:", error)
    }
}

const customStyles = {
    control: (provided, state) => ({
        ...provided,
        backgroundColor: state.isFocused ? 'rgba(255, 255, 255, 0.13)' : 'rgba(255, 255, 255, 0.07)',
        borderColor: state.isFocused ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.1)',
        boxShadow: state.isFocused ? '0 0 5px rgba(8, 7, 16, 0.6)' : 'none',
        '&:hover': {
            borderColor: 'rgba(255, 255, 255, 0.1)',
        }
    }),

    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected ? 'rgba(255, 255, 255, 0.13)' : (state.isFocused ? 'rgba(255, 255, 255, 0.07)' : 'white'),
        color: state.isSelected ? '#080710' : '#a0a0a0',
        padding: '10px',
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.13)',
        }
    }),

    menu: (provided) => ({
        ...provided,
        backgroundColor: 'white', // Imposta il background del menu su bianco per rimuovere la trasparenza
        borderRadius: '4px',
        boxShadow: '0 8px 16px rgba(8, 7, 16, 0.6)',
        zIndex: 9999, // Mantiene lo z-index alto per il menu
    }),

    input: (provided) => ({
        ...provided,
        color: '#e5e5e5',
        padding: '5px 10px',
    }),

    multiValue: (provided) => ({
        ...provided,
        backgroundColor: 'rgba(255, 255, 255, 0.13)',
        color: '#080710',
    }),

    multiValueRemove: (provided) => ({
        ...provided,
        color: '#fff',
        '&:hover': {
            backgroundColor: '#d9534f',
            color: '#fff',
        }
    }),

    singleValue: (provided) => ({
        ...provided,
        color: '#e5e5e5',
    }),

    placeholder: (provided) => ({
        ...provided,
        color: '#e5e5e5',
    }),
}

const getStates = async (i18n) => {
    try {
        const response = await api.get(`/api/countries/all/${i18n.language.split('-')[0]}`)
        const data = response.data

        if (data.ok) {
            if (Array.isArray(data.states) && data.states.length > 0) {
                return data.states
            } else {
                console.error('Nessuno stato trovato.')
                return []
            }
        } else {
            console.error('Errore nella risposta del server:', data.error)
            return []
        }
    } catch (error) {
        console.error('Errore durante la richiesta:', error)
        return []
    }
}

export { customStyles, getStates, validateStepOne, validateStepTwo, handleFinalSubmit }
