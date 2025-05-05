import './SignUpForm.scss'
import { FormContext } from "../../context/signup/SignUpContext"
import { useTranslation } from 'react-i18next'
import { useContext, useState, useRef, useEffect } from "react"
import validateStepOne from '.'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import PrefixButtonGroup from '../prefix/PrefixButtonGroup'

const FormStepOne = ({ onNext, onChange }) => {
    const { formData, setFormData } = useContext(FormContext)
    const { t } = useTranslation()
    const [errors, setErrors] = useState({})
    const [isPasswordVisible, setIsPasswordVisible] = useState(false)
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false)
    const [prefix, setPrefix] = useState("+44")
    const formRef = useRef(null)

    const handleChange = ({ target }) => {
        const { name, value, classList } = target

        setFormData(prev => ({
            ...prev,
            [name]: value
        }))

        classList.toggle("filled", value.trim() !== "")
    }

    const handlePrefixSelect = (pref) => {
        setPrefix(pref)
        setFormData(prev => ({
            ...prev, prefix: pref 
        }))
    }

    const handleProceed = (e) => {
        e.preventDefault()
        const validation = validateStepOne(formData, t)
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
        <form className="signup-form" ref={formRef}>
            <h1 className="signup-form-title">
                {t("Create your account")}
            </h1>
            <div className="input-container">
                <input type="text" name="name" id="name-container" className="input-field" autoComplete="off" value={formData.name} onChange={handleChange} minLength={2}/>
                <label htmlFor="name" className="input-label">
                    {t("Name")}
                </label>
                {errors.uname && <span className="error-span">{errors.name}</span>}
            </div>
            <div className="input-container">
                <input type="text" name="surname" id="surname-container" className="input-field" autoComplete="off" value={formData.surname} onChange={handleChange} minLength={2}/>
                <label htmlFor="surname" className="input-label">
                    {t("Surname")}
                </label>
                {errors.surname && <span className="error-span">{errors.surname}</span>}
            </div>
            <div className="input-container">
                <input type="email" name="email" id="email-container" className="input-field" autoComplete="off" value={formData.email} onChange={handleChange} />
                <label htmlFor="email" className="input-label">
                    {t("Email")}
                </label>
                {errors.mail && <span className="error-span">{errors.email}</span>}
            </div>
            <div className="input-container" id="telephone-container">
                <PrefixButtonGroup selected={prefix} onSelect={handlePrefixSelect} />
                <input type="tel" name="telephone" id="telephone-container" className="input-field" value={formData.telephone} onChange={handleChange} />
                <label htmlFor="telephone" className="input-label">
                    {t("Telephone")}
                </label>
                {errors.telephone && <span className="error-span">{errors.telephone}</span>}
            </div>
            <div className="input-container">
                <input type={isPasswordVisible ? "text" : "password"} name="password" id="password-container" className="input-field" autoComplete="off" value={formData.password} onChange={handleChange} />
                <label htmlFor="password" className="input-label">
                    {t("Password")}
                </label>
                <button className="toggle-password-visibility" type="button" onClick={() => setIsPasswordVisible(!isPasswordVisible)}>
                    <FontAwesomeIcon icon={isPasswordVisible ? faEye : faEyeSlash} size="xl" />
                </button>
                {errors.psw && <span className="error-span">{errors.password}</span>}
            </div>
            <div className="input-container">
                <input type={isConfirmPasswordVisible ? "text" : "password"} name="confirmpassword" id="confirm-password-container" className="input-field" autoComplete="off" value={formData.confirmpassword} onChange={handleChange} />
                <label htmlFor="confirmpassword" className="input-label">
                    {t("Confirm password")}
                </label>
                <button className="toggle-password-visibility" type="button" onClick={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)} >
                    <FontAwesomeIcon icon={isConfirmPasswordVisible ? faEye : faEyeSlash} size="xl" />
                </button>
                {errors.cpsw && <span className="error-span">{errors.confirmpassword}</span>}
            </div>
            <button type="submit" className="submit-button" onClick={handleProceed}>
                {t("Proceed")}
            </button>
            <span className="signup-prompt">
                {t("Already have an account?")}
                <strong onClick={onChange}>
                    {t("Sign in")}
                </strong>
            </span>
        </form>
    )
}

export default FormStepOne
