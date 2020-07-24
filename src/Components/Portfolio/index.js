import React from 'react';
import SundayMorning from './SundayMorning';
import Vierbindungen from './Vierbindungen';
import PortfolioHeader from './PortfolioHeader';
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
            </Switch>
        </Router>
    );
};

export default Portfolio;