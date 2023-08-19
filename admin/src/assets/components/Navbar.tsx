import { useState } from "react";
import {FaTimes, FaBars} from 'react-icons/fa'
import '../styles/Navbar.css'
import GDSCLogo from '../../images/gdsc-logo.png'

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const logout = () => {
        localStorage.removeItem('isLoggedIn');
        window.location.reload();
    }

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <a href="/" className="navbar-logo">
                    <img src={GDSCLogo} alt=""  style={{width: '5rem'}}/>
                </a>
                <div className="menu-icon" onClick={toggleMenu}>
                    {isMenuOpen ? <FaTimes /> : <FaBars />}
                </div>
                <ul className={isMenuOpen ? 'nav-menu active' : 'nav-menu'}>
                    <li className="nav-item">
                        <a href="/team/view" className="nav-links">
                            Team
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="/event/view" className="nav-links">
                            Event
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="/project/view" className="nav-links">
                            Project
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="/" className="nav-links" onClick={logout}>
                            Logout
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    );
};


export default Navbar