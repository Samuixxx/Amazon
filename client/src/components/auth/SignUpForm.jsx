import { FormProvider } from "../../context/signup/SignUpContext"
import FormStepOne from "./SignUpFormStepOne"
import FormStepTwo from "./SignUpFormStepTwo"
import FormStepThree from "./SignUpFormStepThree"
import { useState } from "react"

const SignUpForm = ({ onChange }) => {
    const [step, setStep] = useState(1)

    const handleBackStep = () => {
        setStep(step => step - 1)
    }

    const handleNextStep = () => {
        setStep(step => step + 1)
    }
    
    return(
        <FormProvider>
            {step === 1 && <FormStepOne onNext={handleNextStep} onChange={onChange}/>}
            {step === 2 && <FormStepTwo onNext={handleNextStep} onBack={handleBackStep} onChange={onChange} />}
            {step === 3 && <FormStepThree onNext={handleNextStep} onBack={handleBackStep} onChange={onChange} />}
        </FormProvider>
    )
}

export default SignUpForm