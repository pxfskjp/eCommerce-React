import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { withFirebase } from "./components/Firebase";
import { FirebaseContext } from './components/Firebase';
// import { Provider, Consumer } from './AppContext';
import axios from 'axios';

import './App.css';

import LandingPage from './components/LandingPage';
import RegisterPage from './components/RegisterPage';
import LoginPage from './components/LoginPage';

import NavigationBar from './components/NavigationBar';

import AccountPage from './components/AccountPage';

// import Billing from './components/Billing/Billing';
import ConfirmRental from './components/Renter/ConfirmRental';

import OwnerDashboard from './components/Owner/OwnerDashboard';
import RenterDashboard from './components/Renter/RenterDashboard';
import RentalView from './components/Rentals/RentalView';
// import MyTools from './components/Owner/MyTools';
import AddTool from './components/Owner/AddTool';
import FindTools from './components/Renter/FindTools';
import ToolViewRenter from './components/Renter/ToolViewRenter';
import ToolViewOwner from './components/Owner/ToolViewOwner';
import ChatDashboard from './components/Chat/ChatDashboard';

import DateRangePickerWrapper from './components/ReactDates/DateRangePicker';

import UpdatePassword from './components/UpdatePassword';


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
            // console.log('idToken in App.js Firebase auth listener: ', idToken);
            axios.defaults.headers.common['Authorization'] = idToken;
            this.setState({
              idToken
            })
          })
          .catch(error => {
            console.log(error.message);
          })
      } else {
        this.setState({
          idToken: null
        })
        // .then(() => {
        //   this.props.history.push({         
        //     pathname: "/accountpage"
        //   });
        // })
      }
    });
  }

  render() {
    const idToken = this.state.idToken;
    return (
      <Router>
      <div className="App">
        <div>
          {idToken ? (
            <div>
              <NavigationBar />
              <Route exact path={"/"} component={AccountPage} />
              <Route path="/register" component={AccountPage} />
              <Route path="/login" component={AccountPage} />

              <Route path={"/accountpage"} component={AccountPage} />

              <Route path={"/confirmrental/:rentalId"} component={ConfirmRental} />

              <Route path={"/ownerdashboard"} component={OwnerDashboard} />
              <Route path={"/renterdashboard"} component={RenterDashboard} />

              <Route path={"/rentalview/:rentalId/:userType"} component={RentalView} />

              <Route path={"/addtool"} component={AddTool} />
              <Route path={"/updatepassword"} component={UpdatePassword} />
              <Route path={"/findtools"} component={FindTools} />
              <Route path={"/toolviewrenter/:id"} component={ToolViewRenter} />
              <Route path={"/toolviewowner/:id"} component={ToolViewOwner} />
              <Route path={"/dates"} component={DateRangePickerWrapper} />
              <Route path={"/chat"} component={ChatDashboard} />
            </div>
          ) : (
            <div>
              <Route exact path={"/"} component={LandingPage} />
              <Route path="/register" component={RegisterPage} />
              <Route path="/login" component={LoginPage} />

              <Route path={"/accountpage"} component={LandingPage} />
              <Route path={"/yourtools"} component={LandingPage} />
              <Route path={"/addtool"} component={LandingPage} />
              <Route path={"/updatepassword"} component={LandingPage} />
              <Route path={"/findtools"} component={LandingPage} />
              <Route path={"/toolviewrenter/:id"} component={LandingPage} />
              <Route path={"/toolviewowner/:id"} component={LandingPage} />
              <Route path={"/dates"} component={LandingPage} />
            </div>
          )}
        </div>
      </div>
      </Router>

    );
  }
}

const AppComponent = withFirebase(AppComponentBase);

export default App;

export {AppComponent};
