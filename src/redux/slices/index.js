import { combineReducers } from "redux";

import authReducer from "./authSlice"
import alertReducer from "./alertSlice"
import toastReducer from "./toastSlice"

export default combineReducers({
    toast: toastReducer,
    auth: authReducer,
    alert: alertReducer
})