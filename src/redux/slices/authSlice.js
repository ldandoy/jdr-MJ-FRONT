import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isLoading: false,
        isAuth: false,
        user: {},
        token: '',
        error: ''
    },
    reducers: {
        loginPending: (state) => {
            state.isLoading = true
        },
        loginSuccess: (state, {payload}) => {
            state.isLoading = false
            state.isAuth    = true
            state.error     = ''
            state.token     = payload.access_token
            state.user      = payload.user
        },
        loginFail: (state, {payload}) => {
            state.isLoading = false
            state.error = payload
        },
        registerPending: (state) => {
            state.isLoading = true
        },
        registerSuccess: (state, {payload}) => {
            state.isLoading = false
            state.isAuth    = true
            state.error     = ''
            state.token     = payload.access_token
            state.user      = payload.user
        },
        registerFail: (state, {payload}) => {
            state.isLoading = false
            state.error = payload
        },
        setUserPending: (state) => {
            state.isLoading = true
        },
        setUserSuccess: (state, {payload}) => {
            state.isLoading = false
            state.isAuth    = true
            state.error     = ''
            if (payload.access_token) {
                state.token     = payload.access_token
            }

            if (payload.user) {
                state.user      = payload.user
            }
        },
        setUserFail: (state, {payload}) => {
            state.isLoading = false
            state.error = payload
        },
    }
})

const {reducer, actions} = authSlice

export const { 
    loginPending,
    loginSuccess,
    loginFail,
    registerPending,
    registerSuccess,
    registerFail,
    setUserPending,
    setUserSuccess,
    setUserFail
} = actions

export default reducer