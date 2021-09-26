import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Toast = () => {
    const dispath = useDispatch()
    const { toast } = useSelector(state => state)

    const onClickHandler = () => {
        dispath({ type: "TOAST_ADD", payload: {}})
    }

    return (
        <div className="toast-container toast-bottom-right" onClick={onClickHandler}>
            { toast.errors && typeof toast.errors !== 'string' &&
                toast.errors.map((toast, index) => (
                    <div key={index} className="toast toast-error">
                        <div className="toast-body">
                            {toast}
                        </div>
                    </div>
                ))
            }
            { toast.errors && typeof toast.errors === 'string' &&
                <div className="toast toast-error">
                    <div className="toast-body">
                        {toast.errors}
                    </div>
                </div>
            }
            { toast.success &&
                <div className="toast toast-success">
                    <div className="toast-body">
                        {toast.success}
                    </div>
                </div>
            }
        </div>
    )
}

export default Toast
