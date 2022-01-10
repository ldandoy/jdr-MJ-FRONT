import { combineReducers } from "redux";

// import auth from './authReducer'
// import alert from './alerteReducer'
import toast from './toastReducer'
import senarii from './senariiReducer'
import senario from './senarioReducer'

import authReducer from "../slices/authSlice"
import alertReducer from "../slices/alertSlice"

export default combineReducers({
//     auth,
//    alert,
    toast,
    senarii,
    senario,
    auth: authReducer,
    alert: alertReducer
})