import { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { useParams, Link } from 'react-router-dom'

import { getSenerio } from '../../redux/actions/senarriActions'

const Start = () => {
    const { auth, senario } = useSelector((state) => state)
    const dispatch = useDispatch()
    const { senarii_id } = useParams()

    useEffect(() => {
        dispatch(getSenerio(auth, senarii_id))
    }, [dispatch, auth, senarii_id])

    return (<>
        { senario &&
            <section> 
                <div className="container">
                    <h1 className="title-page">Bienvenu sur le sénario</h1>
                </div>
                <div className="container mt-30">
                    <img src={senario.picture} alt={ senario.title } className="" width={500} />
                    <h2 className="text-center">{ senario.title }</h2>
                    <div className="text-center">{ senario.description }</div>
                    <div className="text-center"><Link to={`/senarii/${senario._id}/sections/0`} className="btn btn-success">Lancer le sénario</Link></div>
                </div>
            </section>
        }
    </>)
}

export default Start