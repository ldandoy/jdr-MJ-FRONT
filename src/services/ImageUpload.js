import { postImage } from '../services/FetchData'

export const checkImage = (file) => {
  let err = ''
  if(!file) return err = "File does not exist."

  if(file.size > 1024 * 1024) // 1mb
    err = "The largest image size is 1mb"

  return err;
}

export const imageUpload = async (file, token) => {
  const formData = new FormData()
  formData.append("file", file)
  
  return await postImage("update_profile_image", formData, token)
}