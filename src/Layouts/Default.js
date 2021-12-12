import { useEffect, useState } from 'react'
import { useSelector } from "react-redux"
import { useHistory } from 'react-router-dom'

import Navbar from '../components/Navbar/Navbar'
import "../styles/Default.module.css"

const Default = ({ children, isPrivate = false }) => {
    const { auth } = useSelector((state) => state)
    const history = useHistory()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (isPrivate) {
            if (!auth) return

            const logged = localStorage.getItem('logged')
            if (logged !== 'true') {
                history.push('/login')
            } else {
                setIsLoading(false)
            }
        } else {
            setIsLoading(false)
        }
    }, [isPrivate, history, auth, isLoading])

    return (<>
        <header>
            <Navbar />
        </header>
        <main className="mt-50">
            { !isLoading && <>
                { children }
            </> }

            { isLoading && <>
                Chargement...
            </>}
        </main>
        <footer className="txt-center mt-50 txt-size-11 ptb-50 bg-green txt-white-100">
            <div>Tous droits réservés &copy; 2021 <a href='https://overconsulting.net' rel="noreferrer" className="txt-white-100" target="_blank">overconsulting.net</a></div>
            <div>Image de <a href='https://www.aidedd.org/' rel="noreferrer" className="txt-white-100" target="_blank">aidedd</a></div>
        </footer>
    </>)
}

export default Default