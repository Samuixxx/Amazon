import { Routes, Route } from 'react-router-dom';
import Home from '../pages/homepage/Home';

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
        </Routes>
    )
}

export default AppRoutes;