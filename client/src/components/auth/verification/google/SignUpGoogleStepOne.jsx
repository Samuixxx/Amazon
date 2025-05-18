import './SignUpGoogle.scss'
import { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { FormContext } from '../../../../context/signup/SignUpContext'
import { useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import PrefixButtonGroup from '../../../prefix/PrefixButtonGroup'

const SignUpGoogleStepOne = ({ onNext}) => {
    const { t } = useTranslation()
    const [ isPasswordVisible, setIsPasswordVisible ] = useState(false)
    const [ isConfirmPasswordVisible, setIsConfirmPasswordVisible ] = useState(false)
    const [ prefix, setPrefix ] = useState(null)
    const [ errors, setErrors ] = useState({})
    const { formData, setFormData } = useContext(FormContext)
    const formRef = useRef(null)

    const handlePrefixSelect = (pref) => {
        setPrefix(pref)
        setFormData(prev => ({
            ...prev, prefix: pref 
        }))
    }

    const handleChange = ({ target }) => {
        const { name, value, classList } = target

        setFormData(prev => ({
            ...prev,
            [name]: value
        }))

        classList.toggle("filled", value.trim() !== "")
    }

    const handleProceed = (e) => {
        e.preventDefault()
        console.log("wesh")
    }

    useEffect(() => {
        if (formRef.current) {
            const inputContainers = formRef.current.querySelectorAll(".input-container")
            inputContainers.forEach(container => {
                const input = container.querySelector('.input-field')
                if (input) {
                    input.classList.toggle('filled', formData[input.name]?.trim() !== '')
                }
            })
        }
    }, [formData])

    return (
        <form className="signup-form" ref={formRef}>
            <h1 className="signup-form-title">
                {t("Complete your account")}
            </h1>
            
            <div className="input-container" id="telephone-container">
                <PrefixButtonGroup selected={prefix} onSelect={handlePrefixSelect} />
                <input type="tel" name="telephone" id="telephone-container" className="input-field" value={formData?.telephone || ""} onChange={handleChange} />
                <label htmlFor="telephone" className="input-label">
                    {t("Telephone")}
                </label>
                {errors.telephone && <span className="error-span">{errors.telephone}</span>}
            </div>
            <div className="input-container">
                <input type={isPasswordVisible ? "text" : "password"} name="password" id="password-container" className="input-field" autoComplete="off" minLength={8} value={formData?.password || ""} onChange={handleChange} />
                <label htmlFor="password" className="input-label">
                    {t("Password")}
                </label>
                <button className="toggle-password-visibility" type="button" onClick={() => setIsPasswordVisible(!isPasswordVisible)}>
                    <FontAwesomeIcon icon={isPasswordVisible ? faEye : faEyeSlash} size="xl" />
                </button>
                {errors.psw && <span className="error-span">{errors.password}</span>}
            </div>
            <div className="input-container">
                <input type={isConfirmPasswordVisible ? "text" : "password"} name="confirmpassword" id="confirm-password-container" className="input-field" autoComplete="off" minLength={8} value={formData?.confirmpassword || ""} onChange={handleChange} />
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
        </form>
    )
}

export default SignUpGoogleStepOne