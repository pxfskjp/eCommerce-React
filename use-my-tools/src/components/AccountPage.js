import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom"

import axios from 'axios';

import "./css/AccountPage.css";

class AccountPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            firstName: '',
            lastName: '',
            email: '',
            image_url: '',
            selectedFile: null,
            error: null,
        };
    }

    componentDidMount() {
        axios.get('/api/users/userinfo')
            .then(user => {
                this.setState({
                    user: user.data
                }, () => console.log('AccountPage state.user after GET user info: ', this.state.user)) ;
            })
            .catch(error => {
                console.log(error.message);
            })
    }

    render() {
        return (
            <div className="account-page-container">
                <h1>Welcome to your account</h1>
            </div>
        );
    }
}

export default withRouter(AccountPage);