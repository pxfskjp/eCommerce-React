import React, { Component } from 'react';
import { NavLink, Link, withRouter } from "react-router-dom"
import LogoutButton from './LogoutButton';

import "./css/NavigationBar.css";

class NavigationBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            showNavLinks: true
        };
    }

    toggleShowNavLinks = event => {
        const style = (this.state.showNavLinks === true) ? false : true;
        this.setState({ showNavLinks: style });
    }

    render() {
        return (
            
            <header className="nav-container">
                <h1 className="logo">Use My Tools</h1>
                {/* <button className="nav-menu-btn" onClick={this.toggleShowNavLinks}>
                    Menu
                </button> */}
                <div className="nav-link-container">
                    
                    <NavLink to="/findtools" className="nav-link" activeStyle={{ color: 'white' }}>
                        Find Tools
                    </NavLink>

                    <NavLink to="/addtool" className="nav-link" activeStyle={{ color: 'white' }}>
                        Add a tool
                    </NavLink>

                    <NavLink to="/ownerdashboard" className="nav-link" activeStyle={{ color: 'white' }}>
                        Owner Dashboard
                    </NavLink>

                    <NavLink to="/renterdashboard" className="nav-link" activeStyle={{ color: 'white' }}>
                        Renter Dashboard
                    </NavLink>

                    <NavLink to="/chat" className="nav-link" activeStyle={{ color: 'white' }}>
                        Messages
                    </NavLink>
                    
                    <NavLink to="/accountpage" className="nav-link" activeStyle={{ color: 'white' }}>
                        Account
                    </NavLink>
                    <LogoutButton className="nav-link" />
                </div>
            </header>


        );
    }
}

export default withRouter(NavigationBar);