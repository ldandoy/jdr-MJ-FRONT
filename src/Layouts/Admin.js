import { useEffect, useState } from 'react'
import { useSelector } from "react-redux"
import { Link } from 'react-router-dom'

import Navbar from '../components/Navbar/Navbar'

const Admin = ({ children }) => {
    const { auth } = useSelector((state) => state)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if ((!auth && !auth.user) || auth.user.role !== "admin") return
        
        setIsLoading(false)
    
    }, [auth, setIsLoading])

    return (<>
        <header>
            <Navbar />
        </header>
        <main className="mt-80 admin">
            { !isLoading && <>
                <aside className="aside-fixed">
                    <nav className='navbar navbar-h'>
                        <ul className='navbar-menu'>
                            <li className='navbar-item'>
                                <Link className='navbar-link' to="/admin/bugs">Bugs</Link>
                            </li>
                        </ul>
                    </nav>
                </aside>
                <div className='container-aside'>
                    <div className='row'>
                        <div className='col'>
                            { children }
                        </div>
                    </div>

                    <footer className="txt-center txt-size-11 ptb-50">
                        <div>Tous droits réservés &copy; 2021 <a href='https://overconsulting.net' rel="noreferrer" className="txt-white-100" target="_blank">overconsulting.net</a></div>
                    </footer>
                </div>
            </> }

            { isLoading && <>
                Chargement...
            </>}
        </main>
    </>)
}

export default Admin