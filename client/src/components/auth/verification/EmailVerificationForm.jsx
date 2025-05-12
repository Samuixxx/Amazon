import './Verifications.scss'
import { useTranslation } from 'react-i18next'
import { useState, useEffect, useContext, useRef } from 'react'
import api from '../../../axios'
import { useDispatch, useSelector } from 'react-redux'
import { setXrsfToken } from '../../../features/xsrftoken'
import { FormContext } from '../../../context/signup/SignUpContext'

const EmailVerificationForm = () => {
    const { t } = useTranslation()
    const [code, setCode] = useState('')
    const [errors, setErrors] = useState()
    const { formData } = useContext(FormContext)
    const inputContainerRef = useRef(null)
    const dispatch = useDispatch()
    const [userClientId, setUserClientId] = useState(null)
    const userXsrfToken = useSelector(state => state.token.XSRFTOKEN)

    useEffect(() => {
        const controller = new AbortController()
        const { signal } = controller

        const initializeVerification = async () => {
            try {
                const xsrfResponse = await api.get("/api/xsrf-token/new", { signal })
                const { ok: xsrfOk, xsrfToken } = xsrfResponse.data

                if (xsrfOk) {
                    dispatch(setXrsfToken(xsrfToken))

                    try {
                        const otpResponse = await api.post("/auth/signin/getCode",
                            { mail: formData.email },
                            {
                                headers: { 'X-XSRF-TOKEN': xsrfToken },
                                signal
                            }
                        )
                        const { ok: otpOk, clientId } = otpResponse.data

                        if (otpOk) {
                            setUserClientId(clientId)
                        }
                    } catch (otpError) {
                        if (!signal.aborted) setErrors(otpError)
                    }
                }
            } catch (tokenError) {
                if (!signal.aborted) setErrors(tokenError)
            }
        }

        initializeVerification()

        return () => {
            controller.abort()
        }
    }, [dispatch, formData.email])

    const handleInputChange = (index, value) => {
        setCode(prevCode => {
            const codeArray = prevCode ? prevCode.split('') : Array(6).fill('')
            codeArray[index] = value
            return codeArray.join('')
        })

        const inputs = inputContainerRef.current.querySelectorAll('.verification-form-otp-input')

        if (value.length === 1 && index < 5) {
            inputs[index + 1]?.focus()
        } else if (value.length === 0 && index > 0) {
            inputs[index - 1]?.focus()
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        if (code.length !== 6 || !/^\d+$/.test(code)) {
            setErrors("Il codice deve essere di 6 cifre numeriche.")
            return
        }

        try {
            const verifyCodeRequest = await api.post("auth/signin/verifyCode", { code: code, clientId: userClientId }, {
                headers: {
                    "X-XSRF-TOKEN": userXsrfToken
                }
            })
            const verifyCodeResponse = verifyCodeRequest.data

            if (!verifyCodeResponse.ok) {
                setErrors(verifyCodeResponse.message || "Errore durante la verifica del codice.")
                return
            }

            const reqBody = {
                name: formData.name,
                surname: formData.surname,
                email: formData.email,
                fullNumber: `${formData.prefix}${formData.telephone}`,
                password: formData.password,
                confirmpassword: formData.confirmpassword,
                country: formData.country,
                addressone: formData.addressone,
                addresstwo: formData.addresstwo,
                city: formData.city,
                postalcode: formData.postalcode,
                specifications: formData.specifications,
                coordinates: formData.coordinates,
                termsconfirm: formData.termsconfirm
            }

            const registerRequest = await api.post("auth/signin/", reqBody, {
                headers: {
                    "X-XSRF-TOKEN": userXsrfToken
                }
            })

            if (!registerRequest.ok) {
                const errorData = registerRequest.data
                setErrors(errorData?.message || "Errore durante la registrazione.")
            } else {
                alert("Registrazione completata con successo!")
            }

        } catch (error) {
            console.error("Errore durante la chiamata API:", error)
            setErrors("Si è verificato un errore durante la comunicazione con il server.")
        }
    }

    return (
        <form className="verification-form" onSubmit={handleSubmit}>
            <h1 className="verification-form-title">
                {t("Confirm your Shophub registration")}
            </h1>
            <h3 className="verification-form-subtitle">
                {t("Email Verification")}
            </h3>
            <span className="verification-form-description">
                {t("We have sent a One-Time Password (OTP) to:")} <strong>{formData.email}.</strong>
                {t("Please enter the code you received in your email to complete registration.")}
            </span>
            <div className="verification-form-otp-container" ref={inputContainerRef}>
                {[...Array(6)].map((_, index) => (
                    <input
                        key={index}
                        type="text"
                        className="verification-form-otp-input"
                        maxLength={1}
                        value={code[index] || ''}
                        onChange={(e) => handleInputChange(index, e.currentTarget.value)}
                        aria-label={`OTP digit ${index + 1}`}
                        required
                    />
                ))}
            </div>
            <span className="verification-form-otp-again">
                {t("Didn't receive the code?")} <button type="button" className="resend-button">{t("Resend OTP")}</button>
            </span>
            {errors && <span className="error-span">{errors.message}</span>}
            <button type="submit" className="submit-button">
                {t("Verify Code & Complete Registration")}
            </button>
        </form>
    )
}

export default EmailVerificationForm