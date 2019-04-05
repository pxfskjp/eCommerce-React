import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { withFirebase } from "./components/Firebase";
import { FirebaseContext } from './components/Firebase';

import './App.css';

import LandingPage from './components/LandingPage';
import AccountPage from './components/AccountPage';
import RegisterPage from './components/RegisterPage';
import LoginPage from './components/LoginPage';


const App = () => (
  <div>
    <FirebaseContext.Consumer>
      {firebase => <AppComponent firebase={firebase} />}
    </FirebaseContext.Consumer>
  </div>
);

class AppComponentBase extends Component {

  // componentDidMount() {

  // }

  render() {
    return (
      // <div className="App">
      // </div>
      <Router>
        <Route exact path={"/"} component={LandingPage} />
        <Route path="/accountpage" component={AccountPage} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/login" component={LoginPage} />
      </Router>

    );
  }
}

const AppComponent = withFirebase(AppComponentBase);

export default App;

export {AppComponent};
