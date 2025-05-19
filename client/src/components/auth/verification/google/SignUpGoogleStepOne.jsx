import './SignUpGoogle.scss'
import api from '../../../../axios'
import i18n from '../../../../i18n'
import { useState, useRef, useEffect, useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { FormContext } from '../../../../context/signup/SignUpContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import PrefixButtonGroup from '../../../prefix/PrefixButtonGroup'
import { validateStepOne } from '.'
import { setUser, setSocialSignUpId } from '../../../../features/user'
import { setXrsfToken } from '../../../../features/xsrftoken'
import notifyError from '../../../../utils/notifications'

const SignUpGoogleStepOne = ({ onNext }) => {
    const { t } = useTranslation()
    const [isPasswordVisible, setIsPasswordVisible] = useState(false)
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false)
    const [prefix, setPrefix] = useState(null)
    const [errors, setErrors] = useState({})
    const { formData, setFormData } = useContext(FormContext)
    const formRef = useRef(null)
    const dispatch = useDispatch()

    const notifySuccess = (name) => toast.success(
        <div>
            {i18n.t("Welcome")} {name}
            <br />
            {i18n.t("Complete the registration to access ShopHub!")}
        </div>
        ,
        {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            pauseOnHover: false,
            draggable: false
        }
    )

    useEffect(() => {
        const controller = new AbortController()
        const { signal } = controller

        const getUserInfo = async () => {
            try {
                const request = await api.get('auth/user/getUserSocialInfo/google', { signal })
                const response = request.data

                if (response.ok) {
                    const { userId, userEmail, userDisplayName, userFamilyName } = response?.profile

                    dispatch(setSocialSignUpId(userId))
                    dispatch(setUser({ userDisplayName, userFamilyName, userEmail }))

                    setFormData(prev => ({
                        ...prev,
                        name: userDisplayName,
                        surname: userFamilyName,
                        email: userEmail
                    }))

                    setFormData(prev => ({
                        ...prev,
                        socialSignUp: {
                            ...prev.socialSignUp,
                            googleid: userId
                        }
                    }))

                    notifySuccess(userDisplayName || i18n.t("Not retrieved"))
                }
            } catch (error) {
                if (!signal.aborted) {
                    console.error('Errore completo:', error)
                    notifyError(error.response?.data?.message || i18n.t("Unexpected error"))
                }
            }
        }

        getUserInfo()

        return () => {
            controller.abort()
        }
    }, [dispatch, setFormData])

    const handlePrefixSelect = (pref) => {
        setPrefix(pref)
        setFormData(prev => ({
            ...prev, prefix: pref
        }))
    }

    const handleChange = ({ target }) => {
        const { name, value, classList } = target

        setFormData(prev => ({
            ...prev,
            [name]: value
        }))

        classList.toggle("filled", value.trim() !== "")
    }

    const handleProceed = async (e) => {
        e.preventDefault()

        const data = {
            prefix: formData.prefix,
            telephone: formData.telephone,
            password: formData.password,
            confirmpassword: formData.confirmpassword
        }

        const errors = validateStepOne(data)
        if (Object.entries(errors).length !== 0) {
            setErrors(errors)
            return
        }

        const fullNumber = formData.prefix + formData.telephone

        try {
            const request = await api.post('/auth/phonenumber/isUsed', { phone: fullNumber })
            const response = request.data

            if (!response.ok) {
                setErrors({ phonenumber: response.message })
                return
            }

            if (onNext) onNext()
        } catch (error) {
            console.error("Error during registration")
            notifyError(error.response?.data?.message || error.message || "Unexpected error")
        }
    }


    useEffect(() => {
        const controller = new AbortController()
        const { signal } = controller

        const getXsrfToken = async () => {
            try {
                const xsrfResponse = await api.get("/api/xsrf-token/new", { signal })
                const { ok: xsrfOk, xsrfToken, message } = xsrfResponse.data

                if (xsrfOk) {
                    dispatch(setXrsfToken(xsrfToken))
                } else {
                    notifyError(message || "Errore nel recupero del token CSRF")
                }
            } catch (tokenError) {
                if (!signal.aborted) {
                    setErrors(tokenError)
                    notifyError("Errore di rete durante il recupero del token CSRF")
                }
            }
        }

        getXsrfToken()

        return () => {
            controller.abort()
        }
    }, [dispatch])

    useEffect(() => {
        if (formRef.current) {
            const inputContainers = formRef.current.querySelectorAll(".input-container")
            inputContainers.forEach(container => {
                const input = container.querySelector('.input-field')
                if (input) {
                    input.classList.toggle('filled', formData[input.name]?.trim() !== '')
                }
            })
        }
    }, [formData])

    return (
        <form className="signup-form" ref={formRef} onSubmit={handleProceed}>
            <h1 className="signup-form-title">
                {t("Complete your account")}
            </h1>

            <div className="input-container" id="telephone-container">
                <PrefixButtonGroup selected={prefix} onSelect={handlePrefixSelect} />
                <input type="tel" name="telephone" id="telephone-container" className="input-field" value={formData?.telephone || ""} onChange={handleChange} />
                <label htmlFor="telephone" className="input-label">
                    {t("Telephone")}
                </label>
                {errors.telephone && <span className="error-span">{errors.telephone}</span>}
            </div>
            <div className="input-container">
                <input type={isPasswordVisible ? "text" : "password"} name="password" id="password-container" className="input-field" autoComplete="off" minLength={8} value={formData?.password || ""} onChange={handleChange} />
                <label htmlFor="password" className="input-label">
                    {t("Password")}
                </label>
                <button className="toggle-password-visibility" type="button" onClick={() => setIsPasswordVisible(!isPasswordVisible)}>
                    <FontAwesomeIcon icon={isPasswordVisible ? faEye : faEyeSlash} size="xl" />
                </button>
                {errors.password && <span className="error-span">{errors.password}</span>}
            </div>
            <div className="input-container">
                <input type={isConfirmPasswordVisible ? "text" : "password"} name="confirmpassword" id="confirm-password-container" className="input-field" autoComplete="off" minLength={8} value={formData?.confirmpassword || ""} onChange={handleChange} />
                <label htmlFor="confirmpassword" className="input-label">
                    {t("Confirm password")}
                </label>
                <button className="toggle-password-visibility" type="button" onClick={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)} >
                    <FontAwesomeIcon icon={isConfirmPasswordVisible ? faEye : faEyeSlash} size="xl" />
                </button>
                {errors.confirmpassword && <span className="error-span">{errors.confirmpassword}</span>}
            </div>
            <button type="submit" className="submit-button">
                {t("Proceed")}
            </button>
        </form>
    )
}

export default SignUpGoogleStepOne