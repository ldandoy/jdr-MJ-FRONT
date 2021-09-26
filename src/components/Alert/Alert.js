import React from 'react'
import { useSelector } from 'react-redux'

const Alert = () => {
    const { alert } = useSelector(state => state)

    return (<>
        { alert.errors && <div className="alert alert-error">{alert.errors}</div> }
        { alert.success && <div className="alert alert-success">{alert.success}</div> }
    </>)
}

export default Alert