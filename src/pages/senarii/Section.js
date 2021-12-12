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
    const [action, setAction] = useState(null)
    const [done, setDone] = useState(null)

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

    const undoAction = (e) => {
        e.preventDefault()

        setAction(null)
    }

    const doAction = (e, action) => {
        e.preventDefault()

        setAction(action)
    }

    const doActionSuccess = (e) => {
        e.preventDefault()
        setDone("success")
    }

    const doActionFailed = (e) => {
        e.preventDefault()
        setDone("failed")
    }

    return (<>
        <section>
            { section && <>
                <div className="container mt-80"> 
                    <h1 className="title">{section.title}</h1>
                </div>

                <div className="container mt-30">
                    <div className="grid grid-cols-2 gap-8">
                        <div>
                            { section.picture && <img src={section.picture} alt="section.title" className="img-fluid" height={400} /> }
                        </div>
                        <div className="senario_description">
                            { action === null && section.description }
                            { action !== null && done === null && action.type === "testCompetence" && <>
                                <div>
                                    Pour réaliser ce test, lancez un D20 et ajoutez votre bonus de compétence de {action.competence}.
                                    <br /><br />
                                    Pour réussir il faut faire plus de {action.success}.
                                </div>
                                <div className="flex mt-20 flex-jc-space-around">
                                    <button onClick={doActionSuccess} className="btn btn-green">Si vous avez réussis</button>
                                    <button onClick={doActionFailed} className="btn btn-error">Si vous avez échoué</button>
                                    <button onClick={undoAction} className="btn btn-light">Ne pas faire l'action</button>
                                </div>
                            </>}

                            { action !== null && done === null && action.type === "combat" && <>
                                <div>
                                    {action.textCombat}
                                </div>
                                <div className="flex mt-20">
                                    <button onClick={doActionSuccess} className="btn btn-green">Si vous avez réussis</button>
                                    <button onClick={doActionFailed} className="btn btn-error">Si vous avez échoué</button>
                                </div>
                            </>}

                            { action !== null && done === "success" && <>
                                <div>
                                    {action.textSuccess}
                                </div>
                                <div className="flex mt-20">
                                    <Link to={`/senarii/${senarii_id}${action.gotoSuccess}`} className="btn btn-green">{action.gotoLabelSuccess}</Link>
                                </div>
                            </>}

                            { action !== null && done === "failed" && <>
                                <div>
                                    {action.textFailed}
                                </div>
                                { action.type !== "combat" && <div className="flex mt-20">
                                    <Link to={`/senarii/${senarii_id}${action.gotoFailed}`} className="btn btn-error">{action.gotoLabelFailed}</Link>
                                </div> }
                            </>}
                        </div>
                    </div>
                </div>
                <div className="container mt-30 flex flex-jc-space-around">
                    { action === null &&
                        section.actions.map((action, indexAction) => <div key={indexAction}>
                            { action.type === "goto" && 
                                <Link to={`/senarii/${senarii_id}${action.url}`} className="btn btn-green" refresh="true">{action.label}</Link>
                            }

                            { ((action.type === "testCompetence") || (action.type === "combat")) &&
                                <button onClick={(e) => doAction(e, action)} className="btn btn-green">{action.label}</button>
                            }
                        </div>)
                    }
                </div>
            </>}
        </section>
    </>)
}

export default Section