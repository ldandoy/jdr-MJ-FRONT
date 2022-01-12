import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

import Alert from '../Alert/Alert'
import { postAPI } from "../../services/FetchData"
import { setSuccess, setError } from '../../redux/slices/alertSlice'

const ResetPass =  () => {
    let { reset_token } = useParams();
    
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

    const onSubmitHandler = async (e) => {
        e.preventDefault()

        try {
            const res = await postAPI(`reset_password/${reset_token}`, {form})
            dispatch(setSuccess(res.data.msg))
            setForm(initialState)
        } catch (error) {
            dispatch(setError(error.response.data.msg))
        }
    }

    return (
        <form className="form form-no-bordered" onSubmit={onSubmitHandler}>
            <Alert />
            <div className="form-group">
                <label htmlFor="" className="form-label">Identifiant</label>
                <input type="text" name="account" value={account} className="form-input" onChange={onChangeInputHandler} placeholder="Entrez votre email" />
            </div>

            <div className="form-group">
                <label htmlFor="" className="form-label">Mot de passe</label>
                <div className="form-input-group">
                    <input type={typePass ? "text" : "password" } name="password" value={password} className="form-input" onChange={onChangeInputHandler} placeholder="Mot de passe" />
                    <small onClick={() => setTypePass(!typePass)}>
                        { typePass ? 'Hide' : "Show" }
                    </small>
                </div>
            </div>
            <div className="form-group">
                <label htmlFor="" className="form-label">Confirmez votre mot de passe</label>
                <div className="form-input-group">
                    <input type={typeCfPass ? "text" : "password" } name="cf_password" value={cf_password} className="form-input" onChange={onChangeInputHandler} placeholder="Confirmez le mot de passe" />
                    <small onClick={() => setTypeCfPass(!typeCfPass)}>
                        { typeCfPass ? 'Hide' : "Show" }
                    </small>
                </div>
            </div>

            <div className="form-group">
                <button className="btn bg-green txt-white-100 w-100 p-20"
                disabled={account && password && cf_password ? false : true}
                >
                    Envoyer
                </button>
            </div>
        </form>
    )
}

export default ResetPass