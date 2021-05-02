import { useState } from 'react';
import { Link, useHistory } from "react-router-dom";

import { login } from '../services/auth'

const LoginScreen = (props) => {
    let history = useHistory();

    const [data, setData] = useState({
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setData({...data, [name]:value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const res = await login(data)
        // console.log(res)

        setData({
            email: '',
            password: ''
        })

        // Si le user à bien été créé.
        /*if (res.status === 200) {
            history.push("/account")
        }*/
    }

    return <div className="container">
        <div className="row">
            <div className="col-12">
                <div className="screen">
                    <h1 className="text-center mt-4">Login</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" value={data.email} onChange={handleChange} />

                        <label htmlFor="password">Votre mot de passe</label>
                        <input type="password" name="password" value={data.password} onChange={handleChange} />

                        <input type="submit" value="Envoyer" name="send" />
                        <Link to="/register">Pas encore de compte</Link>
                    </form>
                </div>
            </div>
        </div>
    </div>
}

export default LoginScreen;