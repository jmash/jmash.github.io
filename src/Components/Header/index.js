import React from 'react';
import profilePicUrl from '../../assets/img/jaredprofile.jpg';
import styles from './Header.module.css';
import bsStyles from '../../assets/global-styles/bootstrap.module.css';
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
        <div>
            <Navbar bg="light" variant="light">
                <Navbar.Brand>
                    <img className={ styles.profilePic } src={ profilePicUrl } alt="Jared M Ashcraft"/>
                </Navbar.Brand>
                <Navbar.Collapse>
                    <NavItem>
                        <a href="https://twitter.com/jaredmashcraft">
                            <FontAwesomeIcon className={ cx(bsStyles['mx-2'], faStyles['fa-3x']) } icon={ faTwitter } />
                        </a>
                    </NavItem>
                    <NavItem>
                        <a href="https://twitter.com/jaredmashcraft">
                            <FontAwesomeIcon className={ cx(bsStyles['mx-2'], faStyles['fa-3x']) } icon={ faGithub } />
                        </a>
                    </NavItem>
                    <NavItem>
                        <a href="https://twitter.com/jaredmashcraft">
                            <FontAwesomeIcon className={ cx(bsStyles['mx-2'], faStyles['fa-3x']) } icon={ faLinkedin } />
                        </a>
                    </NavItem>
                </Navbar.Collapse>
                <Nav className={ cx(styles.navTabs, bsStyles['container-fluid']) }>
                    <LinkContainer to="/">
                        <NavItem className="ml-auto">Home</NavItem>
                    </LinkContainer>
                    <LinkContainer to="/contact">
                        <NavItem>Contact</NavItem>
                    </LinkContainer>
                    <LinkContainer to="/portfolio">
                        <NavItem >Portfolio</NavItem>
                    </LinkContainer>
                </Nav>
            </Navbar>
        </div>
    );
};

export default Header;