import React from 'react';
import profilePicUrl from '../../assets/img/jaredprofile.jpg';
import headerStyles from './Header.module.css';
import faStyles from '../../assets/global-styles/fontawesome.module.css';
import { LinkContainer } from 'react-router-bootstrap';
import cx from 'classnames';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';

const Header = () => {
    return (
        <Navbar bg="light" expand="sm">
            <Navbar.Brand className={ cx('d-block', 'mx-md-0') } href="#home">
                <img className={ cx(headerStyles.profilePic, 'ml-3') } src={ profilePicUrl } alt="Jared M Ashcraft"/>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className={cx('mr-auto ml-2')}>
                    <Nav.Link className={cx('text-center')}>
                        <LinkContainer to="/about">
                            <span>About</span>
                        </LinkContainer>
                    </Nav.Link>
                    <Nav.Link className={cx('text-center')}>
                        <LinkContainer to="/contact">
                            <span>Contact</span>
                        </LinkContainer>      
                    </Nav.Link>
                    <Nav.Link className={cx('text-center')}>
                        <LinkContainer to="/portfolio/sundaymorning">
                            <span>Portfolio</span>
                        </LinkContainer>  
                    </Nav.Link>
                </Nav>
                <Nav className={cx('ml-auto', 'px-md-4', 'flex-row', 'justify-content-center')}>
                    <Nav.Link title="Link to Jared Ashcraft's Twitter Feed" href="https://twitter.com/jaredmashcraft">
                            <FontAwesomeIcon className={ cx('mx-2', faStyles['fa-2x']) } icon={ faTwitter } />
                    </Nav.Link>
                    <Nav.Link title="Link to Jared Ashcraft's GitHub Repository" href="https://github.com/jmash">
                            <FontAwesomeIcon className={ cx('mx-2', faStyles['fa-2x']) } icon={ faGithub } />      
                    </Nav.Link>
                    <Nav.Link title="Link to Jared Ashcraft's LinkedIn Profile" href="https://www.linkedin.com/in/jared-ashcraft-2985b939/">
                            <FontAwesomeIcon className={ cx('mx-2', faStyles['fa-2x']) } icon={ faLinkedin } />
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default Header;