import './SignUpGoogle.scss'
import { useTranslation } from "react-i18next"
import Select from 'react-select'
import { FormContext } from '../../../../context/signup/SignUpContext'
import { useContext, useEffect, useState, useRef } from "react"
import { customStyles, getStates, validateStepTwo } from '.'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons'

const SignUpGoogleStepTwo = ({ onNext, onBack }) => {
    const { t, i18n } = useTranslation()
    const { formData, setFormData } = useContext(FormContext)
    const [allCountries, setAllCountries] = useState([])
    const [errors, setErrors] = useState({})
    const formRef = useRef(null)

    useEffect(() => {
        const fetchStates = async () => {
            const countries = await getStates(i18n)
            setAllCountries(countries)
        }
        fetchStates()
    }, [i18n])

    const handleChange = ({ target }) => {
        const { name, value, classList } = target;
        setFormData(prev => ({ ...prev, [name]: value }))
        classList.toggle("filled", value.trim() !== "")
    };

    const handleCountryChange = (selectedOption) => {
        setFormData((prev) => ({ ...prev, country: selectedOption.value }))
    }

    const handleProceed = async(e) => {
        e.preventDefault()
        const validation = await validateStepTwo(formData, setFormData)
        setErrors(validation)
        if (!Object.keys(validation).length) onNext()
    }

    useEffect(() => {
        if (formRef.current) {
            const inputContainers = formRef.current.querySelectorAll(".input-container");
            inputContainers.forEach(container => {
                const input = container.querySelector('.input-field');
                if (input) {
                    input.classList.toggle('filled', formData[input.name]?.trim() !== '');
                }
            });
        }
    }, [formData])

    return (
        <form className="signup-form" ref={formRef} onSubmit={handleProceed}>
            <span className="signup-go-back-span" onClick={onBack}>
                <FontAwesomeIcon icon={faCircleArrowLeft} size="2x" className="back-icon" />
            </span>
            <h1 className="signup-form-title">
                {t("Enter your shipping address")}
            </h1>
            <div className="input-container">
                <Select
                    name="country"
                    options={allCountries}
                    value={allCountries.find(c => c.value === formData.country)}
                    onChange={handleCountryChange}
                    styles={customStyles}
                    placeholder={t("Select your country")}
                    className="input-field"
                    classNamePrefix="select"
                />
                {errors.country && <span className="error-span"> {errors.country} </span>}
            </div>
            <div className="input-container">
                <input type="text" name="addressone" id="address-first-container" className="input-field" value={formData.addressone} onChange={handleChange} />
                <label htmlFor="addressone" className="input-label">
                    {t("Address (Street)")}
                </label>
                {errors.addressone && <span className="error-span"> {errors.addressone} </span>}
            </div>
            <div className="input-container">
                <input type="text" name="addresstwo" id="address-second-container" className="input-field" value={formData.addresstwo} onChange={handleChange} />
                <label htmlFor="address_second" className="input-label">
                    {t("Address (Civic number)")}
                </label>
                {errors.addresstwo && <span className="error-span"> {errors.addresstwo} </span>}
            </div>
            <div className="input-container">
                <input type="text" name="city" id="city-container" className="input-field" value={formData.city} onChange={handleChange} />
                <label htmlFor="city" className="input-label">
                    {t("City")}
                </label>
                {errors.city && <span className="error-span"> {errors.city} </span>}
            </div>
            <div className="input-container">
                <input type="text" name="postalcode" id="postal-code-container" className="input-field" value={formData.postalcode} onChange={handleChange} />
                <label htmlFor="postalcode" className="input-label">
                    {t("Postal code")}
                </label>
                {errors.postalcode && <span className="error-span"> {errors.postalcode} </span>}
            </div>
            <div className="input-container">
                <textarea name="specifications" id="specifications-container" className="input-field" maxLength={300} value={formData.specifications} onChange={handleChange}></textarea>
                <label htmlFor="specifications" className="input-label">
                    {t("Specifications")}
                </label>
                {errors.specifications && <span className="error-span"> {errors.specifications} </span>}
            </div>
            <button type="submit" className="submit-button">
                {t("Proceed")}
            </button>
        </form>
    )
}

export default SignUpGoogleStepTwo