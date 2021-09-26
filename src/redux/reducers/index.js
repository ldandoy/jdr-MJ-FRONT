import { combineReducers } from "redux";
import auth from './authReducer'
import alert from './alerteReducer'
import toast from './toastReducer'
import senarii from './senariiReducer'
import senario from './senarioReducer'

export default combineReducers({
    auth,
    alert,
    toast,
    senarii,
    senario
})