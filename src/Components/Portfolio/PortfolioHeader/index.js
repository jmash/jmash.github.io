import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import NavItem from 'react-bootstrap/NavItem';
import { LinkContainer } from 'react-router-bootstrap';

const PortfolioHeader = () => {
    return (
        <Navbar>
            <LinkContainer to="/portfolio/sundaymorning">
                <NavItem>Sunday Morning</NavItem>
            </LinkContainer>
        </Navbar>
    );
};

export default PortfolioHeader;