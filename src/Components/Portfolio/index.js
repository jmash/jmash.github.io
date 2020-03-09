import React from 'react';
import SundayMorning from './SundayMorning';
import { 
    Switch,
    Route 
} from 'react-router-dom';

const Portfolio = () => {
    return (
        <div>
            <Switch>
                <Route to="/portfolio/sundaymorning">
                    <SundayMorning />
                </Route>
            </Switch>
        </div>
    );
};

export default Portfolio;