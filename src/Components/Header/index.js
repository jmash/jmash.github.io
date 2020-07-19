import React from 'react';
import profilePicUrl from '../../assets/img/jaredprofile.jpg';
import headerStyles from './Header.module.css';
import faStyles from '../../assets/global-styles/fontawesome.module.css';
import { LinkContainer } from 'react-router-bootstrap';
import cx from 'classnames';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavItem from 'react-bootstrap/NavItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';

const Header = () => {
    return (
        <Navbar className={ cx(headerStyles.navBar, 'px-0')} bg="light" variant="light">
            <Navbar.Brand>
                <img className={ cx(headerStyles.profilePic, 'ml-3') } src={ profilePicUrl } alt="Jared M Ashcraft"/>
            </Navbar.Brand>
            <Navbar.Collapse>
                <NavItem>
                    <a href="https://twitter.com/jaredmashcraft">
                        <FontAwesomeIcon className={ cx('mx-2', faStyles['fa-3x']) } icon={ faTwitter } />
                    </a>
                </NavItem>
                <NavItem>
                    <a href="https://github.com/jmash">
                        <FontAwesomeIcon className={ cx('mx-2', faStyles['fa-3x']) } icon={ faGithub } />
                    </a>
                </NavItem>
                <NavItem>
                    <a href="https://www.linkedin.com/in/jared-ashcraft-2985b939/">
                        <FontAwesomeIcon className={ cx('mx-2', faStyles['fa-3x']) } icon={ faLinkedin } />
                    </a>
                </NavItem>
            </Navbar.Collapse>
            <Nav className={ cx(headerStyles['navTabs'], 'container-fluid', 'mr-3') }>
                <LinkContainer to="/about">
                    <NavItem className="ml-auto">About</NavItem>
                </LinkContainer>
                <LinkContainer to="/contact">
                    <NavItem>Contact</NavItem>
                </LinkContainer>
                <LinkContainer to="/portfolio">
                    <NavItem >Portfolio</NavItem>
                </LinkContainer>
            </Nav>
        </Navbar>
    );
};

export default Header;