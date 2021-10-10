import { useLocation, Link } from "react-router-dom"
import { useSelector } from "react-redux"

const Navbar =  () => {
    const { pathname } = useLocation()
    const { auth } = useSelector(state => state)

    const isActive = (pn) => {
        if (pn === pathname) return 'active'
    }

    return (
        <nav className="navbar navbar-v navbar-bordered-b sticky-top bg-light">
            <div className="navbar-title">
                <a id="home" href="/" className="navbar-link">MJ Virtuel</a>
                <i className="navbar-menu-icon">&#9776;</i>
            </div>

            <div className="navbar-content-menu">
                <ul className="navbar-menu-left">
                    <li className="navbar-item"><Link to="/senarii" className="navbar-link">Sénarii</Link></li>
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
                                <Link className="navbar-link" to="/my-account">{auth.user.name}</Link>
                                <ul className="navbar-ss-menu bg-white-100">
                                    <li className="navbar-item">
                                        <Link to="/my-account" className={ `navbar-link ${isActive('/my-account')}` }>{auth.user.name}</Link>
                                    </li>
                                    <li className="navbar-item">
                                        <Link to="/account/senarii" className={ `navbar-link ${isActive('/account/senarii')}` }>Vos sénarii</Link>
                                    </li>
                                    <li className="navbar-item">
                                        <Link to="/logout" className="navbar-link">Logout</Link>
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