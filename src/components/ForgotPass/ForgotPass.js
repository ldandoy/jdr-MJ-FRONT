import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { forgotPass } from '../../redux/actions/authActions'
import Alert from '../Alert/Alert'

const ForgotPass =  () => {
    const [account, setAccount] = useState('')

    const dispatch = useDispatch()

    const onChangeInputHandler = (e) => {
        setAccount(e.target.value)
    }

    const onSubmitHandler = (e) => {
        e.preventDefault()
        dispatch(forgotPass(account))
    }

    return (
        <form className="form-no-bordered" onSubmit={onSubmitHandler}>
            <Alert />
            <div className="form-group">
                <label htmlFor="" className="form-label">Identifiant</label>
                <input type="text" name="account" value={account} className="form-input" onChange={onChangeInputHandler} placeholder="Email ou numéro de téléphone" />
            </div>
            <div className="form-group">
                <button className="btn bg-purple-600 txt-white-100 hover:bg-purple-900 w-100 p-20"
                disabled={account ? false : true}
                >
                    Envoyer
                </button>
            </div>
        </form>
    )
}

export default ForgotPass