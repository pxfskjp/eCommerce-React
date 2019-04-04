import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import './App.css';

import AccountPage from './components/AccountPage';


class App extends Component {
  render() {
    return (
      // <div className="App">
      // </div>
      <Router>
        <Route path="/account" component={AccountPage} />
      </Router>

    );
  }
}

export default App;
