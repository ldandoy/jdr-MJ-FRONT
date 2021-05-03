import axios from "axios";
axios.defaults.withCredentials = true;

export const register = async (data) => {
    const responseData = await axios.post(`http://localhost:1337/api/register`, data)
    .then(response => {
        return {
            status: response.status,
            message: response.data
        }
    }).catch(error => {
        return {
            status: error.response.status,
            message: error.response.data
        }
    })
    console.log(responseData);
    return responseData;
}

export const login = async (data) => {
    const responseData = await axios.post(`http://localhost:1337/api/login`, data, { withCredentials: true })
    .then(response => {
        console.log(response)
        return {
            status: response.status,
            message: response.data
        }
    }).catch(error => {
        return {
            status: error.response.status,
            message: error.response.data
        }
    })
    return responseData;
}