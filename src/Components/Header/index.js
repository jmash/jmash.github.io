import React from 'react';
import profilePicUrl from '../../assets/img/jaredprofile.jpg';
import styles from './Header.module.css';
import globalStyles from '../../assets/global-styles/bootstrap.module.css';
import cx from 'classnames';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

const Header = () => {
    return (
        <div>
            <Navbar bg="light" variant="light">
                <Navbar.Brand>
                    <img className={ styles.profilePic } src={ profilePicUrl } alt="Jared M Ashcraft"/>
                </Navbar.Brand>
                <Nav className={cx(styles.navTabs, globalStyles['container-fluid']) }>
                    <LinkContainer to="/">
                        <Nav.Item className="ml-auto">Home</Nav.Item>
                    </LinkContainer>
                    <LinkContainer to="/contact">
                        <Nav.Item>Contact</Nav.Item>
                    </LinkContainer>
                    <LinkContainer to="/portfolio">
                        <Nav.Item >Portfolio</Nav.Item>
                    </LinkContainer>
                </Nav>
            </Navbar>
        </div>
    );
};

export default Header;