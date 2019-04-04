import React, { Component } from 'react';
import { withFirebase } from "./Firebase";
import { FirebaseContext } from './Firebase';
import { Link, withRouter, Route} from "react-router-dom"
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';

import "./css/RegisterPage.css";

const LoginPage = () => (
    <div>
      <FirebaseContext.Consumer>
        {firebase => <LoginForm firebase={firebase} />}
      </FirebaseContext.Consumer>
    </div>
  );

class LoginFormBase extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            error: null
        };
    }

    onSubmit = event => {
        const {email, password, firstname, lastname, image_id } = this.state;
        // const image_id = 1; 
        console.log('RegisterPage state on submit: ', this.state);
    
        this.props.firebase.createUser(email, password)
            .then(authUser => {
                console.log('authUser: ', authUser);
        
                this.props.firebase.auth.currentUser.getIdToken()
                    .then(idToken => {
                        // console.log("idToken after createUser: ", idToken);
                        const registerData = { email, firstname, lastname, image_id };

                        axios.defaults.headers.common['Authorization'] = idToken;   

                        axios.post('/api/users/register', registerData)
                            .then(registerResponse => {
                                console.log('response from POST to /register', registerResponse);
                                this.props.history.push({         // send the user to a form to sign up and directly join their company
                                    pathname: "/accountpage",
                                    state: {
                                      uid: authUser.user.uid,        // authUser returned from Firebase
                                    }
                                  });
                            })
                            .catch(error => {
                                console.log(error.message);
                            })
                    })  
                    .catch(error => {                 // if Firebase getIdToken throws an error
                        this.setState({ error:error });
                    })
            })
            .catch(error => {                    // if Firebase createUser throws an error
                this.setState({ error:error });
            });
    
        event.preventDefault();
    }

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render() {
        const { email, password, error } = this.state;

        const invalidCondition = password === '' || email === '';

        return (
            <div className="login">
                <MuiThemeProvider>
                    <div>
                        <div className="login-top-bar">
                            <Link to="/">
                                Home
                            </Link>
                        </div>
                        
                        <p className="header">Sign In</p>

                        <form onSubmit={this.onSubmit}>

                            <TextField
                                style = {{width: '65%'}}
                                hintText="Enter your Email"
                                floatingLabelText="Email"
                                name="email"
                                type="text"
                                required={true}
                                value={this.state.email}
                                onChange={this.onChange}
                            />
                            <br/>

                            <TextField
                                style = {{width: '65%'}}
                                hintText="Enter your password"
                                floatingLabelText="Password"
                                required={true}
                                name="password"
                                type="password"
                                value={this.state.password}
                                onChange={this.onChange}
                            />
                            <br/>

                            <RaisedButton
                                className="login-button"
                                label="SignIn"
                                primary={true}
                                type="submit"
                                disabled={invalidCondition}
                            />

                            {error && <p>{error.message}</p>}

                        </form>
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }
}

const LoginForm = withRouter(withFirebase(LoginFormBase));

export default LoginPage;

export {LoginForm};