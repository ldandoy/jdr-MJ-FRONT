import { getAPI, postAPI, putAPI, deleteAPI } from '../../services/FetchData'
import store from '../store'

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
    try {
        const res = await getAPI(`senarii/${senarii_id}`)

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
        await putAPI(`senarii/${senario._id}`, senario, auth.access_token)

        history.push(`/account/scenarii/${senario._id}/edit`)
    } catch (err) {
        dispatch({ type: 'TOAST_ADD', payload: {errors: err.response.data.msg}})
    }
}

export const insertSenario = (auth, senario, history) => async (dispatch) => {
    if(!auth.access_token || !auth.user) return;

    try {
        await postAPI(`senarii/new`, senario, auth.access_token)

        history.push(`/account/scenarii`)
    } catch (err) {
        dispatch({ type: 'TOAST_ADD', payload: {errors: err.response.data.msg}})
    }
}

export const deleteSenario = (auth, senarioId, history) => async (dispatch) => {
    if(!auth.access_token || !auth.user) return;

    try {
        await deleteAPI(`senarii/${senarioId}`, auth.access_token)

        history.push(`/account/scenarii`)
    } catch (err) {
        dispatch({ type: 'TOAST_ADD', payload: {errors: err.response.data.msg}})
    }
}

export const addComment = (form, auth, scenarii_id) => async(dispatch) => {
    if(!auth.access_token || !auth.user) return;

    try {
        if (form !== '') {
            dispatch({ type: 'ADD_COMMENT', payload: {com: form, owner: auth.user}})

            await postAPI(`senarii/${scenarii_id}/comment`, {com: form, owner: auth.user._id}, auth.access_token)
        } else {
            dispatch({ type: 'TOAST_ADD', payload: {errors: 'Vous devez remplir le champs commentaire.'}})    
        }
    } catch (err) {
        dispatch({ type: 'TOAST_ADD', payload: {errors: err.response.data.msg}})
    }
}

export const delComment = (auth, scenarii_id, index) => async (dispatch) => {
    if(!auth.access_token || !auth.user) return;

    try {
        const res = await deleteAPI(`senarii/${scenarii_id}/comment/${index}`, store.getState().auth.access_token)
        dispatch({ type: 'TOAST_ADD', payload: {success: res.data.msg}})
        dispatch({
            type: 'SET_SENARIO',
            payload: res.data.scenario
        })
    } catch (err) {
        dispatch({ type: 'TOAST_ADD', payload: {errors: err.response.data.msg}})
    }
}