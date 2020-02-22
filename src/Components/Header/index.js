import React from 'react';
import profilePicUrl from '../../assets/img/jaredprofile.jpg';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import Navbar from 'react-bootstrap/Navbar';

const Header = () => {
    return (
        <div>
            <Navbar>
                <img className={ styles.profilePic } src={ profilePicUrl } alt="Jared M Ashcraft"/>
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
            </Navbar>
        </div>
    );
};

export default Header;