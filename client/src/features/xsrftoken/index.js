import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    XSRFTOKEN: null
}

export const tokenSlice = createSlice({
    name: 'tokens',
    initialState,
    reducers: {
        setXrsfToken: (state, action) => {
            console.log('State before modification:', state);
            state.XSRFTOKEN = action.payload;
            console.log('State after modification:', state);
        }
    }
});


export const { setXrsfToken } = tokenSlice.actions
export default tokenSlice.reducer