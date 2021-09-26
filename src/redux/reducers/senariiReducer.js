const initialState = {
    data: [],
    total: 0
}

const senariiReducer = (state = initialState, action) => {
    switch(action.type){
        case 'SET_SENARII':
            return action.payload
            
        default:
            return state
    }
}

export default senariiReducer