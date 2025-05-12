import { configureStore } from '@reduxjs/toolkit'
import TokenReducer from '../../features/xsrftoken'

export const store = configureStore({
    reducer: {
        token: TokenReducer
    }
})