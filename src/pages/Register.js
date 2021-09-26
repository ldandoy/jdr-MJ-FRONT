import { Link } from "react-router-dom"

import Register from "../components/Register/Register"

const RegisterPage = () => {
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