import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type AuthState = {
  loggedIn: boolean
  loading: boolean
  isSubscribed: boolean
}

const initialState: AuthState = {
  loggedIn: false,
  loading: true,
  isSubscribed: false,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoggedIn: (state) => {
      state.loggedIn = true
    },
    setLoggedOut: (state) => {
      state.loggedIn = false
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setSubscribed: (state) => {
      state.isSubscribed = true
    },
    setNotSubscribed: (state) => {
      state.isSubscribed = false
    },
  },
})

export const { setLoggedIn, setLoggedOut, setLoading, setSubscribed, setNotSubscribed } = authSlice.actions

export default authSlice.reducer


