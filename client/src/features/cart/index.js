import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../axios'

export const addProductToCart = createAsyncThunk(
    'cart/addProductToCart',
    async ({ productId, quantity }, { getState, rejectWithValue, dispatch }) => {
        const state = getState()
        const { user } = state
        // Prendi il cartId dallo stato (o da localStorage se non c'è)
        const cartId = state.cart.cartId || localStorage.getItem('cartId') || null

        try {
            const response = await api.post('/api/cart/user/add', {
                productId,
                quantity,
                authenticated: user.isAuthenticated,
                cartId
            }, { withCredentials: true })
            if (response.data.cartId && response.data.cartId !== cartId) {
                localStorage.setItem('cartId', response.data.cartId)
                dispatch(setCartId(response.data.cartId))
            }

            return response.data

        } catch (error) {
            return rejectWithValue(error.response?.data || error.message)
        }
    }
)


const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        cartId: localStorage.getItem('cartId') || null,
        status: 'idle',
        error: null
    },
    reducers: {
        clearCart(state) {
            state.items = []
        },
        addLocalProduct(state, action) {
            const newProduct = action.payload
            const existingProduct = state.items.find(item => item.productId === newProduct.productId)
            if (existingProduct) {
                existingProduct.quantity += newProduct.quantity
            } else {
                state.items.push(newProduct)
            }
        },
        removeProduct(state, action) {
            state.items = state.items.filter(item => item.productId !== action.payload)
        },
        setCartId(state, action) {
            state.cartId = action.payload
        }
    },
    extraReducers: builder => {
        builder
            .addCase(addProductToCart.pending, state => {
                state.status = 'loading'
                state.error = null
            })
            .addCase(addProductToCart.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.items = action.payload.items
            })
            .addCase(addProductToCart.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.payload || 'Failed to add product'
            })
    }
})

export const selectTotalItems = state => {
    return state.cart.items.reduce((total, item) => total + item.quantity, 0)
}

export const { clearCart, addLocalProduct, removeProduct, setCartId } = cartSlice.actions
export default cartSlice.reducer
