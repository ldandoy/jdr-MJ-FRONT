const initialState = null

const senarioReducer = (state = initialState, action) => {
    switch(action.type){
        case 'SET_SENARIO':
            return action.payload

        case 'ADD_COMMENT':
            return {
                ...state,
                comments: [action.payload, ...state.comments]
              }
            
        default:
            return state
    }
}

export default senarioReducer