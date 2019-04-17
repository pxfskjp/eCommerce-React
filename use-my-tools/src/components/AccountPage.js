import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom"
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import axios from 'axios';

import "./css/AccountPage.css";

const styles = theme => ({
    container: {
      display: "flex"
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit
    },
    dense: {
      marginTop: 16
    },
    menu: {
      width: 200
    }
});

class AccountPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            firstName: '',
            lastName: '',
            email: '',
            homeStreetAddress: '',
            imageUrl: '',
            selectedFile: null,
            error: null,
        };
    }

    componentDidMount() {
        axios.get('/api/users/userinfo')
            .then(user => {
                this.setState({
                    user: user.data,
                    firstName: user.data.firstname,
                    lastName: user.data.lastname,
                    email: user.data.email,
                    homeStreetAddress: user.data.home_street_address,
                    imageUrl: user.data.image_url,
                }, () => console.log('AccountPage state after GET user info: ', this.state)) ;
            })
            .catch(error => {
                console.log(error.message);
            })
    }

    handleChange = name => event => {
        this.setState({
          [name]: event.target.value
        });
    };

    render() {
        const { classes } = this.props;
        return (
            <div className="account-page-container">

                <div className="left-container">
                    <form onSubmit={this.updateUserDetails}>
                        <h2>Edit Account Information</h2>
                        <TextField
                            id="outlined-first-name"
                            label="First Name"
                            className={classes.textField}
                            value={this.state.firstName}
                            onChange={this.handleChange("firstName")}
                            margin="normal"
                            variant="outlined"
                        />

                        <TextField
                            id="outlined-last-name"
                            label="Last Name"
                            className={classes.textField}
                            value={this.state.lastName}
                            onChange={this.handleChange("lastName")}
                            margin="normal"
                            variant="outlined"
                        />

                        <TextField
                            id="outlined-email"
                            label="Email"
                            className={classes.textField}
                            value={this.state.email}
                            onChange={this.handleChange("email")}
                            margin="normal"
                            variant="outlined"
                            InputProps={{
                                readOnly: true,
                            }}
                        />

                        <TextField
                            id="outlined-home-street-address"
                            label="Street Address"
                            className={classes.textField}
                            value={this.state.home_street_address}
                            onChange={this.handleChange("home_street-address")}
                            margin="normal"
                            variant="outlined"
                        />

                        <Button variant="outlined" color="primary" className="save-button" type="submit" >
                            Save
                        </Button>
                    </form>
                </div> 
            </div>
        );
    }
}

export default withStyles(styles)(withRouter(AccountPage));