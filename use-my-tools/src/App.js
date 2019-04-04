import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import './App.css';

import AccountPage from './components/AccountPage';
import RegisterPage from './components/RegisterPage';


class App extends Component {
  render() {
    return (
      // <div className="App">
      // </div>
      <Router>
        <Route path="/accountpage" component={AccountPage} />
        <Route path="/register" component={RegisterPage} />
      </Router>

    );
  }
}

export default App;
