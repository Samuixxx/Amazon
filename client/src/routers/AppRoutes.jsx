import { Routes, Route } from 'react-router-dom'
import HomePage from '../pages/homepage/HomePage'
import AuthPage from '../pages/authpage/AuthPage'
import SignUpGoogle from '../components/auth/verification/google/SignUpGoogle'

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/auth" element={<AuthPage />}/>
            <Route path="/finishRegistrationWithGoogle" element={<SignUpGoogle />} />
        </Routes>
    )
}

export default AppRoutes;