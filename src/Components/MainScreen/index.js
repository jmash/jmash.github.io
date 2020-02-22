import React from 'react';
import Contact from '../Contact';
import Portfolio from '../Portfolio';
import { 
    Switch, 
    Route 
} from 'react-router-dom';

const MainScreen = () => {
    return (
        <div>
            <Switch>
                <Route path="/contact">
                    <Contact />
                </Route>
                <Route path="/portfolio">
                    <Portfolio />
                </Route>
            </Switch>
        </div>
    );
};

export default MainScreen;