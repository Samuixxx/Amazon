import './SignUpForm.scss'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faMobileScreen, faPhone, faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons'

const SignUpFormSelectVerifyMethod = ({ onBack, onNext, onChoice }) => {
    const { t } = useTranslation()
    const [ verificationMethod, setVerificationMethod ] = useState(null)

    const handleVerificationMethodSelected = (method) => {
        setVerificationMethod(method)
        onChoice(method)
    }

    const handleSubmit = () => {
        if (verificationMethod === null) return
        onNext()
    }

    return (
        <form className="signup-form" onSubmit={handleSubmit}>

            <span className="signup-go-back-span" onClick={onBack}>
                <FontAwesomeIcon icon={faCircleArrowLeft} size="2x" className="back-icon" />
            </span>

            <h1 className="signup-form-title">
                {t("Choose your verification method")}
            </h1>

            <div className={`input-container verification-method-container ${verificationMethod === "sms" ? "selected-method" : ""}`} onClick={() => handleVerificationMethodSelected("sms")}>
                <FontAwesomeIcon icon={faMobileScreen} size='2x'/>
                <span className="method-span"> {t("Sms")} </span>
            </div>

            <div className={`input-container verification-method-container ${verificationMethod === "email" ? "selected-method" : ""}`} onClick={() => handleVerificationMethodSelected("email")}>
                <FontAwesomeIcon icon={faEnvelope} size='2x'/>
                <span className="method-span"> {t("Email")} </span>
            </div>

            <div className={`input-container verification-method-container ${verificationMethod === "call" ? "selected-method" : ""}`}  onClick={() => handleVerificationMethodSelected("call")}>
                <FontAwesomeIcon icon={faPhone} size='2x' />
                <span className="method-span"> {t("Phone call")} </span>
            </div>

            <button type="submit" className="submit-button">
                {t("Complete the registration")}
            </button>

        </form>
    )
}

export default SignUpFormSelectVerifyMethod