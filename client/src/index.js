import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './app/store'
import App from './App.jsx'

import './styles/main.scss'
import './i18n'

ReactDOM.createRoot(document.getElementById("root")).render(
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor} >
                <App />
            </PersistGate>
        </Provider>
)