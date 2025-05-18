import { useState, useEffect } from 'react'
import SignUpGoogleStepOne from './SignUpGoogleStepOne'
import { FormProvider } from '../../../../context/signup/SignUpContext'
import { useDispatch } from 'react-redux'
import api from '../../../../axios'
import i18n from '../../../../i18n'
import { toast } from 'react-toastify'
import { setDisplayName } from '../../../../features/user'

const SignUpGoogle = () => {
    const [step, setStep] = useState(1)
    const dispatch = useDispatch()

    const handleNext = () => {
        setStep(step => step + 1)
    }

    const notifySuccess = (name) => toast.success(`${i18n.t("Benvenuto")}${name}`, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        pauseOnHover: false,
        draggable: false
    })

    const notifyError = (error) => {
        toast.error(error, {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            pauseOnHover: false,
            draggable: false
        })
    }

    useEffect(() => {
        const getDisplayName = async () => {
            try {
                const request = await api.get('auth/user/getDisplayName/google')
                const response = request.data

                if (response.ok) {
                    dispatch(setDisplayName(response.userDisplayName))
                    notifySuccess(response.userDisplayName)
                } else if (response.message) {
                    notifyError(response.message)
                }
            } catch (error) {
                notifyError(error.response?.data?.message || i18n.t("Unexpected error"))
            }
        }

        getDisplayName()
    }, [dispatch])


    return (
        <FormProvider>
            <main className="container">
                {step === 1 && <SignUpGoogleStepOne onNext={handleNext} />}
            </main>
        </FormProvider>
    )
}

export default SignUpGoogle