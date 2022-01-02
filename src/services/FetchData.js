import axios from 'axios'
import store from '../redux/store'
import jwt_decode from 'jwt-decode'
import dayjs from 'dayjs'

const ax = axios.create({
    baseURL: process.env.REACT_APP_URL_API,
    withCredentials: true,
})

ax.interceptors.request.use(async req => {
    const token = (typeof store.getState().auth.access_token === 'undefined') ? null : jwt_decode(store.getState().auth.access_token)
    let response

    if (token) {
        const isExpired = dayjs.unix(token.exp).diff(dayjs()) < 1
        
        if (!isExpired) return req
    }

    response = await axios.get(`${process.env.REACT_APP_URL_API}/api/refresh_token`,{
        withCredentials: true
    })

    req.headers.Authorization = response.data.access_token

    store.dispatch({ type: 'AUTH', payload: response.data })

    return req
})

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