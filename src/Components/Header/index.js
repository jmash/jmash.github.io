import React from 'react';
import profilePicUrl from '../../assets/img/jaredprofile.jpg';
import styles from './Header.module.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavItem from 'react-bootstrap/NavItem';
import { LinkContainer } from 'react-router-bootstrap';

const Header = () => {
    return (
        <div>
            <Navbar>
                <Navbar.Brand>
                    <img className={ styles.profilePic } src={ profilePicUrl } alt="Jared M Ashcraft"/>
                </Navbar.Brand>
                <Nav className={ styles.navTabs }>
                    <LinkContainer to="/">
                        <NavItem>Home</NavItem>
                    </LinkContainer>
                    <LinkContainer to="/contact">
                        <NavItem>Contact</NavItem>
                    </LinkContainer>
                    <LinkContainer to="/portfolio">
                        <NavItem>Portfolio</NavItem>
                    </LinkContainer>
                </Nav>
            </Navbar>
        </div>
    );
};

export default Header;