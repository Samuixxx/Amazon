import { FormProvider } from "../../context/signup/SignUpContext"
import FormStepOne from "./SignUpFormStepOne"
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
        </FormProvider>
    )
}

export default SignUpForm