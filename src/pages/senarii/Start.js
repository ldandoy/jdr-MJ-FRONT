import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { useParams, Link } from 'react-router-dom'

import { getSenerio, addComment, delComment } from '../../redux/actions/senarriActions'

const Start = () => {
    const { auth, senario } = useSelector((state) => state)
    const dispatch = useDispatch()
    const { scenarii_id } = useParams()
    const [form, setForm] = useState('')

    useEffect(() => {
        dispatch(getSenerio(auth, scenarii_id))
    }, [dispatch, auth, scenarii_id])

    const handlerOnChange = (event) => {
        setForm(event.target.value)
    }

    const onSubmit = async (event) => {
        event.preventDefault()
        dispatch(addComment(form, auth, scenarii_id) )
        setForm('')
    }

    const handlerOnClick = async (event, index) => {
        event.preventDefault()

        dispatch(delComment(auth, scenarii_id, index))
    }

    return (<>
        <img src="/ban.png" className="img-fluid" alt="banniere du site" />
        { senario && <>
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
                            <div className="txt-center mt-30">
                                <Link to={`/scenarii/${senario._id}/sections/0`} className="btn btn-green">Commencer le sénario</Link>
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
                            {senario.comments.map((comment, index) => <div className='card mb-10' key={comment._id}>
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