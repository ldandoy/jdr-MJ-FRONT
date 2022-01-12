import { postAPI, getAPI } from '../../services/FetchData'

/*export const login = (userLogin) => async (dispatch) => {
    try {
        const res = await postAPI("login", userLogin)
        
        dispatch({ type: 'AUTH', payload: res.data })

        dispatch({ type: "ALERT", payload: { success: res.data.msg } })

    } catch (error) {
        dispatch({ type: 'ALERT', payload: { errors: error.response.data.msg }})
    }
}*/

/*export const register = (userRegister) => async (dispatch) => {
    try {
        const res = await postAPI("register", userRegister)
        
        dispatch({
            type: 'AUTH',
            payload: {
                token: res.data.access_token,
                user: res.data.user
            }
        })

        dispatch({
            type: "TOAST_ADD",
            payload: { success: res.data.msg}

        })
    } catch (error) {
        dispatch({type: 'TOAST_ADD', payload: { errors: error.response.data.msg }})
    }
}*/

/*export const refreshToken = () => async (dispatch) => {
    try {
        const res = await getAPI("refresh_token")
        dispatch({ type: 'AUTH', payload: res.data })
    } catch (error) {
        // dispatch({type: 'TOAST_ADD', payload: { errors: error.message }})
    }
}*/

/*export const logout = () => async (dispatch) => {
    try {
        localStorage.removeItem('logged')
        await getAPI('logout')
    } catch (error) {
        dispatch({ type: 'TOAST_ADD', payload: { errors: error.response.data.msg } })
    }
}*/

/*export const googleLogin = (id_token) => async (dispatch) => {
    try {
        const res = await postAPI('google_login', { id_token })

        dispatch({ type: 'AUTH', payload: res.data })

        dispatch({ type: 'TOAST_ADD', payload: { success: res.data.msg } })
    } catch (error) {
        dispatch({type: 'TOAST_ADD', payload: { errors: error.response.data.msg } })
    }
}*/

/*export const forgotPass = (account) => async (dispatch) => {
    try {
        const res = await postAPI('forgot_password', {account})
    
        dispatch({ type: 'ALERT', payload: { success: res.data.msg } })
    } catch (error) {
        dispatch({type: 'ALERT', payload: { errors: error.response.data.msg } })
    }
}*/

export const resetPass = (form, reset_token) => async (dispatch) => {
    try {
        console.log(form, reset_token)

        const res = await postAPI('reset_password/'+reset_token, {form})

        console.log(res)
    
        dispatch({ type: 'ALERT', payload: { success: res.data.msg } })
    } catch (error) {
        dispatch({type: 'ALERT', payload: { errors: error.response.data.msg } })
    }
}