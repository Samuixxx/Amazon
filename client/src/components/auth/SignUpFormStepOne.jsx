import './SignUpForm.scss'
import { FormContext } from "../../context/signup/SignUpContext"
import { useTranslation } from 'react-i18next'
import { useContext, useState } from "react"
import validateStepOne from '.'

const FormStepOne = ({ onNext, onChange }) => {
    const { formData, setFormData } = useContext(FormContext)
    const [ errors, setErrors ] = useState({})
    const { t } = useTranslation()

    const handleChange = ({ target }) => {
        const { name, value, classList } = target;
        setFormData(prev => ({ ...prev, [name]: value }));
        classList.toggle("filled", value.trim() !== "");
    };
 
    const handleProceed = (e) => {
        e.preventDefault()
        const validation = validateStepOne(formData, t)
        setErrors(validation)
        if (!Object.keys(validation).length) onNext()
    }

    return(
        <form className="signup-form">
            <h1 className="signup-form-title">
                {t("Create your account")}
            </h1>
            <div className="input-container">
                <input type="text" name="uname" id="name-container" className="input-field" autoComplete="off" value={formData.uname} onChange={handleChange}/>
                <label htmlFor="uname" className="input-label">
                    {t("Name")}
                </label>
                {errors.uname && <span className="error-span">{errors.uname}</span>}
            </div>
            <div className="input-container">
                <input type="text" name="surname" id="surname-container" className="input-field" autoComplete="off" value={formData.surname} onChange={handleChange}/>
                <label htmlFor="surname" className="input-label">
                    {t("Surname")}
                </label>
                {errors.surname && <span className="error-span">{errors.surname}</span>}
            </div>
            <div className="input-container">
                <input type="email" name="mail" id="email-container" className="input-field" autoComplete="off" value={formData.mail} onChange={handleChange}/>
                <label htmlFor="mail" className="input-label">
                    {t("Email")}
                </label>
                {errors.mail && <span className="error-span">{errors.mail}</span>}
            </div>
            <div className="input-container">
                <input type="tel" name="telephone" id="telephone-container" className="input-field" value={formData.telephone} onChange={handleChange}/>
                <label htmlFor="telephone" className="input-label">
                    {t("Telephone")}
                </label>
                {errors.telephone && <span className="error-span">{errors.telephone}</span>}
            </div>
            <div className="input-container">
                <input type="password" name="psw" id="password-container" className="input-field" autoComplete="off" value={formData.psw} onChange={handleChange}/>
                <label htmlFor="psw" className="input-label">
                    {t("Password")}
                </label>
                {errors.psw && <span className="error-span">{errors.psw}</span>}
            </div>
            <div className="input-container">
                <input type="password" name="cpsw" id="confirm-password-container" className="input-field" autoComplete="off" value={formData.cpsw} onChange={handleChange}/>
                <label htmlFor="cpsw" className="input-label">
                    {t("Confirm password")}
                </label>
                {errors.cpsw && <span className="error-span">{errors.cpsw}</span>}
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
