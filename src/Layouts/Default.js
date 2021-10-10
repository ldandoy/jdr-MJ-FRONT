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
        <footer className="txt-center mt-50 txt-size-11 ptb-50 txt-white-100 bg-white-1000">
            Tous droits réservés &copy; 2021 overconsulting.net
        </footer>
    </>)
}

export default Default