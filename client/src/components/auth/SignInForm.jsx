import './SignInForm.scss'
import { useTranslation } from "react-i18next"
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGoogle, faFacebook, faTwitter } from "@fortawesome/free-brands-svg-icons"
import { handleSignInSubmit } from '.'

const SignInForm = ({ onChange }) => {
    const { t } = useTranslation()
    const [formData, setFormData] = useState({ email: '', password: '' })
    const navigate = useNavigate()

    const handleChange = ({ currentTarget }) => {
        const { name, value, classList } = currentTarget
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }))
        classList.toggle("filled", value.trim() !== "")
    }

    const handleSubmit = async(event) => {
        event.preventDefault() // Previene il comportamento predefinito del form
        const res = await handleSignInSubmit(formData)
        if(res.startsWith("/")) {
            navigate(res)
        } else {
            console.log(res)
        }
    }

    return (
        <form className="signin-form" onSubmit={handleSubmit}>
            <h1 className="signin-form-title">{t('Sign in here')}</h1>
            <div className="input-container">
                <input
                    type="email"
                    name="email"
                    className="input-field"
                    id="email-container"
                    autoComplete="off"
                    value={formData.email}
                    onChange={handleChange}
                />
                <label htmlFor="email-container" className="input-label">
                    {t('Email')}
                </label>
            </div>
            <div className="input-container">
                <input
                    type="password"
                    name="password"
                    className="input-field"
                    id="password-container"
                    autoComplete="off"
                    value={formData.password}
                    onChange={handleChange}
                />
                <label htmlFor="password-container" className="input-label">
                    {t('Password')}
                </label>
            </div>
            <span className="forgot-password-link">{t('Forgot password')}</span>
            <label className="remember-me-container" htmlFor="remember-me-input">
                <input type="checkbox" className="remember-me" id="remember-me-input" />
                <span className="switch"></span>
                <span>{t('Remember me')}</span>
            </label>
            <button type="submit" className="submit-button">{t('Sign in')}</button>
            <div className="social-login-container">
                <span className="social-icon">
                    <FontAwesomeIcon icon={faGoogle} size="lg" />
                </span>
                <span className="social-icon">
                    <FontAwesomeIcon icon={faFacebook} size="lg" />
                </span>
                <span className="social-icon">
                    <FontAwesomeIcon icon={faTwitter} size="lg" />
                </span>
            </div>
            <span className="signup-prompt">
                {t("Don't have an account?")}
                <strong onClick={onChange}>{t('Sign up')}</strong>
            </span>
        </form>
    )
}

export default SignInForm