import axios from 'axios'

const ax = axios.create({
    baseURL: process.env.REACT_APP_URL_API,
    withCredentials: true,
  });

export const postAPI = async (url, post, token) => {
    const res = await ax.post(`/api/${url}`, post, {
        headers: { Authorization: token }
    })

    return res
}

export const getAPI = async (url, token) => {
    const res = await ax.get(`/api/${url}`, {
        headers: { Authorization: token }
    })

    return res
}

export const patchAPI = async (url, post, token) => {
    const res = await ax.patch(`/api/${url}`, post, {
        headers: { Authorization: token }
    })

    return res
}

export const putAPI = async (url, post, token) => {
    const res = await ax.put(`/api/${url}`, post, {
        headers: { Authorization: token }
    })

    return res
}

export const postImage = async (url, form, token) => {
    const res = await ax.post(`/api/${url}`, form, {
        headers: { Authorization: token }
    })

    return res
}

export const deleteAPI = async (url, token) => {
    const res = await ax.delete(`/api/${url}`, {
        headers: { Authorization: token }
    })

    return res
}