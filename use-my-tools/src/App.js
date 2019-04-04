import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { withFirebase } from "./components/Firebase";

import './App.css';

import AccountPage from './components/AccountPage';
import RegisterPage from './components/RegisterPage';
import LoginPage from './components/LoginPage';


class App extends Component {
  render() {
    return (
      // <div className="App">
      // </div>
      <Router>
        <Route path="/accountpage" component={AccountPage} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/login" component={LoginPage} />
      </Router>

    );
  }
}

export default withFirebase(App);
