import { getAPI, postAPI } from '../../services/FetchData'

export const getList = (auth) => async (dispatch) => {
    try {
        let limit = 9;

        const res = await getAPI(`senarii?limit=${limit}`, auth.access_token)

        dispatch({
            type: 'SET_SENARII',
            payload: {
                data: res.data,
                total: res.data.length
            }
        })
    } catch (err) {
        dispatch({ type: 'TOAST_ADD', payload: {errors: err.response.data.msg}})
    }
}

export const getSenerio = (auth, senarii_id) => async (dispatch) => {
    if(!auth.access_token || !auth.user) return;

    try {
        const res = await getAPI(`senarii/${senarii_id}`, auth.access_token)

        dispatch({
            type: 'SET_SENARIO',
            payload: res.data
        })
    } catch (err) {
        dispatch({ type: 'TOAST_ADD', payload: {errors: err.response.data.msg}})
    }
}

export const updateSenario = (auth, senario, history) => async (dispatch) => {
    if(!auth.access_token || !auth.user) return;

    try {
        await postAPI(`senarii/${senario._id}`, senario, auth.access_token)

        history.push(`/account/senarii/${senario._id}/edit`)
    } catch (err) {
        dispatch({ type: 'TOAST_ADD', payload: {errors: err.response.data.msg}})
    }
}