import { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { useParams, Link } from 'react-router-dom'

import { getSenerio } from '../../redux/actions/senarriActions'

const Start = () => {
    const { auth, senario } = useSelector((state) => state)
    const dispatch = useDispatch()
    const { scenarii_id } = useParams()

    useEffect(() => {
        dispatch(getSenerio(auth, scenarii_id))
    }, [dispatch, auth, scenarii_id])

    return (<>
        <img src="/ban.png" className="img-fluid" alt="banniere du site" />
        { senario &&
            <section> 
                <div className="container mtb-80">
                    <h1 className="title">{ senario.title }</h1>
                </div>
                
                <div className="container mt-30">
                    <div className="grid grid-cols-2 gap-8">
                        <div>
                            <img src={senario.picture} alt={ senario.title } className="img-fluid" />
                        </div>
                        <div>
                            <div className="senario_description">{ senario.description }</div>
                        </div>
                    </div>
                </div>

                <div className="container mt-30 flex flex-jc-space-around">
                    <div className="text-center">
                        <Link to={`/scenarii/${senario._id}/sections/0`} className="btn btn-green">Commencer le sénario</Link>
                    </div>
                </div>
            </section>
        }
    </>)
}

export default Start