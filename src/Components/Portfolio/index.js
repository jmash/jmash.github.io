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
import TADHack2021 from './TADHack2021';

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
                <Route path={`${path}/TADHack2021`}>
                    <TADHack2021 />
                </Route>
            </Switch>
        </Router>
    );
};

export default Portfolio;