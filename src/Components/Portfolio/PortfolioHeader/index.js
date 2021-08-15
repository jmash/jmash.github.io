import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { LinkContainer } from 'react-router-bootstrap';
import cx from 'classnames';
import portfolioHeaderStyles from './PortfolioHeader.module.css';

const PortfolioHeader = () => {
    return (
        <Navbar className={cx('nav-pills')}>
            <div>
                <LinkContainer activeClassName={cx(portfolioHeaderStyles['activePortfolioNavLink'])} className={cx('px-2', portfolioHeaderStyles['portfolioHeaderNavItem'])} to="/portfolio/sundaymorning">
                    <Nav.Item>Sunday Morning</Nav.Item>
                </LinkContainer>
            </div>
            <div>
                <LinkContainer activeClassName={cx(portfolioHeaderStyles['activePortfolioNavLink'])} className={cx('px-2', portfolioHeaderStyles['portfolioHeaderNavItem'])} to="/portfolio/vierbindungen">
                    <Nav.Item>Vierbindungen</Nav.Item>
                </LinkContainer>
            </div>
            <div>
                <LinkContainer activeClassName={cx(portfolioHeaderStyles['activePortfolioNavLink'])} className={cx('px-2', portfolioHeaderStyles['portfolioHeaderNavItem'])} to="/portfolio/clock">
                    <Nav.Item>Clock</Nav.Item>
                </LinkContainer>
            </div>
        </Navbar>
    );
};

export default PortfolioHeader;