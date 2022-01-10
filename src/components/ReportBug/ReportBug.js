import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { postAPI } from "../../services/FetchData"
import { setSuccess } from "../../redux/slices/alertSlice"
import Alert from '../Alert/Alert'

const ReportBug = () => {
    const dispatch = useDispatch()
    const { user, token } = useSelector((state) => state.auth)
    
    const [report, setReport] = useState("")

    const handlerOnChange = (event) => {
        const {value} = event.target
        setReport(value)
    }

    const handlerOnSubmit = async (event) => {
        event.preventDefault()

        try {
            const res = await postAPI(`bug`, {
                email: user.email,
                name: user.name,
                report
            }, token)

            setReport("")
            dispatch(setSuccess(res.data.msg))
        } catch (error) {
            
        }
    }
    
    return (
        <section className="ptb-80 mt-80 bg-gray-100">
            <div className="container">
                <h1 className="title">Vous avez trouver un bug !</h1>
                <div className="pb-30">
                    <form className='form-bordered w-50 mx-auto' onSubmit={handlerOnSubmit}>
                        <Alert />
                        
                        <div className="form-group">
                            <label htmlFor="report" className="form-label">Description du bug</label>
                            <textarea id="report" name="report" onChange={handlerOnChange} rows={5} className="form-textarea" required={true} value={report}></textarea>
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
