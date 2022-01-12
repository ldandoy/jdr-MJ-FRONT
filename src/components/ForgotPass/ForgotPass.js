import { useState } from 'react'
import { useDispatch } from 'react-redux'

import Alert from '../Alert/Alert'
import { postAPI } from '../../services/FetchData'
import { setSuccess, setError } from '../../redux/slices/alertSlice'

const ForgotPass =  () => {
    const [account, setAccount] = useState('')

    const dispatch = useDispatch()

    const onChangeInputHandler = (e) => {
        setAccount(e.target.value)
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault()

        try {
            const res = await postAPI('forgot_password', {account})
            dispatch(setSuccess(res.data.msg))
        } catch (error) {
            dispatch(setError(error.response.data.msg))
        }
    }

    return (
        <form className="form-no-bordered" onSubmit={onSubmitHandler}>
            <Alert />
            <div className="form-group">
                <label htmlFor="" className="form-label">Identifiant</label>
                <input type="text" name="account" value={account} className="form-input" onChange={onChangeInputHandler} placeholder="Renseigner l'email du compte à réinitialiser" />
            </div>
            <div className="form-group">
                <button className="btn bg-green txt-white-100 w-100 p-20"
                disabled={account ? false : true}
                >
                    Envoyer
                </button>
            </div>
        </form>
    )
}

export default ForgotPass