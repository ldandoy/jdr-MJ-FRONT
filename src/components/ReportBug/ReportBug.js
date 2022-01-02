import React, { useState } from 'react'
import { createBug } from '../../redux/actions/bugActions'
import { useDispatch, useSelector } from 'react-redux'
import Alert from '../Alert/Alert'

const ReportBug = () => {
    const dispatch = useDispatch()
    const { auth } = useSelector((state) => state)

    const [bug, setBug] = useState({
        email:      auth.user.account,
        fullname:   auth.user.name,
        report:     ""
    })

    const handlerOnChange = (event) => {
        const {name, value} = event.target
        setBug({...bug, [name]:value})
    }

    const handlerOnSubmit = (event) => {
        event.preventDefault()

        dispatch(createBug(auth, bug))

        setBug({
            email:      auth.user.account,
            fullname:   auth.user.name,
            report:     ""
        })
    }
    
    return (
        <section className="ptb-80 mt-80 bg-gray-100">
            <div className="container">
                <h1 className="title">Vous avez trouver un bug !</h1>
                <div className="pb-30">
                    <form className='form-bordered w-50 mx-auto' onSubmit={handlerOnSubmit}>
                        <Alert />
                        <div className="form-group">
                            <label htmlFor="email" className="form-label">Votre Email</label>
                            <input type="email" disabled={true} name="email" onChange={handlerOnChange} id="email" required={true} value={bug.email} className="form-input" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="fullname" className="form-label">Votre prénom et votre nom</label>
                            <input type="text" disabled={true} name="fullname" onChange={handlerOnChange} id="fullname" required={true} value={bug.fullname} className="form-input" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="report" className="form-label">Description du bug</label>
                            <textarea id="report" name="report" onChange={handlerOnChange} rows={5} className="form-textarea" required={true} value={bug.report}></textarea>
                        </div>

                        <div className="form-group">
                            <button className="btn btn-green w-100" type='submit'>Envoyer votre rapport de bug</button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default ReportBug
