
import { BrowserRouter as Router} from 'react-router-dom'
import { Provider } from 'react-redux'
import AppRoutes from './routers/AppRoutes'

const App = () => {
    return (
        <Router>
            <AppRoutes />
        </Router>
    )
}

export default App;