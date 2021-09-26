import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { useHistory, useParams, Link } from 'react-router-dom'

import { getSenerio } from '../../redux/actions/senarriActions'

const Section = () => {
    const history = useHistory()
    const { auth, senario } = useSelector((state) => state)
    const dispatch = useDispatch()
    const { senarii_id, sections_index } = useParams()

    const [section, setSection] = useState(null)

    useEffect(() => {
        dispatch(getSenerio(auth, senarii_id))
    }, [dispatch, auth, senarii_id])

    useEffect(() => {
        if (!senario) return

        setSection(senario.sections[sections_index])

        if (typeof section === 'undefined') {
            history.push(`/senarii/${senario._id}`)
        }
    }, [section, senario, sections_index, history])

    return (<>
        { section &&
            <section>
                <div className="container"> 
                    <h1 className="title-page">{section.title}</h1>
                </div>
                <div className="container mt-30">
                    <div className="grid grid-cols-2 gap-8">
                        <div>
                            { section.picture && <img src={section.picture} alt="section.title" className="img-fluid" /> }
                        </div>
                        <div>
                            {section.description}
                        </div>
                    </div>
                </div>
                <div className="container mt-30 flex flex-jc-space-between">
                    {
                        section.actions.map((action, index) => {
                            return <div key={index}><Link to={`/senarii/${senarii_id}${action.url}`} className="btn btn-success" refresh="true">{action.label}</Link></div>
                        })
                    }
                </div>
            </section>
        }</>
    )
}

export default Section