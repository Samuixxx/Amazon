import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'user',
  initialState: {
    isAuthenticated: false,
    user: null
  },
  reducers: {
    setUser(state, action) {
      state.isAuthenticated = true
      state.user = action.payload
    },
    logout(state) {
      state.isAuthenticated = false
      state.user = null
    }
  }
})

export const { setUser, logout } = userSlice.actions
export default userSlice.reducer
