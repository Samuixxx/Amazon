import './AuthPage.scss'
import { useState, useRef, useLayoutEffect } from 'react'
import { useTranslation } from 'react-i18next'
import SignUpForm from '../../components/auth/SignUpForm'
import SignInForm from '../../components/auth/SignInForm'
import bg from '../../assets/authbg.png'
import { animateFormSwitch, initializeAuthAnimations } from '../../components/auth/animations/authAnimation'

const AuthPage = () => {
    const { t } = useTranslation()
    const [isLogin, setIsLogin] = useState(true)
    const formRef = useRef(null)
    const bgRef = useRef(null)

    const toggleForm = () => {
        animateFormSwitch(formRef, bgRef, isLogin, setIsLogin)
    }

    useLayoutEffect(() => {
        initializeAuthAnimations(formRef, bgRef)
    }, [])

    return (
        <main className={`auth-page-main ${isLogin ? 'login-layout' : 'signup-layout'}`}>
            <div className="form-container" ref={formRef}>
                {isLogin ? <SignInForm onChange={toggleForm} /> : <SignUpForm onChange={toggleForm} />}
            </div>
            <div className="auth-page-bg-container" ref={bgRef}>
                <img src={bg} alt="background" className="auth-page-bg" />
                <h1 className="bg-title">
                    {t("Welcome to ShopHub")}
                </h1>
                {isLogin ? <span className="bg-subtitle-span">{t("Sign in to start purchasing")}</span> : <span className="bg-subtitle-span">{t("Sign up to discover all our new products")}</span>}
            </div>
        </main>
    )
}

export default AuthPage
