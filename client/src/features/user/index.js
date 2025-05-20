import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'user',
  initialState: {
    isAuthenticated: false,
    user: {},
    accessTimestamp: null,
    socialSignUp: false
  },
  reducers: {
    setUser(state, action) {
      const payload = typeof action.payload === 'string'
        ? JSON.parse(action.payload)
        : action.payload

      state.userDisplayName = payload.userDisplayName
      state.userEmail = payload.userEmail
      state.isAuthenticated = true
      state.accessTimestamp = Date.now()
    },
    setDisplayName(state, action) {
      if (!state.user) {
        state.user = {}
      }
      state.user.userDisplayName = action.payload
    },
    logout(state) {
      state.isAuthenticated = false
      state.user = {}
      state.accessTimestamp = null
    },
    setSocialSignUp(state) {
      state.socialSignUp = true
    }
  }
})

export const { setUser, setDisplayName, logout, setSocialSignUp } = userSlice.actions
export default userSlice.reducer
