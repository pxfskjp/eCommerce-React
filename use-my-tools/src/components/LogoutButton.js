import React, { Component } from 'react';
import { withFirebase } from "./Firebase";
import { FirebaseContext } from './Firebase';
import { Link, withRouter } from "react-router-dom"
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import RaisedButton from 'material-ui/RaisedButton';
// import TextField from 'material-ui/TextField';
// import Typography from '@material-ui/core/Typography';
// import axios from 'axios';

import "./css/Logout.css";

const Logout = () => (
    <div>
      <FirebaseContext.Consumer>
        {firebase => <LogoutButton firebase={firebase} />}
      </FirebaseContext.Consumer>
    </div>
);

class LogoutButtonBase extends Component {

    logOut = event => {
        this.props.firebase.logOut();
    }

    render() {
        return (
            <Link to="/" className="log-out-link">
                {/* <div className="log-out-button" type="button" onClick={this.logOut}> */}
                    Sign Out
                {/* </div> */}
            </Link>
        );
    }
}

const LogoutButton= withRouter(withFirebase(LogoutButtonBase));

export default Logout;

export {LogoutButton};