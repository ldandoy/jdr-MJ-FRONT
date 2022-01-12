import React, { useState, useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { Link, useHistory } from 'react-router-dom'

import { getAPI } from '../../services/FetchData'

const ListScenarii = () => {
    let history = useHistory()
    const dispatch = useDispatch()
    const { auth } = useSelector((state) => state)
    const [senarii, setSenarii] = useState([])

    const getScenarri = useCallback(async () => {
        if (!auth || !auth.user) return
        
        const res = await getAPI('/scenarios/visible', auth.token)
        setSenarii(res.data)
    }, [auth])

    useEffect(() => {
        getScenarri()
    }, [getScenarri])

    const deleteSenarii = (e, senarioId) => {
        e.preventDefault()

        // dispatch(deleteSenario(auth, senarioId, history))
    }

    return (<>
        <section>
            <div className="container">
                <h1 className="title">Vos Scenarii</h1>
            </div>
        </section>
        <section>
            <div className="container mt-30">
                <Link to={`/account/scenarii/new`}><button className="btn btn-green"><i className="fas fa-plus"></i> Créer un nouveau scénario</button></Link>
            </div>
        </section>
        <section>
            <div className="container mt-30">
                <div className="grid grid-cols-4 gap-8">
                    { senarii && senarii.map((senario) =>
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
    </>)
}

export default ListScenarii
