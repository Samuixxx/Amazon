import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../axios'

export const fetchHomeData = createAsyncThunk(
    'home/fetchData',
    async (_, { signal }) => {
        const response = await api.get('/api/home/getData', { signal })
        return response.data.products
    }
)

const initialState = {
    data: null,
    timestamp: null,
    status: 'idle',
    error: null
}

const homeSlice = createSlice({
    name: 'home',
    initialState,
    reducers: {
        clearHomeData: (state) => {
            state.data = null
            state.timestamp = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchHomeData.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchHomeData.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.data = action.payload
                state.timestamp = Date.now()
            })
            .addCase(fetchHomeData.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})

export const { clearHomeData } = homeSlice.actions
export default homeSlice.reducer
