import { postAPI } from '../../services/FetchData'

export const createBug = (auth, bug) => async (dispatch) => {
    if(!auth.access_token || !auth.user) return;

    try {
        const res = await postAPI(`bug`, bug, auth.access_token)

        dispatch({ type: 'SET_ALERT', payload: {success: res.data.msg}})
    } catch (err) {
        dispatch({ type: 'SET_ALERT', payload: {errors: err.response.data.msg}})
    }
}