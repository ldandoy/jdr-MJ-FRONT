import React from 'react'
import { Link } from 'react-router-dom'

import ResetPass from '../components/ResetPass/ResetPass'

const ResetPassword = () => {
    return (<>
        <div className="card-title txt-center txt-gray-900">
            <h1>Mettre à jour votre mot de passe</h1>
        </div>
        <div className="card-body">
            <ResetPass />
            <div className="txt-center mt-50">
                <div className="txt-center mt-10">
                    <div>
                        <p><Link to={`/login`} className="txt-size-14 txt-gray-800">Vous connecter</Link></p>
                    </div>
                </div>
            </div>
        </div>
    </>)
}

export default ResetPassword