import axios from 'axios'

export const postAPI = async (url, post, token) => {
    const res = await axios.post(`${process.env.REACT_APP_URL_API}/api/${url}`, post, {
        headers: { Authorization: token }
    })

    return res
}

export const getAPI = async (url, token) => {
    const res = await axios.get(`${process.env.REACT_APP_URL_API}/api/${url}`, {
        headers: { Authorization: token }
    })

    return res
}

export const patchAPI = async (url, post, token) => {
    const res = await axios.patch(`${process.env.REACT_APP_URL_API}/api/${url}`, post, {
        headers: { Authorization: token }
    })

    return res
}

export const putAPI = async (url, post, token) => {
    const res = await axios.put(`${process.env.REACT_APP_URL_API}/api/${url}`, post, {
        headers: { Authorization: token }
    })

    return res
}

export const postImage = async (url, form, token) => {
    const res = await axios.post(`${process.env.REACT_APP_URL_API}/api/${url}`, form, {
        headers: {
            Authorization: token
        }
    })

    return res
}

export const deleteAPI = async (url, token) => {
    const res = await axios.delete(`${process.env.REACT_APP_URL_API}/api/${url}`, {
        headers: { Authorization: token }
    })

    return res
}