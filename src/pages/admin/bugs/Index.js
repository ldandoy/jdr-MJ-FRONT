import React, {useEffect, useCallback, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { getAPI } from "../../../services/FetchData"
import "../../../styles/admin.css"

const Index = () => {
    const { auth } = useSelector((state) => state)
    const [bugs, setBugs] = useState(null)

    const getBugs = useCallback(async () => {
        const res = await getAPI('admin/bugs', auth.token)
        console.log(res.data)
        setBugs(res.data)
    }, [auth])

    useEffect(() => {
        getBugs()
    }, [getBugs])

    return (<>
        <section>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col'>
                        <h1 className="title">Bugs Index</h1>
                    </div>
                </div>
            </div>
        </section>

        <section>
            <div className='container-fluid mt-20'>
                <div className='row'>
                    <div className='col'>
                        <table>
                            <thead>
                                <tr>
                                    <th>User</th>
                                    <th>Report</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bugs && bugs.map(bug => <tr>
                                    <td>
                                        {bug.fullname}
                                    </td>
                                    <td>
                                        {bug.report}
                                    </td>
                                    <td></td>
                                </tr>)}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    </>)
}

export default Index
