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
            <Navbar.Brand className={ cx('d-block', 'mx-auto', 'mx-md-0') } href="#home">
                <img className={ cx(headerStyles.profilePic, 'ml-3') } src={ profilePicUrl } alt="Jared M Ashcraft"/>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className={cx('mx-auto', 'px-md-4', 'flex-row')}>
                    <Nav.Link href="https://twitter.com/jaredmashcraft">
                            <FontAwesomeIcon className={ cx('mx-2', faStyles['fa-2x']) } icon={ faTwitter } />
                    </Nav.Link>
                    <Nav.Link href="https://github.com/jmash">
                            <FontAwesomeIcon className={ cx('mx-2', faStyles['fa-2x']) } icon={ faGithub } />      
                    </Nav.Link>
                    <Nav.Link href="https://www.linkedin.com/in/jared-ashcraft-2985b939/">
                            <FontAwesomeIcon className={ cx('mx-2', faStyles['fa-2x']) } icon={ faLinkedin } />
                    </Nav.Link>
                </Nav>
                <Nav className={cx('ml-auto')}>
                    <Nav.Link>
                        <LinkContainer to="/about">
                            <span>About</span>
                        </LinkContainer>
                    </Nav.Link>
                    <Nav.Link>
                        <LinkContainer to="/contact">
                            <span>Contact</span>
                        </LinkContainer>      
                    </Nav.Link>
                    <Nav.Link>
                        <LinkContainer to="/portfolio">
                            <span>Portfolio</span>
                        </LinkContainer>  
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
            </Navbar>
    );
};

export default Header;

/*
<Navbar className={ cx(headerStyles.navBar, 'px-0')} bg="light" variant="light">
            <Container fluid>
            <Navbar.Brand>
                <img className={ cx(headerStyles.profilePic, 'ml-3') } src={ profilePicUrl } alt="Jared M Ashcraft"/>
            </Navbar.Brand>
            <Nav>
                <Nav.Link href="https://twitter.com/jaredmashcraft">
                        <FontAwesomeIcon className={ cx('mx-2', faStyles['fa-3x']) } icon={ faTwitter } />
                </Nav.Link>
                <Nav.Link href="https://github.com/jmash">
                        <FontAwesomeIcon className={ cx('mx-2', faStyles['fa-3x']) } icon={ faGithub } />      
                </Nav.Link>
                <Nav.Link href="https://www.linkedin.com/in/jared-ashcraft-2985b939/">
                        <FontAwesomeIcon className={ cx('mx-2', faStyles['fa-3x']) } icon={ faLinkedin } />
                </Nav.Link>
            </Nav>
            <Nav className={ cx(headerStyles['navTabs'], 'mr-3') }>
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
            </Container>
        </Navbar>
*/