import './AuthPage.scss'
import SignUpForm from '../../components/auth/SignUpForm'
import SignInForm from '../../components/auth/SignInForm'
import { useState } from 'react'

const AuthPage = () => {
    const [ isLogin, setIsLogin ] = useState(true)

    const toggleForm = () => {
        setIsLogin(prev => !prev)
    }

    return (
        <main className="auth-page-main">
            { isLogin && <SignInForm onChange={toggleForm}/> }
            { !isLogin && <SignUpForm onChange={toggleForm} />}
        </main>
    )
}

export default AuthPage