import './SignUpForm.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { useTranslation } from "react-i18next"
import { FormContext } from '../../context/signup/SignUpContext'
import { useContext } from 'react'
import { handleFinalSubmit } from '.'

const FormStepThree = ({ onBack, onChange }) => {
    const { t } = useTranslation()
    const { formData, setFormData } = useContext(FormContext)

    const handleChange = ({ currentTarget }) => {
        const { name } = currentTarget
        setFormData(prev => ({
            ...prev,
            termsconfirm: {
                ...prev,
                [name]: currentTarget.checked
            }
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        await handleFinalSubmit(formData)
    }

    return (
        <form className="signup-form" id="policy-form">

            <span className="signup-go-back-span" onClick={onBack}>
                <FontAwesomeIcon icon={faCircleArrowLeft} size="2x" className="back-icon" />
            </span>

            <h1 className="signup-form-title">
                {t("Acceptance of Site Policies")}
            </h1>

            <div className="input-container">
                <input type="checkbox" name="terms" className="input-field" required id="termsCheckbox" value={formData.termsconfirm.terms} onChange={handleChange} />
                <span className="input-span">
                    {t("I have read and agree to the")}{" "}
                    <a href="/terms-of-service" target="_blank">{t("Terms of Service")}</a>{" "}
                    {t("of ShopNow, including the limitations of liability and conditions of use.")}
                </span>
            </div>

            <div className="input-container">
                <input type="checkbox" name="privacy" className="input-field" required id="privacyCheckbox" value={formData.termsconfirm.privacy} onChange={handleChange} />
                <span className="input-span">
                    {t("I acknowledge the")}{" "}
                    <a href="/privacy-policy" target="_blank">{t("Privacy Policy")}</a>{" "}
                    {t("and consent to the processing of my personal data for account registration and management purposes.")}
                </span>
            </div>

            <div className="input-container">
                <input type="checkbox" name="cookies" className="input-field" required id="cookiesCheckbox" value={formData.termsconfirm.cookies} onChange={handleChange} />
                <span className="input-span">
                    {t("I consent to the use of functional and tracking cookies to enhance my shopping experience and help analyze user behavior on the platform.")}
                </span>
            </div>

            <div className="input-container">
                <input type="checkbox" name="marketing" className="input-field" id="marketingCheckbox" value={formData.termsconfirm.marketing} onChange={handleChange} />
                <span className="input-span">
                    {t("I would like to receive promotional emails, exclusive offers, and updates via email or push notifications.")}
                </span>
            </div>

            <button type="submit" className="submit-button" onClick={handleSubmit}>{t("Continue")}</button>
        </form>
    )
}

export default FormStepThree