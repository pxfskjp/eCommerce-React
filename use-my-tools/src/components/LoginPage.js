import React, { Component } from 'react';
import { withFirebase } from "./Firebase";
import { Link, withRouter } from "react-router-dom"
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Typography from "@material-ui/core/Typography";
import axios from 'axios';

import "./css/LoginPage.css";

class LoginBase extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            error: null
        };
    }

    onSubmit = event => {
        event.preventDefault();
        const {email, password } = this.state;
        console.log('LoginPage state on submit: ', this.state);
    
        this.props.firebase.logIn(email, password)
            .then(authUser => {
                console.log('authUser: ', authUser);
        
                this.props.firebase.auth.currentUser.getIdToken()
                    .then(idToken => {
                        console.log("idToken from firebase logIn: ", idToken);
                        axios.defaults.headers.common['Authorization'] = idToken;   
                        this.props.history.push('/accountpage');
                    })  
                    .catch(error => {                 // if Firebase getIdToken throws an error
                        this.setState({ 
                            email: "",
                            password: "",
                            error:error 
                        });
                    })
            })
            .catch(error => {                    // if Firebase logIn throws an error
                this.setState({ 
                    email: "",
                    password: "",
                    error:error 
                });
            });
    }

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render() {
        const { email, password, error } = this.state;
        const invalidCondition = password === '' || email === '';

        return (

            <MuiThemeProvider>
                <div className="login">
                    
                        <Typography gutterBottom variant="h5" component="h2">
                            Sign In
                        </Typography>

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
                                label="Sign In"
                                primary={true}
                                type="submit"
                                disabled={invalidCondition}
                            />

                            <div className="sign-up-container">
                                <p>Don't have an account?</p>
                                <Link to="/register" className="sign-up-link">
                                    Sign Up
                                </Link>
                            </div>

                            {error && <p>{error.message}</p>}
                        </form>
                    
                </div>
            </MuiThemeProvider>
        );
    }
}

const LoginPage = withRouter(withFirebase(LoginBase));

export default LoginPage;

