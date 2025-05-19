import { useState} from 'react'
import { FormProvider } from '../../../../context/signup/SignUpContext'
import SignUpGoogleStepTwo from './SignUpGoogleStepTwo'
import SignUpGoogleStepThree from './SignUpGoogleStepThree'
import SignUpGoogleStepOne from './SignUpGoogleStepOne'
import SignUpFormSelectVerifyMethod from '../../SignUpFormSelectVerifyMethod'
import EmailVerificationForm from '../EmailVerificationForm'
import SmsVerificationForm from "../SmsVerificationForm"
import PhoneCallVerificationForm from "../PhoneCallVerification"

const SignUpGoogle = () => {
    const [step, setStep] = useState(1)
    const [verificationMethod, setVerificationMethod] = useState(null)
    const validVerificationMethods = new Set(["email", "sms", "call"])

    const handleNext = () => {
        setStep(step => step + 1)
    }

    const handleBack = () => {
        setStep(step => step - 1)
    }

    const handleVerificationMethodChoice = (method) => {
        if (!validVerificationMethods.has(method)) {
            return
        }
        setVerificationMethod(method)
    }

    return (
        <FormProvider>
            <main className="container">
                {step === 1 && <SignUpGoogleStepOne onNext={handleNext} />}
                {step === 2 && <SignUpGoogleStepTwo onNext={handleNext} onBack={handleBack} />}
                {step === 3 && <SignUpGoogleStepThree onNext={handleNext} onBack={handleBack} />}
                {step === 4 && <SignUpFormSelectVerifyMethod onNext={handleNext} onBack={handleBack} onChoice={handleVerificationMethodChoice} />}
                {step === 5 && verificationMethod === "email" && <EmailVerificationForm />}
                {step === 5 && verificationMethod === "sms" && <SmsVerificationForm />}
                {step === 5 && verificationMethod === "call" && <PhoneCallVerificationForm />}
            </main>
        </FormProvider>
    )
}

export default SignUpGoogle