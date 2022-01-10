import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { useGetBugsQuery } from '../../../redux/reducers/BugReducer'
import "../../../styles/admin.css"

const Index = () => {
    const { auth } = useSelector((state) => state)
    const { data, isFetching} = useGetBugsQuery()

    console.log(data)

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
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col'>
                        {isFetching && <>Loading ...</>}
                    </div>
                </div>
            </div>
        </section>
    </>)
}

export default Index
