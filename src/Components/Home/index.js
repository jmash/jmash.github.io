import React, { Component } from 'react';
import NavBar from '../NavBar';
import MainScreen from '../MainScreen';

class Home extends Component {
    render() {
        return (
            <div>
                <NavBar />
                <MainScreen />
            </div>
        );
    }
}

export default Home;