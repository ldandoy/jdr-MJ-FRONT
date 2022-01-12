import React from 'react'
import { Link } from 'react-router-dom'

import ForgotPass from '../components/ForgotPass/ForgotPass'

const ForgotPassword = () => {
    return (<div className="card w-50 mx-auto bg-white">
        <div className="card-title txt-center txt-green">
            <img src="/mjv-blanc-vert.png" width={150} alt="logo" />
        </div>
        <div className="card-title txt-center txt-gray-900"><h1>Mot de passe oublié</h1></div>
        <div className="card-body">
            <ForgotPass />
            <div className="txt-center mt-50">
                <div className="txt-center mt-10">
                    <div>
                        <p><Link to={`/login`} className="txt-size-14 txt-green">Vous connecter !</Link></p>
                    </div>
                </div>
            </div>
        </div>
    </div>)
}

export default ForgotPassword