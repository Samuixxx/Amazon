import { FormContext } from "../../context/signup/SignUpContext"
import { useTranslation } from 'react-i18next'
import { useContext, useState } from "react"

const FormStepOne = ({ onNext, onChange }) => {
    const { formData, setFormData } = useContext(FormContext)
    const [ error, setError ] = useState({})
    const { t } = useTranslation()

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleProceed = (e) => {
        e.preventDefault()

        const { uname, surname, mail, telephone, psw, cpsw } = formData

    }

    return(
        <form className="signin-form">
            <h1 className="signin-form-title">
                {t("Create your account")}
            </h1>
            <div className="input-container">
                <input type="text" name="uname" id="name-container" className="input-field" autoComplete="off" value={formData.uname} onChange={handleChange}/>
                <label htmlFor="uname" className="input-label">
                    {t("Name")}
                </label>
            </div>
            <div className="input-container">
                <input type="text" name="surname" id="surname-container" className="input-field" autoComplete="off" value={formData.surname} onChange={handleChange}/>
                <label htmlFor="surname" className="input-label">
                    {t("Surname")}
                </label>
            </div>
            <div className="input-container">
                <input type="email" name="mail" id="email-container" className="input-field" autoComplete="off" value={formData.mail} onChange={handleChange}/>
                <label htmlFor="mail" className="input-label">
                    {t("Email")}
                </label>
            </div>
            <div className="input-container">
                <input type="tel" name="telephone" id="telephone-container" className="input-field" value={formData.telephone} onChange={handleChange}/>
                <label htmlFor="telephone" className="input-label">
                    {t("Telephone")}
                </label>
            </div>
            <div className="input-container">
                <input type="password" name="psw" id="password-container" className="input-field" autoComplete="off" value={formData.psw} onChange={handleChange}/>
                <label htmlFor="psw" className="input-label">
                    {t("Password")}
                </label>
            </div>
            <div className="input-container">
                <input type="password" name="cpsw" id="confirm-password-container" className="input-field" autoComplete="off" value={formData.cpsw} onChange={handleChange}/>
                <label htmlFor="cpsw" className="input-label">
                    {t("Confirm password")}
                </label>
            </div>
            <button type="submit" className="submit-button">
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