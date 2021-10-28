import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import Navbar from '../components/Navbar/Navbar'
import "../styles/Default.module.css"

const Default = ({ children, isPrivate = false }) => {
    const history = useHistory()

    useEffect(() => {
        if (isPrivate) {
            const logged = localStorage.getItem('logged')
            if (logged !== 'true') {
                history.push('/login')
            }
        }
    }, [isPrivate, history])

    return (<>
        <header>
            <Navbar />
        </header>
        <main>
            { children }
        </main>
        <footer className="txt-center mt-50 txt-size-11 ptb-50 bg-gray-200">
            <div>Tous droits réservés &copy; 2021 <a href='https://overconsulting.net' rel="noreferrer" className="txt-green" target="_blank">overconsulting.net</a></div>
            <div>Image de <a href='https://www.aidedd.org/' rel="noreferrer" className="txt-green" target="_blank">aidedd</a></div>
        </footer>
    </>)
}

export default Default