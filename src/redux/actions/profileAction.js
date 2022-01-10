import { checkImage, imageUpload } from '../../services/ImageUpload'
import { patchAPI } from '../../services/FetchData'
import { checkPassword } from '../../utils/Valid'


/*export const updateUser = (avatar, name, auth) => async (dispatch) => {
  if(!auth.access_token || !auth.user) return;

  let url = '';
  try {
    
    if(avatar && avatar !== ""){
      const check = checkImage(avatar)
      if(check) 
        return dispatch({ type: 'TOAST_ADD', payload: { errors: check } })

      // Return the new url
      const photo = await imageUpload(avatar, auth.access_token)
      url = photo.data.url
    }

    const res = await patchAPI('me', { 
      avatar: url ? url : auth.user.avatar, 
      name: name ? name : auth.user.name,
      _id: auth.user._id
    }, auth.access_token)
    
    dispatch({ 
      type: 'AUTH',
      payload: {
        access_token: auth.access_token,
        user: {
          ...auth.user,
          avatar: url ? url : auth.user.avatar, 
          name: name ? name : auth.user.name
        }
      } 
    })

    dispatch({ type: 'TOAST_ADD', payload: {success: res.data.msg}})

  } catch (err) {
    dispatch({ type: 'TOAST_ADD', payload: {errors: err.response.data.msg}})
  }
}*/

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