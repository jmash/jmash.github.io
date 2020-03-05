import React from 'react';
import About from '../About';
import Contact from '../Contact';
import Portfolio from '../Portfolio';
import { 
    Switch,
    Redirect,
    Route 
} from 'react-router-dom';

const MainScreen = () => {
    return (
        <div>
            <Switch>
                <Route exact path="/">
                    <Redirect to="/portfolio" />
                </Route>
                <Route path="/about">
                    <About />
                </Route>
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