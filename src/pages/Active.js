import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import Alert from '../components/Alert/Alert'
import { postAPI } from '../services/FetchData'

const Active = () => {
    const { slug } = useParams()
    const dispatch = useDispatch()
    const [activated, setActivated] = useState(false)

    useEffect(() => {
        if (slug) {
            postAPI('active', {active_token: slug})
            .then(res => {
                dispatch({
                    type: "ALERT",
                    payload: { success: res.data.msg}
                })
                setActivated(true)
            })
            .catch(error => {
                dispatch({
                    type: "ALERT",
                    payload: { errors: error.response.data.msg}
                })
            })
        }
    }, [slug, dispatch, setActivated])

    return (<>
        <div className="card-title txt-center txt-gray-900">
            <h1>Activation de votre compte</h1>
        </div>
        <div className="card-body">
            <Alert />
            { activated && <p className="txt-center mt-15"><Link to='/login' className="txt-gray-800">Vous connectez à votre compte</Link></p> }
            { !activated && <p className="txt-center  mt-15"><Link to='/register' className="txt-gray-800">Recréer votre compte</Link></p> }
        </div>
    </>)
}

export default Active
