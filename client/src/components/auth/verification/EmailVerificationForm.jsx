import './Verifications.scss'
import { useTranslation } from 'react-i18next'
import { useState, useEffect, useContext, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import api from '../../../axios'
import { setXrsfToken } from '../../../features/xsrftoken'
import { setUser } from '../../../features/user'
import { FormContext } from '../../../context/signup/SignUpContext'

const EmailVerificationForm = () => {
    const { t } = useTranslation()
    const [code, setCode] = useState('')
    const [userClientId, setUserClientId] = useState(null)
    const [errors, setErrors] = useState()
    const { formData } = useContext(FormContext)
    const navigate = useNavigate()
    const inputContainerRef = useRef(null)
    const dispatch = useDispatch()
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
                        const otpResponse = await api.post("/auth/signup/getOtpToEmail",
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
                        if (!signal.aborted) setErrors(otpError?.response?.data?.message || otpError.message || "Errore sconosciuto.")
                    }
                }
            } catch (tokenError) {
                if (!signal.aborted) setErrors(tokenError?.response?.data?.message || tokenError.message || "Errore sconosciuto.")
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

    const handleResendOtp = async () => {
        try {
            const response = await api.post("/auth/signup/getOtpToEmail", {
                mail: formData.email
            }, {
                headers: { 'X-XSRF-TOKEN': userXsrfToken }
            })
            if (!response.data.ok) {
                setErrors(response.data.message)
            } else {
                setUserClientId(response.data.clientId)
            }
        } catch (err) {
            setErrors("Errore durante il reinvio del codice.")
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        if (code.length !== 6 || !/^\d+$/.test(code)) {
            setErrors("Il codice deve essere di 6 cifre numeriche.")
            return
        }

        try {
            const verifyCodeRequest = await api.post("auth/signup/verifyEmailOtp", { code: code, clientId: userClientId }, {
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
                termsconfirm: formData.termsconfirm,
                socialSignUp: formData.socialSignUp
            }

            const registerRequest = await api.post("auth/signup", reqBody, {
                headers: {
                    "X-XSRF-TOKEN": userXsrfToken
                }
            })

            const registerData = registerRequest.data

            if (!registerData.ok) {
                setErrors(registerData.message || "Errore durante la registrazione.")
            } else {
                dispatch(setUser(registerData.user))
                navigate(registerData.route)
            }
        } catch (error) {
            const message = error?.response?.data?.message || error.message || "Errore imprevisto"
            setErrors(message)
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
                {t("Didn't receive the code?")} <button type="button" className="resend-button" onClick={handleResendOtp}>{t("Resend OTP")}</button>
            </span>
            {errors && <span className="error-span">{typeof errors === 'string' ? errors : JSON.stringify(errors)}</span>}
            <button type="submit" className="submit-button">
                {t("Verify Code & Complete Registration")}
            </button>
        </form>
    )
}

export default EmailVerificationForm