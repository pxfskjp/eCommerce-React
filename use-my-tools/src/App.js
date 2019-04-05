import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { withFirebase } from "./components/Firebase";
import { FirebaseContext } from './components/Firebase';
import { Provider } from './AppContext';
import axios from 'axios';

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
  constructor(props) {
    super(props);
    this.state = {
      idToken: null
    }
  }
  
  componentDidMount() {
    this.props.firebase.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        this.props.firebase.auth.currentUser.getIdToken()
          .then(idToken => {
            console.log('idToken in App.js Firebase auth listener: ', idToken);
            // axios.defaults.headers.common['Authorization'] = idToken;
            this.setState({
              idToken
            })
          })
          .catch(error => {
            console.log(error.message);
          })
      } else {
        this.props.history.push({         
          pathname: "/"
      });
      }
    });
  }

  render() {
    const idToken = this.state.idToken;
    return (
      <div className="App">
        <Provider value={this.state}>
          {idToken ? (
            <Router>
              <Route exact path={"/"} component={LandingPage} />
            </Router>
          ) : (
            <Router>
              <Route exact path={"/"} component={LandingPage} />
              <Route path="/register" component={RegisterPage} />
              <Route path="/login" component={LoginPage} />
            </Router>   
          )}
        </Provider>
      </div>
      

    );
  }
}

const AppComponent = withFirebase(AppComponentBase);

export default App;

export {AppComponent};
