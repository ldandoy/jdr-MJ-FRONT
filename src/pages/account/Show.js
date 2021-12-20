import { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux"

import { updateUser, resetPassword } from '../../redux/actions/profileAction'
import { deleteSenario } from '../../redux/actions/senarriActions'

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
    let history = useHistory()

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

    const deleteSenarii = (e, senarioId) => {
        e.preventDefault()

        dispatch(deleteSenario(auth, senarioId, history))
    }

    const { name, account, avatar, password, cf_password } = user

    return (<>
        <img src="ban.png" className="img-fluid" alt="banniere du site" />
        
        <section>
            <div className="container mt-100">
                <h1 class="title">Mon compte</h1>
            </div>
        </section>

        <section>
            <div className="container">
                { auth.user && <form onSubmit={onSubmitHandle}>
                    <div className="row row-half">
                        <div className="col">
                            <div className="form-group">
                                <div className="w-30">
                                    <img className="img-thumbnails" src={avatar ? URL.createObjectURL(avatar): auth.user?.avatar} alt={account} />
                                </div>
                                <input type="file" accept="image/*" name="file" id="file_up" onChange={onChangeFileHandler} />
                            </div>
                        </div>
                        <div className="col">
                            <div className="form-group">
                                <label htmlFor="" className="form-label">Identifiant</label>
                                <input type="text" disabled={true} name="account" defaultValue={auth.user.account} className="form-input" onChange={onChangeInputHandler} placeholder="Email ou numéro de téléphone" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="" className="form-label">Name</label>
                                <input type="text" name="name" defaultValue={auth.user.name} className="form-input" onChange={onChangeInputHandler} placeholder="Nom" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="" className="form-label">Type de compte</label>
                                <input type="text" disabled={true} name="type" defaultValue={auth.user.type} className="form-input" onChange={onChangeInputHandler} placeholder="Type de compte" />
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
                                <button type="submit" className="btn bg-green txt-white-100 w-100 p-20">
                                    Enregistrez
                                </button>
                            </div>
                        </div>
                    </div>
                </form>}
            </div>
        </section>

        <section>
            <div className="container mt-100">
                <h2 class="title">Vos scénarii</h2>
            </div>
        </section>

        <section>
            <div className="container mt-30">
                <Link to={`/account/scenarii/new`}><button className="btn btn-green"><i className="fas fa-plus"></i> Créer un nouveau scénario</button></Link>
            </div>
        </section>

        { auth.user ? <section>
            <div className="container mt-30">
                <div className="grid grid-cols-4 gap-8">
                    { auth.user && auth.user.senarii.map((senario) =>
                        <div key={senario._id} className="card">
                            <div className="card-title">
                                {(senario.status === "Brouillon" || senario.status === "") && <span className="badge bg-light">Brouillon</span>}
                                {senario.status === "Béta" && <span className="badge bg-warning">Béta</span>}
                                {senario.status === "Publié" && <span className="badge bg-green">Publié</span>}
                                &nbsp;{senario.title}
                            </div>
                            <div className="card-body">{senario.description}</div>
                            <div className="card-footer txt-right">
                                <Link to={`/scenarii/${senario._id}`}><button className="btn btn-small btn-green"><i className="fas fa-eye"></i></button></Link>&nbsp;
                                <Link to={`/account/scenarii/${senario._id}/edit`}><button className="btn btn-small btn-beige"><i className="fas fa-pencil-alt"></i></button></Link>&nbsp;
                                <button onClick={(event) => { deleteSenarii(event, senario._id)}} className="btn btn-small btn-error"><i className="fas fa-trash-alt"></i></button>
                            </div>
                        </div>)
                    }
                </div>
            </div>
        </section>
        : <section>
            <div className="container mt-30">
                Vous n'avez pas de scénario pour le moment
            </div>
        </section> }
    </>)
}

export default Show