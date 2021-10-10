import React, { useState, useEffect } from 'react'
import { useSelector } from "react-redux"
import { Link } from 'react-router-dom'

const List = () => {
    const { auth } = useSelector((state) => state)
    const [senarii, setSenarii] = useState([])

    useEffect(() => {
        if (!auth || !auth.user || !auth.user.senarii) return
        
        setSenarii(auth.user.senarii)

    }, [auth])

    return (<section>
        <div className="container">
            <h1 className="title-page">Vos Senarii</h1>
        </div>
        <div className="container mt-30">
            <div className="grid grid-cols-4 gap-8">
                { senarii && senarii.map((senario) =>
                    <div key={senario._id} className="card">
                        <div className="card-title">{senario.title}</div>
                        <div className="card-body">{senario.description}</div>
                        <div className="card-footer txt-right">
                            <Link to={`/account/senarii/${senario._id}/edit`}><button className="btn btn-error">Editer</button></Link>
                            <Link to={`/senarii/${senario._id}`}><button className="btn btn-success">Voir</button></Link>
                        </div>
                    </div>)
                }
            </div>
        </div>
    </section>)
}

export default List
