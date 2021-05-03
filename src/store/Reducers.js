import { ACTIONS } from "./Actions"

const reducers = (state, action) => {
    switch(action.type) {
        case ACTIONS.ADD_NOTIFY:
            return {
                ...state,
                notify: action.payload
            }
        case ACTIONS.SET_USER:
            return {
                ...state,
                user: action.payload
            }
        default:
            return state;
    }
}

export default reducers