import { createSlice } from '@reduxjs/toolkit'

const toastSlice = createSlice({
    name: 'toast',
    initialState: {
        toast: {
            success: [],
            errors: []
        }
    },
    reducers: {
        addToastSuccess: (state, {payload}) => {
            state.toast.success.push(payload)
        },
        addToastError: (state, {payload}) => {
            state.toast.errors.push(payload)
        }
    }
})

const {reducer, actions} = toastSlice

export const {
    addToastSuccess,
    addToastError
} = actions

export default reducer