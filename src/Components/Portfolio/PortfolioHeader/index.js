import React from 'react';
// import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { LinkContainer } from 'react-router-bootstrap';
import cx from 'classnames';
import portfolioHeaderStyles from './PortfolioHeader.module.css';

const PortfolioHeader = () => {
    return (
        <Navbar className={cx('nav-pills')}>
            <LinkContainer activeClassName={cx(portfolioHeaderStyles['activePortfolioNavItem'])} className={cx('px-2')} to="/portfolio/sundaymorning">
                <div className={cx(portfolioHeaderStyles['portfolioHeaderNavItem'])}>
                    <div className={cx(portfolioHeaderStyles['portfolioNavButton'])}>Sunday Morning</div>
                </div>
            </LinkContainer>
            <LinkContainer activeClassName={cx(portfolioHeaderStyles['activePortfolioNavItem'])} className={cx('px-2')} to="/portfolio/vierbindungen">
                <div className={cx(portfolioHeaderStyles['portfolioHeaderNavItem'])}>
                    <div className={cx(portfolioHeaderStyles['portfolioNavButton'])}>Vierbindungen</div>
                </div>
            </LinkContainer>
            <LinkContainer activeClassName={cx(portfolioHeaderStyles['activePortfolioNavItem'])} className={cx('px-2')} to="/portfolio/clock">
                <div className={cx(portfolioHeaderStyles['portfolioHeaderNavItem'])}>
                    <div className={cx(portfolioHeaderStyles['portfolioNavButton'])}>Clock</div>
                </div>
            </LinkContainer>
        </Navbar>
    );
};

export default PortfolioHeader;