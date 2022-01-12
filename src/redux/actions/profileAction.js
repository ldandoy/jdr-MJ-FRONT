import { patchAPI } from '../../services/FetchData'
import { checkPassword } from '../../utils/Valid'

export const resetPassword = (password, cf_password, token) => async (dispatch) => {
  const msg = checkPassword(password, cf_password)
  
  if(msg) return dispatch({ type: 'TOAST_ADD', payload: {errors: msg}})

  try {
    const res = await patchAPI('reset_password', { password }, token)

    dispatch({ type: 'TOAST_ADD', payload: {success: res.data.msg}})
  } catch (err) {
    dispatch({ type: 'TOAST_ADD', payload: {errors: err.response.data.msg}})
  }
}