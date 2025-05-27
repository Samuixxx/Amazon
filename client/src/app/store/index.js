import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import TokenReducer from '../../features/xsrftoken'
import HomeReducer from '../../features/home'
import UserReducer from '../../features/user'
import CartReducer from '../../features/cart'

const persistConfig = {
    key: 'root',
    storage,
}

const persistedUserReducer = persistReducer(persistConfig, UserReducer)
const persistedCartReducer = persistReducer(persistConfig, CartReducer)

export const store = configureStore({
    reducer: {
        token: TokenReducer,
        user: persistedUserReducer,
        home: HomeReducer,
        cart: persistedCartReducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        })
})

export const persistor = persistStore(store)