import './SignInForm.scss'
import { useTranslation } from "react-i18next"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGoogle, faFacebook, faTwitter } from "@fortawesome/free-brands-svg-icons"

const SignInForm = ({ onChange }) => {
    const { t } = useTranslation()

    return (
        <form className="signin-form">
            <h1 className="signin-form-title">
                {t("Sign in here")}
            </h1>
            <div className="input-container">
                <input type="email" name="mail" className="input-field" id="email-container" autoComplete="off" />
                <label htmlFor="mail" className="input-label">
                    {t("Email")}
                </label>
            </div>
            <div className="input-container">
                <input type="password" name="pass" className="input-field" id="password-container" autoComplete="off" />
                <label htmlFor="pass" className="input-label">
                    {t("Password")}
                </label>
            </div>
            <span className="forgot-password-link">
                {t("Forgot password")}
            </span>
            <label className="remember-me-container" htmlFor="remember-me-input">
                <input type="checkbox" className="remember-me" id="remember-me-input"/>
                <span className="switch"></span>
                <span>{t("Remember me")}</span>
            </label>
            <button type="submit" className="submit-button">
                {t("Sign in")}
            </button>
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
                <strong onClick={onChange}>
                    {t("Sign up")}
                </strong>
            </span>
        </form>
    )
}

export default SignInForm
