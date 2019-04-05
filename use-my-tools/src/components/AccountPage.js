import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom"
import LogoutButton from './LogoutButton';

class AccountPage extends Component {
    render() {
        return (
            <div className="account-page-container">
                <header className="nav-container">
                    <LogoutButton />
                </header>
                <h1>Welcome to your account</h1>
            </div>
        );
    }
}

export default withRouter(AccountPage);