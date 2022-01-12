import React from 'react'
import { useSelector } from 'react-redux'

const Alert = () => {
    const { alert } = useSelector(state => state)

    return (<>
        { alert.error && <div className="alert alert-error">{alert.error}</div> }
        { alert.success && <div className="alert alert-success">{alert.success}</div> }
    </>)
}

export default Alert