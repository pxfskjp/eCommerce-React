import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { withFirebase } from "./components/Firebase";
import { FirebaseContext } from './components/Firebase';
import { Provider, Consumer } from './AppContext';
import axios from 'axios';

import './App.css';

import LandingPage from './components/LandingPage';
import RegisterPage from './components/RegisterPage';
import LoginPage from './components/LoginPage';
import NavigationBar from './components/NavigationBar';
import AccountPage from './components/AccountPage';
import ToolsOwned from './components/tools/ToolsOwned';
import AddTool from './components/tools/AddTool';



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
            axios.defaults.headers.common['Authorization'] = idToken;
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
        <div>
          {idToken ? (
            <Router>
              <NavigationBar />
              {/* <Route exact path={"/"} component={LandingPage} />
              <Route path="/register" component={RegisterPage} />
              <Route path="/login" component={LoginPage} /> */}
              <Route path={"/accountpage"} component={AccountPage} />
              <Route path={"/yourtools"} component={ToolsOwned} />
              <Route path={"/addtool"} component={AddTool} />
              {/* <Route path="/addtool" render={() => <AddTool idToken={idToken}/>} /> */}

            </Router>
          ) : (
            <Router>
              <Route exact path={"/"} component={LandingPage} />
              <Route path="/register" component={RegisterPage} />
              <Route path="/login" component={LoginPage} />
            </Router>   
          )}
        </div>
      </div>
      

    );
  }
}

const AppComponent = withFirebase(AppComponentBase);

export default App;

export {AppComponent};
