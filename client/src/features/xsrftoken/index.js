import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    XSRFTOKEN: null
}

export const tokenSlice = createSlice({
    name: 'tokens',
    initialState,
    reducers: {
        setXrsfToken: (state, action) => {
            state.XSRFTOKEN = action.payload
        }
    }
})


export const { setXrsfToken } = tokenSlice.actions
export default tokenSlice.reducer