import { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux"

import { resetPassword } from '../../redux/actions/profileAction'
import { deleteSenario } from '../../redux/actions/senarriActions'

import { setUserSuccess } from '../../redux/slices/authSlice'
import { checkImage, imageUpload } from '../../services/ImageUpload'
import { patchAPI } from '../../services/FetchData'

const Show = () => {
    const initState = {
        name: '',
        account: '',
        avatar: '',
        password: '',
        cf_password: ''
    }

    const { user, token, isAuth } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    let history = useHistory()

    const [form, setForm] = useState(initState)
    const [typePass, setTypePass] = useState(false)
    const [typeCfPass, setTypeCfPass] = useState(false)

    const onChangeInputHandler = (e) => {
        const {name, value} = e.target
        setForm({...form, [name]: value})
    }

    const onChangeFileHandler = (e) => {
        const target = e.target
        const files = target.files

        if (files) {
            const file = files[0]
            setForm({...form, avatar: file})
        }
    }

    const onSubmitHandle = async (e) => {
        e.preventDefault()

        let url = ''
        if (form.avatar || form.name) {
            /*dispatch(updateUser(avatar, name, token))*/

            if(form.avatar && form.avatar !== ""){
                const check = checkImage(form.avatar)
                if(check) return 
          
                // Return the new url
                const photo = await imageUpload(form.avatar, token)
                url = photo.data.url
            }
          
            const res = await patchAPI('me', { 
                avatar: url ? url : null, 
                name: form.name ? form.name : "",
                _id: user._id
            }, token)

            console.log("path", res.data);

            dispatch(setUserSuccess({ user: res.data }))
        }

        if (form.password) {
            // dispatch(resetPassword(form.password, form.cf_password, token))
        }
    }

    const deleteSenarii = (e, senarioId) => {
        e.preventDefault()

        dispatch(deleteSenario(token, senarioId, history))
    }

    return (<>
        <img src="ban.png" className="img-fluid" alt="banniere du site" />
        
        <section>
            <div className="container mt-100">
                <h1 className="title">Mon compte</h1>
            </div>
        </section>

        <section>
            <div className="container">
                { isAuth && <form onSubmit={onSubmitHandle}>
                    <div className="row row-half">
                        <div className="col">
                            <div className="form-group">
                                <div className="w-30">
                                    <img className="img-thumbnails" src={form.avatar ? URL.createObjectURL(form.avatar): form.avatar} alt={form.account} />
                                </div>
                                <input type="file" accept="image/*" name="file" id="file_up" onChange={onChangeFileHandler} />
                            </div>
                        </div>
                        <div className="col">
                            <div className="form-group">
                                <label htmlFor="" className="form-label">Identifiant</label>
                                <input type="text" disabled={true} name="account" value={form.account} className="form-input" onChange={onChangeInputHandler} placeholder="Email ou numéro de téléphone" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="" className="form-label">Name</label>
                                <input type="text" name="name" value={form.name} className="form-input" onChange={onChangeInputHandler} placeholder="Nom" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="" className="form-label">Type de compte</label>
                                <input type="text" disabled={true} name="type" value={form.type} className="form-input" onChange={onChangeInputHandler} placeholder="Type de compte" />
                            </div>
                            { user.type === 'normal' && <>
                                <div className="form-group">
                                    <label htmlFor="" className="form-label">Mot de passe</label>
                                    <div className="form-input-group">
                                        <input type={typePass ? "text" : "password" } name="password" value={form.password} className="form-input" onChange={onChangeInputHandler} placeholder="Mot de passe" />
                                        <small onClick={() => setTypePass(!typePass)}>
                                            { typePass ? 'Hide' : "Show" }
                                        </small>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="" className="form-label">Confirmez votre mot de passe</label>
                                    <div className="form-input-group">
                                        <input type={typeCfPass ? "text" : "password" } name="cf_password" value={form.cf_password} className="form-input" onChange={onChangeInputHandler} placeholder="Confirmez Mot de passe" />
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
                <h2 className="title">Vos scénarii</h2>
            </div>
        </section>

        <section>
            <div className="container mt-30">
                <Link to={`/account/scenarii/new`}><button className="btn btn-green"><i className="fas fa-plus"></i> Créer un nouveau scénario</button></Link>
            </div>
        </section>

        { isAuth && user.senarii.length > 0 ? <section>
            <div className="container mt-30">
                <div className="grid grid-cols-4 gap-8">
                    { user.senarii.map((senario) =>
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