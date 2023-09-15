// authSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
	name: 'auth',
	initialState: {
		loggedIn: false,
		loading: true,
		isSubscribed: false
	},
	reducers: {
		setLoggedIn: (state) => {
			state.loggedIn = true;
		},
		setLoggedOut: (state) => {
			state.loggedIn = false;
		},
		setLoading: (state, action) => {
			state.loading = action.payload;
		},
		setSubscribed: (state) => {
			state.isSubscribed = true;
		},
		setNotSubscribed: (state) => {
			state.isSubscribed = false;
		},
	},
});

export const { setLoggedIn, setLoggedOut, setLoading, setSubscribed, setNotSubscribed } = authSlice.actions;

export const selectLoggedIn = (state) => state.auth.loggedIn;
export const selectLoading = (state) => state.auth.loading;

export default authSlice.reducer;