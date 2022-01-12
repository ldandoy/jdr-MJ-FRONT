import { useEffect, useCallback } from 'react';
import { useGoogleLogout } from 'react-google-login'
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux"

import { logout } from '../redux/slices/authSlice'
import { getAPI } from "../services/FetchData"

const Logout =  () => {
    let history = useHistory()
    const dispath = useDispatch()

    const { signOut } = useGoogleLogout({
        clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        onFailure: (response) => {
            console.log("Error while logout: ", response)
        },
        onLogoutSuccess: (response) => {
            history.push("/login")
        }
    })

    const logoutCall = useCallback(async () => {
        await getAPI('logout')
        dispath(logout())
        signOut()
        history.push("/login")
    },[dispath, signOut, history],)

    useEffect(() => {
        logoutCall()
    }, [logoutCall])

    return null
}

export default Logout