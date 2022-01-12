import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import Alert from '../Alert/Alert'
import { postAPI } from '../../services/FetchData'
import { loginPending, loginSuccess, loginFail } from '../../redux/slices/authSlice'
import { setError } from '../../redux/slices/alertSlice'

const LoginPass =  () => {
    let history = useHistory()
    const initialState = { account: "", password: ""}
    const [form, setForm] = useState(initialState)
    const {account, password} = form
    const [typePass, setTypePass] = useState(false)
    const dispatch = useDispatch()
    const { isLoading } = useSelector(state => state.auth)

    const onChangeInputHandler = (e) => {
        const {name, value} = e.target
        setForm({...form, [name]: value})
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault()
        dispatch(loginPending())

        try {
            const res = await postAPI("login", form)
            dispatch(loginSuccess(res.data))
            history.push('/')
        } catch (error) {
            dispatch(loginFail(error.response.data.msg))
            dispatch(setError(error.response.data.msg))
        }
    }

    return (
        <form className="form-no-bordered" onSubmit={onSubmitHandler}>
            <Alert />
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
                    {!isLoading ? "Connexion" : "Chargement..." }
                </button>
            </div>
        </form>
    )
}

export default LoginPass