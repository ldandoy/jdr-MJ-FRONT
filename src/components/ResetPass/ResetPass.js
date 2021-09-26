import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

import { resetPass } from '../../redux/actions/authActions'
import Alert from '../Alert/Alert'

const ResetPass =  () => {
    let { reset_token } = useParams();
    console.log(reset_token)

    const initialState = { account: "", password: "", cf_password: "" }
    const [form, setForm] = useState(initialState)
    const [typePass, setTypePass] = useState(false)
    const [typeCfPass, setTypeCfPass] = useState(false)

    const {account, password, cf_password} = form

    const dispatch = useDispatch()

    const onChangeInputHandler = (e) => {
        const {name, value} = e.target
        setForm({...form, [name]: value})
    }

    const onSubmitHandler = (e) => {
        e.preventDefault()
        dispatch(resetPass(form, reset_token))
    }

    return (
        <form className="form-no-bordered" onSubmit={onSubmitHandler}>
            <Alert />
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
                <label htmlFor="" className="form-label">Confirmez votre mot de passe</label>
                <input type={typeCfPass ? "text" : "password" } name="cf_password" value={cf_password} className="form-input" onChange={onChangeInputHandler} placeholder="Confirmez le mot de passe" />
                <small onClick={() => setTypeCfPass(!typeCfPass)}>
                    { typeCfPass ? 'Hide' : "Show" }
                </small>
            </div>

            <div className="form-group">
                <button className="btn bg-purple-600 txt-white-100 hover:bg-purple-900 w-100 p-20"
                disabled={account && password && cf_password ? false : true}
                >
                    Envoyer
                </button>
            </div>
        </form>
    )
}

export default ResetPass