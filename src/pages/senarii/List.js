import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { getAPI } from '../../services/FetchData'

const List = () => {
    const [senarii, setSenarii] = useState([])

    const getVisibleSenarii = async () => {
        let data = await getAPI(`senarii/visible`)

        setSenarii(data.data)
    }

    useEffect(() => {
        getVisibleSenarii()
    }, [])

    return (<>
        <img src="ban.png" alt="banniere du site" />
        <section className="mtb-80">
            <div className="container">
                <h1 className="title">Listes des sénarii</h1>
            </div>
            <div className="container mt-30">
                <div className="grid grid-cols-4 gap-8">
                    { senarii && senarii.map((senario) =>
                        <div key={senario._id} className="card">
                            <div className="card-image">
                                <img src={senario.picture} alt={senario.title} className="" />
                            </div>
                            <div className="card-title">{senario.status === "Béta" && <span class="badge bg-warning">Béta</span>} {senario.title}</div>
                            <div className="card-body">{senario.description}</div>
                            <div className="card-footer txt-right">
                                <Link to={`/senarii/${senario._id}`}><button className="btn btn-success">Faire ce sénario</button></Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    </>)
}

export default List