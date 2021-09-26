const toastReducer = (state = {}, action) => {
    switch(action.type) {
        case 'TOAST_ADD':
            return action.payload
        default:
            return state
    }
}

export default toastReducer