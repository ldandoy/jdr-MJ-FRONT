import { useEffect, useState } from 'react'
import { useSelector } from "react-redux"

import Navbar from '../components/Navbar/Navbar'
import ReportBug from '../components/ReportBug/ReportBug'

const Default = ({ children, isPrivate = false }) => {
    const { auth } = useSelector((state) => state)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (isPrivate) {
            if (!auth) return
            setIsLoading(false)
        } else {
            setIsLoading(false)

        }
    
    }, [isPrivate, auth, setIsLoading])

    return (<>
        <header>
            <Navbar />
        </header>
        <main className="mt-70 front">
            { !isLoading && <>
                { children }
                { auth && <ReportBug /> }
            </> }

            { isLoading && <>
                Chargement...
            </>}
        </main>
        <footer className="txt-center txt-size-11 ptb-50 bg-green txt-white-100">
            <div>Tous droits réservés &copy; 2021 <a href='https://overconsulting.net' rel="noreferrer" className="txt-white-100" target="_blank">overconsulting.net</a></div>
            <div>Image de <a href='https://www.aidedd.org/' rel="noreferrer" className="txt-white-100" target="_blank">aidedd</a></div>
        </footer>
    </>)
}

export default Default