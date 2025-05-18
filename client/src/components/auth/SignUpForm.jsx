import './SignUpForm.scss'
import { FormProvider } from "../../context/signup/SignUpContext"
import FormStepOne from "./SignUpFormStepOne"
import FormStepTwo from "./SignUpFormStepTwo"
import FormStepThree from "./SignUpFormStepThree"
import SignUpFormSelectVerifyMethod from "./SignUpFormSelectVerifyMethod"
import EmailVerificationForm from './verification/EmailVerificationForm'
import SmsVerificationForm from "./verification/SmsVerificationForm"
import PhoneCallVerificationForm from "./verification/PhoneCallVerification"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGoogle, faFacebook, faTwitter } from "@fortawesome/free-brands-svg-icons"
import { useState } from "react"
import { useTranslation } from 'react-i18next'

const SignUpForm = ({ onChange }) => {
    const [step, setStep] = useState(1)
    const [verificationMethod, setVerificationMethod] = useState(null)
    const { t } = useTranslation()
    const validVerificationMethods = new Set(["email", "sms", "call"])

    const handleBackStep = () => {
        setStep(step => step - 1)
    }

    const handleNextStep = () => {
        setStep(step => step + 1)
    }

    const handleVerificationMethodChoice = (method) => {
        if (!validVerificationMethods.has(method)) {
            return
        }
        setVerificationMethod(method)
    }

    const verifyWithGoogle = async () => {
        window.location.href = `${process.env.REACT_APP_API_URL}/auth/signup/google`
    }

    return (
        <FormProvider>
            {step === 1 && <FormStepOne onNext={handleNextStep} onChange={onChange} />}
            {step === 2 && <FormStepTwo onNext={handleNextStep} onBack={handleBackStep} onChange={onChange} />}
            {step === 3 && <FormStepThree onBack={handleBackStep} onNext={handleNextStep} />}
            {step === 4 && <SignUpFormSelectVerifyMethod onNext={handleNextStep} onBack={handleBackStep} onChoice={handleVerificationMethodChoice} />}
            {step === 5 && verificationMethod === "email" && <EmailVerificationForm />}
            {step === 5 && verificationMethod === "sms" && <SmsVerificationForm />}
            {step === 5 && verificationMethod === "call" && <PhoneCallVerificationForm />}
            {step === 1 && <>
                    <div className="separator-container">
                        <span className="separator-span">{t("OR")}</span>
                    </div>
                    <span className="social-span">
                        {t("Sign up with:")}
                    </span>
                    <div className="social-login-container">
                        <span className="social-icon" onClick={verifyWithGoogle}>
                            <FontAwesomeIcon icon={faGoogle} size="lg" />
                        </span>
                        <span className="social-icon">
                            <FontAwesomeIcon icon={faFacebook} size="lg" />
                        </span>
                        <span className="social-icon">
                            <FontAwesomeIcon icon={faTwitter} size="lg" />
                        </span>
                    </div>
                </>
            }
        </FormProvider>
    )
}

export default SignUpForm