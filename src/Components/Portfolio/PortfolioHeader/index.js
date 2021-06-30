import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';
import cx from 'classnames';
import portfolioHeaderStyles from './PortfolioHeader.module.css';

const PortfolioHeader = () => {
    return (
        <Navbar variant='pills'>
            <Container>
                <LinkContainer to="/portfolio/sundaymorning">
                    <Nav.Item>Sunday Morning</Nav.Item>
                </LinkContainer>
                <LinkContainer to="/portfolio/vierbindungen">
                    <Nav.Item>Vierbindungen</Nav.Item>
                </LinkContainer>
                <LinkContainer to="/portfolio/clock">
                    <Nav.Item>Clock</Nav.Item>
                </LinkContainer>
            </Container>
        </Navbar>
    );
};

export default PortfolioHeader;