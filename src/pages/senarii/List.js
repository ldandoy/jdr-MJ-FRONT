import { useCallback, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { Link } from 'react-router-dom'

import { getList } from '../../redux/actions/senarriActions'

const List = () => {
    const { auth, senarii } = useSelector((state) => state)
    const dispatch = useDispatch()

    const fetchSenarii = useCallback(async (auth) => {
        await dispatch(getList(auth))
    },[dispatch])
    
    useEffect(() => {
        fetchSenarii(auth)
    }, [auth, fetchSenarii])

    return (<section>
        <div className="container">
            <h1 className="title-page">Choisis le sénario que tu veux faire :</h1>
        </div>
        <div className="container mt-30">
            <div className="grid grid-cols-4 gap-8">
                { senarii.data && senarii.data.map((senario) =>
                    <div key={senario._id} className="card">
                        <div className="card-title">{senario.title}</div>
                        <div className="card-body">{senario.description}</div>
                        <div className="card-footer txt-right">
                            <Link to={`/senarii/${senario._id}`}><button className="btn btn-success">Faire ce sénario</button></Link>
                        </div>
                    </div>)
                }
            </div>
        </div>
    </section>)
}

export default List