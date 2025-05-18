import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'user',
  initialState: {
    isAuthenticated: false,
    user: null,
    accessTimestamp: null,
    socialSignUpId: null
  },
  reducers: {
    setUser(state, action) {
      state.isAuthenticated = true
      state.user = action.payload
      state.accessTimestamp = Date.now() 
    },
    setDisplayName(state, action) {
        state.user.displayName = action.payload
    },
    logout(state) {
      state.isAuthenticated = false
      state.user = null
      state.accessTimestamp = null
    },
    setSocialSignUpId(state, action) {
        state.socialSignUpId = action.payload
    }
  }
})

export const { setUser, setDisplayName, logout, setSocialSignUpId } = userSlice.actions
export default userSlice.reducer
