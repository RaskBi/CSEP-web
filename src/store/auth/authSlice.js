import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'checking',
        user: {},
        errorMessage: null,
    },

    reducers: {
        login: (state, { payload }) => {
            state.status = 'authenticated';
            state.user = payload;
            state.errorMessage = null;
        },

        logout: (state, { payload = null }) => {
            state.status = 'not-authtenticated';
            state.user = {};
            state.errorMessage = payload;
        },

        clearErrorMessage: (state) => {
            state.errorMessage = null
        },

        checkingCredentials: (state) => {
            state.status = 'checking'
        }
    }
});

export const {
    login,
    logout,
    checkingCredentials,
    clearErrorMessage } = authSlice.actions;