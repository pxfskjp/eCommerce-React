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

const RegisterPage = () => (
    <div>
      <FirebaseContext.Consumer>
        {firebase => <RegisterForm firebase={firebase} />}
      </FirebaseContext.Consumer>
    </div>
  );

class RegisterFormBase extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            password1: "",
            firstName: "",
            lastName: "",
            error: null
        };
    }

    onSubmit = event => {
        const {email, password, firstName, lastName } = this.state;
        const image_id = 1; 
    
        this.props.firebase
          .createUser(email, password)
          .then(authUser => {
            console.log('authUser: ', authUser);
    
            this.props.firebase.auth.currentUser.getIdToken()
                .then(idToken => {
                    console.log("idToken after createUser: ", idToken);
                    const data = { email: email };
                    axios.defaults.headers.common['Authorization'] = idToken;   // Set the Authorization header to idToken for all axios calls (across all components)

                    axios.post('/api/users/register', )
                    this.props.history.push({         // send the user to a form to sign up and directly join their company
                        pathname: "/accountpage",
                        state: {
                            uid: authUser.user.uid,        // authUser returned from Firebase
                        }
                    });    
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
        const { email, password, password1, firstName, lastName, error } = this.state;

        const invalidCondition = firstName === '' || lastName === '' || password !== password1 || password1 === '' || email === '';

        return (
            <div className="register">
                <MuiThemeProvider>
                    <div>
                        <div className="register-top-bar">
                            <Link to="/">
                                Home
                            </Link>
                        </div>
                        
                        <p className="header">Sign Up</p>

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

                            <TextField
                                style = {{width: '65%'}}
                                hintText="Re-enter your password"
                                floatingLabelText="Re-enter password"
                                name="password1"
                                type="password"
                                required={true}
                                value={this.state.password1}
                                onChange={this.onChange}
                            />
                            <br/>

                            <TextField
                                style = {{width: '65%'}}
                                hintText="First Name"
                                floatingLabelText="First Name"
                                name="firstName"
                                type="text"
                                required={true}
                                value={this.state.firstName}
                                onChange={this.onChange}
                            />
                            <br/>

                            <RaisedButton
                                className="register-button"
                                label="SignUp"
                                primary={true}
                                type="submit"
                                disabled={invalidCondition}
                            />

                            <p>By signing up, you agree to the Terms and Conditions and Privacy Policy.</p>

                            {error && <p>{error.message}</p>}

                        </form>
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }
}

const RegisterForm = withRouter(withFirebase(RegisterFormBase));

export default RegisterPage;

export {RegisterForm};