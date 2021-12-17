import { Link, useHistory } from "react-router-dom"
import { useEffect } from 'react'
import { useSelector } from "react-redux"

import Alert from '../components/Alert/Alert'
import LoginPass from "../components/LoginPass/LoginPass"
import GoogleAuthButton from '../components/GoogleAuthButton/GoogleAuthButton'

const Login = () => {
    const history = useHistory()

    const { auth } = useSelector(state => state)

    useEffect(() => {
        if (auth.access_token) history.push('/')
    }, [auth, history])

    return (<div className="card w-50 mx-auto bg-white">
        <div className="card-title txt-center txt-green">
            <h1>Connexion au service</h1>
        </div>
        <div className="card-body">
            <Alert />
            <LoginPass />
            <div className="txt-center mt-30 flex">
                <div className="w-50">
                    <GoogleAuthButton />
                </div>
                <div className="w-50">
                    <p><Link to={`/register`} className="txt-size-14 txt-green">Pas encore de compte ?</Link></p>
                    <p><Link to={`/forgot_password`} className="txt-size-14 txt-green">Mot de passe oublié ?</Link></p>
                </div>
            </div>
        </div>
    </div>)
}

export default Login