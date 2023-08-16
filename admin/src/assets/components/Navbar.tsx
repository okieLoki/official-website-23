import { useState } from "react";
import {FaTimes, FaBars} from 'react-icons/fa'
import '../styles/Navbar.css'
import GDSCLogo from '../../images/gdsc-logo.png'

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

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
                        <a href="/team/add" className="nav-links">
                            Add Team
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="/team/view" className="nav-links">
                            View Team
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="/event/add" className="nav-links">
                            Add Event
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="/event/view" className="nav-links">
                            View Event
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    );
};


export default Navbar