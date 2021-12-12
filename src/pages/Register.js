import { Link, useHistory } from "react-router-dom"
import { useEffect } from 'react'
import { useSelector } from "react-redux"

import Register from "../components/Register/Register"

const RegisterPage = () => {
    const history = useHistory()

    const { auth } = useSelector(state => state)

    useEffect(() => {
        if (auth.access_token) history.push('/')
    }, [auth.access_token, history])
    
    return (<>
        <div className="card-title txt-center txt-gray-900"><h1>Créez votre compte</h1></div>
        <div className="card-body">
            <Register />
            <div className="txt-center mt-20">
                <Link to={`/login`} className="txt-size-14 txt-gray-800">Déjà un compte ?</Link>
            </div>
        </div>
    </>)
}

export default RegisterPage