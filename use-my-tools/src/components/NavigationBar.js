import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom"
import LogoutButton from './LogoutButton';

import "./css/NavigationBar.css";



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
                <navigation className="nav-link-container">
                    <Link to="/accountpage" className="nav-link">
                        Account
                    </Link>
                    <Link to="/yourtools" className="nav-link">
                        Your Tools
                    </Link>
                    <LogoutButton className="nav-link" />
                </navigation>
            </header>


        );
    }
}

export default withRouter(NavigationBar);