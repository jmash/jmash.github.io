import React from 'react';
import profilePicUrl from '../../assets/img/jaredprofile.jpg';
import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <div>
            <img src={ profilePicUrl } />
            <div>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/contact">Contact</Link>
                    </li>
                    <li>
                        <Link to="/portfolio">Portfolio</Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default NavBar;