import React, { Component } from 'react';
import MainScreen from '../MainScreen';
import Header from '../Header';

class Home extends Component {
    render() {
        return (
            <div>
                <Header />
                <MainScreen />
            </div>
        );
    }
}

export default Home;