import { Routes, Route } from 'react-router-dom'
import HomePage from '../pages/homepage/HomePage'
import AuthPage from '../pages/authpage/AuthPage'

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/auth" element={<AuthPage />}/>
        </Routes>
    )
}

export default AppRoutes;