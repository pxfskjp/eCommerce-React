import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom"
import LogoutButton from './LogoutButton';

import "./css/AccountPage.css";



class NavigationBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null
        };
    }

    render() {
        return (
            
            <header className="nav-container">
                <Link to="/accountpage">
                    Account
                </Link>
                <Link to="/yourtools">
                    Your Tools
                </Link>
                <LogoutButton />
            </header>


        );
    }
}

export default withRouter(NavigationBar);