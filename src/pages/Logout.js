import { useEffect } from 'react';
import { useGoogleLogout } from 'react-google-login'
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux"

import { logout } from '../redux/actions/authActions'

const Logout =  () => {
    let history = useHistory()
    const dispath = useDispatch()

    const { signOut } = useGoogleLogout({
        clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        onFailure: (response) => { console.log(response) },
        onLogoutSuccess: (response) => {
            history.push("/login")
        }
    })

    useEffect(() => {
        dispath(logout())
        signOut()
    }, [signOut, dispath])

    return null
}

export default Logout