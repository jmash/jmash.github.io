import React from 'react';
import SundayMorning from './SundayMorning';
import Vierbindungen from './Vierbindungen';
import PortfolioHeader from './PortfolioHeader';
import Clock from './Clock';
import { 
    BrowserRouter as Router,
    Switch,
    Route,
    useRouteMatch
} from 'react-router-dom';

const Portfolio = () => {
    let { path } = useRouteMatch();
    return (
        <Router>
            <PortfolioHeader />
            <Switch>
                <Route path={`${path}/sundaymorning`}>
                    <SundayMorning />
                </Route>
                <Route path={`${path}/vierbindungen`}>
                    <Vierbindungen />
                </Route>
                <Route path={`${path}/clock`}>
                    <Clock />
                </Route>
            </Switch>
        </Router>
    );
};

export default Portfolio;