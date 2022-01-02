import { useLocation, Link } from "react-router-dom"
import { useSelector } from "react-redux"

const Navbar =  () => {
    const { pathname } = useLocation()
    const { auth } = useSelector(state => state)

    const isActive = (pn) => {
        if (pn === pathname) return 'active'
    }

    return (
        <nav className="navbar navbar-v navbar-bordered-b navbar-dark navbar-fixed-top bg-green">
            <div className="navbar-title">
                <div>
                    <a className="navbar-link" href="/">
                        <img src="/mjv-blanc-transparent.png" width={40} alt="logo" />
                    </a>
                    <a id="home" href="/" className="navbar-link">MJ Virtuel</a>
                </div>
                <i className="navbar-menu-icon">&#9776;</i>
            </div>

            <div className="navbar-content-menu">
                <ul className="navbar-menu-left">
                    <li className="navbar-item"><Link to="/scenarii" className="navbar-link">Scénarii</Link></li>
                </ul>
                <ul className="navbar-menu-right">
                    {
                        !auth.user && <>
                            <li className="navbar-item"><Link to="/login" className="navbar-link">Login</Link></li>
                            <li className="navbar-item"><Link to="/register" className="navbar-link">Register</Link></li>
                        </>
                    }
                    {
                        auth.user && <>
                            <li className="navbar-item dropdown">
                                <Link className="navbar-link" to="#">{auth.user.name}</Link>
                                <ul className="navbar-ss-menu bg-green">
                                    <li className="navbar-item">
                                        <Link to="/my-account" className={ `navbar-link ${isActive('/my-account')}` }>Mon compte</Link>
                                    </li>
                                    <li className="navbar-item">
                                        <Link to="/account/scenarii" className={ `navbar-link ${isActive('/account/scenarii')}` }>Vos scénarii</Link>
                                    </li>
                                    <li className="navbar-item">
                                        <Link to="/logout" className="navbar-link txt-red-800">Logout</Link>
                                    </li>
                                </ul>
                            </li>
                        </>
                    }
                </ul>
            </div>
        </nav>
    )
}

export default Navbar