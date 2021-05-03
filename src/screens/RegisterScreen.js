import { useState } from 'react';
import { Link, useHistory } from "react-router-dom";

import { register } from '../services/auth'

const RegisterScreen = (props) => {
    let history = useHistory();

    const [data, setData] = useState({
        email: '',
        email2: '',
        password: '',
        password2: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setData({...data, [name]:value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const res = await register(data)
        console.log(res)

        // Si le user à bien été créé.
        if (res.status === 200) {
            history.push("/login")
        }
    }

    return <div className="container">
        <div className="row">
            <div className="col-12">
                <div className="screen">
                    <h1 className="text-center mt-4">Inscription</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" value={data.email} onChange={handleChange} />

                        <label htmlFor="email">Confirmer votre email</label>
                        <input type="email" name="email2" value={data.email2} onChange={handleChange} />

                        <label htmlFor="password">Votre mot de passe</label>
                        <input type="password" name="password" value={data.password} onChange={handleChange} />

                        <label htmlFor="password2">Confirmez votre mot de passe</label>
                        <input type="password" name="password2" value={data.password2} onChange={handleChange} />

                        <input type="submit" value="Envoyer" name="send" />
                        <Link to="/login">Déjà un compte</Link>
                    </form>
                </div>
            </div>
        </div>
    </div>
}

export default RegisterScreen;