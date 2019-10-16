import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom"
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import LocationSearchInput from './LocationSearchInput';

import axios from 'axios';

import "./css/AccountPage.css";

const styles = theme => ({
    container: {
      display: "flex"
    },
    textField: {
      marginLeft: 10,
      marginRight: 10,
      width: "200px"
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
            fullAddress: '',
            addressDetails: {},
            imageId: null,
            imageUrl: '',
            selectedFile: null,
            loading: false,
            error: null,
        };
    }

    componentDidMount() {
        axios.get('/api/users/userinfo')
            .then(user => {
                this.setState({
                    user: user.data,
                    firstName: user.data.first_name,
                    lastName: user.data.last_name,
                    email: user.data.email,
                    fullAddress: user.data.full_address,
                    imageId: user.data.image_id,
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

    handleSelectLocation = addressDetails => {
        // console.log('AccountPage handleSelectLocation addressDetails: ', addressDetails);
        this.setState({ addressDetails }, () => console.log('AccountPage state.addressDetails after handleSelectLocation:', this.state.addressDetails));
    };

    updateUserDetails = event => {
        console.log('AccountPage state on updateUserDetails: ', this.state);

        const user = {
            first_name: this.state.firstName,
            last_name: this.state.lastName,
            email: this.state.email,
            addressDetails: this.state.addressDetails,
        }

        axios.put('/api/users/updateuserdetails', user)
            .then(user => {
                console.log("Response from /updateuserdetails", user.data);
                this.setState({
                    firstName: user.data.first_name,
                    lastName: user.data.last_name,
                    email: user.data.email,
                    fullAddress: user.data.full_address,
                    imageUrl: user.data.image_url,
                })
                .catch(error => {
                    console.log(error.message);
                });
            })

    }

    fileChangedHandler = (event) => {
        this.setState({
          selectedFile: event.target.files[0]
        }, () => {
          this.imageUpload(event);
        });
    };
    
    imageUpload = event => {
        console.log('inside imageUpload file is', this.state.selectedFile);
    
        let data = new FormData();
            data.append('image_id', this.state.imageId);
            data.append('image_file', this.state.selectedFile);
        
        this.setState({ loading: true });	  
        axios.put(`/api/users/updateimage`, data)
          .then(response => {
                    console.log('response after image update', response);
                    this.setState({
                        imageUrl: response.data, loading: false
                    }, () => {
                        console.log('state.imageUrl:', this.state.imageUrl)
                    });
          })
          .catch(error => {
                    console.log(error.message);
                    this.setState({ error:error });
          })
    
        //  event.preventDefault();
    };

    render() {
        const { classes } = this.props;
        const  addressReceived = this.state.fullAddress;

        return (
            <div className="pageContainer">
            <div className="account-page-container">
                <div className="left-container">
                    <form onSubmit={this.updateUserDetails}>
                        <h2>Personal Details</h2>
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

                        <div className="location-input">
                            {addressReceived ? (
                                <LocationSearchInput 
                                    handleSelectLocation={this.handleSelectLocation}
                                    address={this.state.fullAddress} 
                                 />
                            ) : (
                                ''
                            )}
                            
                        </div>

                        <Button variant="outlined" color="primary" className="save-button" type="submit" >
                            Save
                        </Button>

                    </form>
                    <div className="account-links-container">
                        <Button component={Link} to="/updatepassword" variant="outlined" color="primary" className="account-link-button" >
                            Update Password
                        </Button>
                    </div>

                    
                </div> 
                {/* end left-container */}

                <div className="right-container">
                    <div className="profile-image-container">
                        <h2>Profile Image</h2>
                        
                        <img
                            src={this.state.imageUrl}
                            alt="avatar"
                        />

                        <form className="image-upload" onSubmit={this.imageUpload}>
                            <p>Edit:</p>
                            <input
                                label="Upload Photo"
                                accept="image/*"
                                id="outlined-button-file"
                                type="file"
                                onChange={this.fileChangedHandler}
                            />
                        </form>
                    </div>
                </div>
                {/* end right-container */}

            </div>
            </div>
        );
    }
}

export default withStyles(styles)(withRouter(AccountPage));