const authReducer = (state = false, action) => {
    switch(action.type) {
        case 'AUTH':
            return action.payload
        default:
            return state
    }
}

export default authReducer