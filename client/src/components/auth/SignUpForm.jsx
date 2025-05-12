import { FormProvider } from "../../context/signup/SignUpContext"
import FormStepOne from "./SignUpFormStepOne"
import FormStepTwo from "./SignUpFormStepTwo"
import FormStepThree from "./SignUpFormStepThree"
import SignUpFormSelectVerifyMethod from "./SignUpFormSelectVerifyMethod"
import EmailVerificationForm from './verification/EmailVerificationForm'
import { useState } from "react"

const SignUpForm = ({ onChange }) => {
    const [step, setStep] = useState(1)
    const [verificationMethod, setVerificationMethod] = useState(null)
    const validVerificationMethods = new Set(["email", "sms", "app"])

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
    };

    return (
        <FormProvider>
            {step === 1 && <FormStepOne onNext={handleNextStep} onChange={onChange} />}
            {step === 2 && <FormStepTwo onNext={handleNextStep} onBack={handleBackStep} onChange={onChange} />}
            {step === 3 && <FormStepThree onBack={handleBackStep} onNext={handleNextStep}/>}
            {step === 4 && <SignUpFormSelectVerifyMethod onNext={handleNextStep} onBack={handleBackStep} onChoice={handleVerificationMethodChoice} />}
            {step === 5 && verificationMethod === "email" && <EmailVerificationForm />}
        </FormProvider>
    )
}

export default SignUpForm