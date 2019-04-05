import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom"


class AccountPage extends Component {
    render() {
        return (
            <div className="account-page-container">
                <header className="nav-container">
                    <Link to="/register" className="nav-link">
                        Sign Up
                    </Link>
                    <br/>

                    <Link to="/login" className="nav-link">
                        Sign In
                    </Link>
                </header>
                <h1>Welcome to your account</h1>
            </div>
        );
    }
}

export default withRouter(AccountPage);