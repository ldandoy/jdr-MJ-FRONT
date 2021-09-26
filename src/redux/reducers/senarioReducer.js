const initialState = null

const senarioReducer = (state = initialState, action) => {
    switch(action.type){
        case 'SET_SENARIO':
            return action.payload
            
        default:
            return state
    }
}

export default senarioReducer