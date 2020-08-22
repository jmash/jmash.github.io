import React from 'react';
import Nav from 'react-bootstrap/Nav';
import { LinkContainer } from 'react-router-bootstrap';

const PortfolioHeader = () => {
    return (
        <Nav variant="pills">
            <LinkContainer to="/portfolio/sundaymorning">
                <Nav.Item>Sunday Morning</Nav.Item>
            </LinkContainer>
            <LinkContainer to="/portfolio/vierbindungen">
                <Nav.Item>Vierbindungen</Nav.Item>
            </LinkContainer>
            <LinkContainer to="/portfolio/jsongarbagechecker">
                <Nav.Item>JSON Garbage Checker</Nav.Item>
            </LinkContainer>
        </Nav>
    );
};

export default PortfolioHeader;