import React from 'react';
import { withFirebase } from "./Firebase";
import { withRouter } from "react-router-dom"
import { FirebaseContext } from './Firebase';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

// import axios from 'axios';

import './css/UpdatePassword.css';

const UpdatePasswordPage = () => (
    <div>
      <FirebaseContext.Consumer>
        {firebase => <UpdatePasswordForm firebase={firebase} />}
      </FirebaseContext.Consumer>
    </div>
  );

class UpdatePasswordFormBase extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            email: "",
            oldPassword: "",
            newPassword1: "",
            newPassword2: "",
            error: null,
            status: "Enter current credentials and new password."
        }
    }

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    onSubmit = event => {
        const { email, oldPassword, newPassword1 } = this.state;
        this.props.firebase
            .doSignInWithEmailAndPassword(email, oldPassword)
            .then(signInResponse => {
                console.log('Sign in response: ', signInResponse);
                this.props.firebase.doPasswordUpdate(newPassword1)
                .then(updateResponse => {
                    console.log("Update response: ", updateResponse);
                    this.setState({
                        email: "",
                        oldPassword: "",
                        newPassword1: "",
                        newPassword2: "",
                        status: "Your password was updated."
                    });
                })
                .catch(error => {   // if updatePassword throws error
                    console.log(error.message);
                    this.setState({
                        error: error
                    });
                })
            })
            .catch(error => {      // if signIn throws error
                console.log(error.message);
                this.setState({
                    error: error
                });
            })
        event.preventDefault();
    };

    render() {
        const { email, oldPassword, newPassword1, newPassword2, error } = this.state;

        const condition = email === '' || oldPassword === '' || oldPassword === newPassword1 || newPassword1 === '' ||  newPassword1 !== newPassword2;
        return (
            <div>

                <MuiThemeProvider>
                    <div className="update-password">
                    <br/>
                    <form onSubmit={this.onSubmit}>
                      <div>{this.state.status}</div>
                        <TextField
                            hintText="Email"
                            floatingLabelText="Email"
                            name="email"
                            type="text"
                            required={true}
                            value={this.state.email}
                            onChange={this.onChange}
                        />
                        <br/>

                        <TextField
                            hintText="Old password"
                            floatingLabelText="Old Password"
                            name="oldPassword"
                            type="password"
                            required={true}
                            value={this.state.oldPassword}
                            onChange={this.onChange}
                        />
                        <br/>

                        <TextField
                            hintText="New password"
                            floatingLabelText="New password"
                            required={true}
                            name="newPassword1"
                            type="password"
                            value={this.state.newPassword1}
                            onChange={this.onChange}
                        />
                        <br/>

                        <TextField
                            hintText="Confirm new password"
                            floatingLabelText="Confirm new password"
                            required={true}
                            name="newPassword2"
                            type="password"
                            value={this.state.newPassword2}
                            onChange={this.onChange}
                        />
                        <br/>
                        <RaisedButton
                            label="Update"
                            primary={true}
                            type="submit"
                            disabled={condition}
                            className="update-password-button"
                        />
                        {error && <p>{error.message}</p>}
                    </form>
                </div>
                </MuiThemeProvider>
            </div>
        )
    }
}

const UpdatePasswordForm = withRouter(withFirebase(UpdatePasswordFormBase));

export default UpdatePasswordPage;

export { UpdatePasswordForm };
