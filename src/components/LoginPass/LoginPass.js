import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { login } from '../../redux/actions/authActions'

const LoginPass =  () => {
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
                <label htmlFor="" className="form-label txt-green">Identifiant</label>
                <input type="text" name="account" value={account} className="form-input" onChange={onChangeInputHandler} placeholder="Entrez votre email" />
            </div>
            <div className="form-group">
                <label htmlFor="" className="form-label txt-green">Mot de passe</label>
                <div className="form-input-group">
                    <input type={typePass ? "text" : "password" } name="password" value={password} className="form-input" onChange={onChangeInputHandler} placeholder="Mot de passe" />
                    <small onClick={() => setTypePass(!typePass)}>
                        { typePass ? 'Hide' : "Show" }
                    </small>
                </div>
            </div>
            <div className="form-group">
                <button className="btn bg-green txt-white-100 w-100 p-20"
                disabled={(account && password) ? false : true}
                >
                    Connexion
                </button>
            </div>
        </form>
    )
}

export default LoginPass