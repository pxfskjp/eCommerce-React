import React, { Component } from 'react';

class RegisterPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            password1: "",
            error: null
        };
    }

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render() {
        const { email, password, password1, error } = this.state;

        const invalidCondition = password !== password1 || password1 === '' || email === '';
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

export default RegisterPage;