import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { login } from '../../redux/actions/authActions'

const LoginSms =  () => {
    const initialState = { account: "", password: ""}
    const [form, setForm] = useState(initialState)
    const {account, password} = form
    const [typePass, setTypePass] = useState(false)
    const dispatch = useDispatch()

    const onChangeInputHandler = (e) => {
        const {name, value} = e.target
        setForm({...form, [name]: value})
    }

    const onSubmitHandler = (e) => {
        e.preventDefault()
        dispatch(login(form))
    }

    return (
        <form className="form-no-bordered" onSubmit={onSubmitHandler}>
            <div className="form-group">
                <label htmlFor="" className="form-label">Identifiant</label>
                <input type="text" name="account" value={account} className="form-input" onChange={onChangeInputHandler} placeholder="Email ou numéro de téléphone" />
            </div>
            <div className="form-group">
                <label htmlFor="" className="form-label">Mot de passe</label>
                <input type={typePass ? "text" : "password" } name="password" value={password} className="form-input" onChange={onChangeInputHandler} placeholder="Mot de passe" />
                <small onClick={() => setTypePass(!typePass)}>
                    { typePass ? 'Hide' : "Show" }
                </small>
            </div>
            <div className="form-group">
                <button className="btn bg-purple-600 txt-white-100 hover:bg-purple-900 w-100 p-20"
                disabled={(account && password) ? false : true}
                >
                    Connexion
                </button>
            </div>
        </form>
    )
}

export default LoginSms