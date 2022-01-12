import { useEffect, useState, useCallback } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { useParams, Link } from 'react-router-dom'

import { getAPI, postAPI, deleteAPI } from '../../services/FetchData'
import Alert from '../../components/Alert/Alert'
import { setSuccess } from '../../redux/slices/alertSlice'

const Start = () => {
    const { auth } = useSelector((state) => state)
    const dispatch = useDispatch()
    const { scenarii_id } = useParams()
    const [form, setForm] = useState('')
    const [scenario, setScenario] = useState(null)

    const getSenerio = useCallback(async (scenarii_id) => {
        const res = await getAPI(`scenarios/${scenarii_id}`, auth.token)

        setScenario(res.data)
    }, [auth.token])

    useEffect(() => {
        getSenerio(scenarii_id)
    }, [scenarii_id, getSenerio])

    const handlerOnChange = (event) => {
        setForm(event.target.value)
    }

    const onSubmit = async (event) => {
        event.preventDefault()
        // dispatch(addComment(form, auth, scenarii_id) )
        try {
            const res = await postAPI(`scenarios/${scenarii_id}/comment`, {com: form, owner: auth.user._id}, auth.token)
            dispatch(setSuccess(res.data.msg))
            let comments = scenario.comments
            comments.push({com: form, owner: auth.user._id})
            setScenario({...scenario, [comments]: comments})
        } catch(error) {
            console.log(error)
        }
        setForm('')
    }

    const handlerOnClick = async (event, index) => {
        event.preventDefault()

        try {
            const res = await deleteAPI(`scenarios/${scenarii_id}/comment/${index}`, auth.token)
            dispatch(setSuccess(res.data.msg))
            let comments = scenario.comments
            comments.splice(index, 1)
            setScenario({...scenario, [comments]: comments})
        }  catch(error) {
            console.log(error)
        }
        // dispatch(delComment(auth, scenarii_id, index))
    }

    return (<>
        <img src="/ban.png" className="img-fluid" alt="banniere du site" />
        { scenario && <>
            <section> 
                <div className="container mtb-80">
                    <h1 className="title">{ scenario.title }</h1>
                </div>
                
                <div className="container mt-30">
                    <div className="grid grid-cols-2 gap-8">
                        <div>
                            <img src={scenario.picture} alt={ scenario.title } className="img-fluid" />
                        </div>
                        <div>
                            <div className="senario_description">{ scenario.description }</div>
                            <div className="txt-center mt-30">
                                <Link to={`/scenarii/${scenario._id}/sections/0`} className="btn btn-green">Commencer le sénario</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className='mtb-80'>
                <div className="w-50 mx-auto mt-80">
                    <div className="row">
                        <div className='col'>
                            <h2 className="title">Commentaires</h2>
                        </div>
                    </div>
                    <div className="row">
                        <div className='col'>
                            { auth && <form className="form-bordered" onSubmit={onSubmit}>
                                <Alert />
                                <div className="form-group">
                                    <label htmlFor="com" className="form-label txt-green txt-large">Commentaire</label>
                                    <textarea onChange={handlerOnChange} value={form} name="commenaire" id="com" rows={5} placeholder='Rédigez votre commentaire' className="form-textarea"></textarea>
                                </div>
                                <div className="form-group">
                                    <button type='submit' className="btn btn-green w-100">Envoyer</button>
                                </div>
                            </form> }

                            {!auth && <div className='card mb-20'>
                                <div className='card-body'>
                                    <div className='mt-10 mb-20 txt-center txt-large'>Pour commencer vous devez être connecter.</div>
                                    <div className="flex flex-jc-space-around">
                                        <Link className="btn btn-green" to={`/register`}>Créer votre compte</Link>
                                        <Link className="btn btn-beige" to={`/login`}>Vous connecter</Link>
                                    </div>
                                </div>
                            </div>}
                        </div>
                    </div>
                    <div className="row">
                        <div className='col'>
                            {scenario.comments.map((comment, index) => <div className='card mb-10' key={comment._id}>
                                <div className='card-body relative'>
                                    { auth && <div className='delete' onClick={(e) => handlerOnClick(e, index)}>X</div> }
                                    {comment.com}
                                </div>
                            </div>)}
                        </div>
                    </div>
                </div>
            </section>
        </>}
    </>)
}

export default Start