import { Link, useHistory } from "react-router-dom"
import { useEffect } from 'react'
import { useSelector } from "react-redux"

import Register from "../components/Register/Register"
import GoogleAuthButton from '../components/GoogleAuthButton/GoogleAuthButton'

const RegisterPage = () => {
    const history = useHistory()

    const { auth } = useSelector(state => state)

    useEffect(() => {
        if (auth.token) history.push('/')
    }, [auth.token, history])
    
    return (<div className="card w-50 mx-auto bg-white">
        <div className="card-title txt-center txt-green">
            <img src="/mjv-blanc-vert.png" width={150} alt="logo" />
        </div>
        <div className="card-title txt-center txt-gray-900"><h1>Créez votre compte</h1></div>
        <div className="card-body">
            <Register />
            <div className="txt-center mt-30 flex">
                <div className="w-50">
                    <GoogleAuthButton />
                </div>
                <div className="w-50">
                    <div className="txt-center mt-20">
                        <Link to={`/login`} className="txt-size-14 txt-green">Déjà un compte ?</Link>
                    </div>
                </div>
            </div>
        </div>
    </div>)
}

export default RegisterPage