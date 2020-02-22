import React from 'react';
import Home from './Components/Home';
import {
  BrowserRouter as Router,
} from 'react-router-dom';
import './App.css';

function App() {
  return (
    <Router>
      <Home />
    </Router>
  );
}

export default App;
