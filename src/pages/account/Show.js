import { useState } from 'react'
import { useSelector, useDispatch } from "react-redux"

import { updateUser, resetPassword } from '../../redux/actions/profileAction'

const Show = () => {
    const initState = {
        name: '',
        account: '',
        avatar: '',
        password: '',
        cf_password: ''
    }

    const { auth } = useSelector((state) => state)
    const dispatch = useDispatch()

    const [user, setUser] = useState(initState)
    const [typePass, setTypePass] = useState(false)
    const [typeCfPass, setTypeCfPass] = useState(false)

    const onChangeInputHandler = (e) => {
        const {name, value} = e.target
        setUser({...user, [name]: value})
    }

    const onChangeFileHandler = (e) => {
        const target = e.target
        const files = target.files

        if (files) {
            const file = files[0]
            setUser({...user, avatar: file})
        }
    }

    const onSubmitHandle = (e) => {
        e.preventDefault()

        if (avatar || name) {
            dispatch(updateUser(avatar, name, auth))
        }

        if (password && auth.access_token) {
            dispatch(resetPassword(password, cf_password, auth.access_token))
        }
    }

    const { name, account, avatar, password, cf_password } = user

    return (<section>
        <div className="container">
            <h1>Mon compte</h1>
            { auth.user ? <form onSubmit={onSubmitHandle}>
                <div className="form-group">
                    <div className="w-30">
                        <img className="img-thumbnails" src={avatar ? URL.createObjectURL(avatar): auth.user?.avatar} alt={account} />
                    </div>
                    <input type="file" accept="image/*" name="file" id="file_up" onChange={onChangeFileHandler} />
                </div>

                <div className="form-group">
                    <label htmlFor="" className="form-label">Name</label>
                    <input type="text" name="name" defaultValue={auth.user.name} className="form-input" onChange={onChangeInputHandler} placeholder="Nom" />
                </div>
                <div className="form-group">
                    <label htmlFor="" className="form-label">Identifiant</label>
                    <input type="text" disabled={true} name="account" defaultValue={auth.user.account} className="form-input" onChange={onChangeInputHandler} placeholder="Email ou numéro de téléphone" />
                </div>
                { auth.user.type === 'normal' && <>
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
                            <input type={typeCfPass ? "text" : "password" } name="cf_password" value={cf_password} className="form-input" onChange={onChangeInputHandler} placeholder="Confirmez Mot de passe" />
                            <small onClick={() => setTypeCfPass(!typeCfPass)}>
                                { typeCfPass ? 'Hide' : "Show" }
                            </small>
                        </div>
                    </div>
                </> }
                <div className="form-group">
                    <button type="submit" className="btn bg-purple-600 txt-white-100 hover:bg-purple-900 w-100 p-20">
                        Enregistrez
                    </button>
                </div>
            </form>: <></>}
        </div>
    </section>)
}

export default Show