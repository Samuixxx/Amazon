import './SignInForm.scss'
import { useTranslation } from "react-i18next"
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setXrsfToken } from '../../features/xsrftoken'
import { setUser } from '../../features/user'
import { useNavigate } from 'react-router-dom'
import api from '../../axios'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGoogle, faFacebook, faTwitter } from "@fortawesome/free-brands-svg-icons"
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { handleSignInSubmit } from '.'

const SignInForm = ({ onChange }) => {
    const { t } = useTranslation()
    const [formData, setFormData] = useState({ email: '', password: '' })
    const [ errors, setErrors ] = useState(null)
    const [ isPasswordVisible, setIsPasswordVisible ] = useState(null)
    const navigate = useNavigate()
    const userXsrfToken = useSelector(state => state.token.XSRFTOKEN)
    const dispatch = useDispatch()

    useEffect(() => {
        const controller = new AbortController()
        const { signal } = controller

        const initializeVerification = async () => {
            try {
                const xsrfResponse = await api.get("/api/xsrf-token/new", { signal })
                const { ok: xsrfOk, xsrfToken } = xsrfResponse.data

                if (xsrfOk) {
                    dispatch(setXrsfToken(xsrfToken))
                }
            } catch (tokenError) {
                if (!signal.aborted) setErrors(tokenError)
            }
        }

        initializeVerification()

        return () => {
            controller.abort()
        }
    }, [dispatch])

    const handleGoogleSignIn = async () => {
        window.location.href = `${process.env.REACT_APP_API_URL}/auth/signin/google`
    }

    const handleChange = ({ currentTarget }) => {
        const { name, value, classList } = currentTarget
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }))
        classList.toggle("filled", value.trim() !== "")
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        const res = await handleSignInSubmit(formData, userXsrfToken)

        if (res && typeof res === 'object' && res.route) {
            dispatch(setUser(res.user))
            navigate(res.route)
        } else {
            setErrors(res.message)
        }
    }


    return (
        <form className="signin-form" onSubmit={handleSubmit}>
            <h1 className="signin-form-title">{t('Sign in here')}</h1>
            <div className="input-container">
                <input
                    type="email"
                    name="email"
                    className="input-field"
                    id="email-container"
                    autoComplete="off"
                    value={formData.email}
                    onChange={handleChange}
                />
                <label htmlFor="email-container" className="input-label">
                    {t('Email')}
                </label>
            </div>
            <div className="input-container">
                <input
                    type={isPasswordVisible ? "text" : "password"}
                    name="password"
                    className="input-field"
                    id="password-container"
                    autoComplete="off"
                    value={formData.password}
                    onChange={handleChange}
                />
                <label htmlFor="password-container" className="input-label">
                    {t('Password')}
                </label>
                <button className="toggle-password-visibility" type="button" onClick={() => setIsPasswordVisible(!isPasswordVisible)}>
                    <FontAwesomeIcon icon={isPasswordVisible ? faEye : faEyeSlash} size="xl" />
                </button>
            </div>
            <span className="forgot-password-link">{t('Forgot password')}</span>
            <label className="remember-me-container" htmlFor="remember-me-input">
                <input type="checkbox" className="remember-me" id="remember-me-input" />
                <span className="switch"></span>
                <span>{t('Remember me')}</span>
            </label>
            { errors && <span className="error-span">{errors.message}</span>}
            <button type="submit" className="submit-button">{t('Sign in')}</button>
            <div className="social-login-container">
                <span className="social-icon" onClick={handleGoogleSignIn}>
                    <FontAwesomeIcon icon={faGoogle} size="lg" />
                </span>
                <span className="social-icon">
                    <FontAwesomeIcon icon={faFacebook} size="lg" />
                </span>
                <span className="social-icon">
                    <FontAwesomeIcon icon={faTwitter} size="lg" />
                </span>
            </div>
            <span className="signup-prompt">
                {t("Don't have an account?")}
                <strong onClick={onChange}>{t('Sign up')}</strong>
            </span>
        </form>
    )
}

export default SignInForm