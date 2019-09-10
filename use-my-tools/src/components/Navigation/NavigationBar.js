import React, { Component } from 'react';
import { NavLink, withRouter } from "react-router-dom";
import LogoutButton from '../LogoutButton';
import NavNonAuth from './NavNonAuth';
import NavAuth from './NavAuth';
import MobileNavMenu from './MobileNavMenu';


const NavigationBar = props => (
    <div>{props.authUser ? <NavAuth /> : <NavNonAuth />}</div>
);

const NavigationAuth = () => (
    <header className="nav-container">
        <h1 className="logo">Use My Tools</h1>
        <div className="nav-link-container-auth">
            <NavLink to="/findtools" className="nav-link-auth" activeStyle={{ color: 'white' }}>
                Find Tools
            </NavLink>

            <NavLink to="/addtool" className="nav-link-auth" activeStyle={{ color: 'white' }}>
                Add a tool
            </NavLink>

            <NavLink to="/ownerdashboard" className="nav-link-auth" activeStyle={{ color: 'white' }}>
                Owner Dashboard
            </NavLink>
            <NavLink to="/renterdashboard" className="nav-link-auth" activeStyle={{ color: 'white' }}>
                Renter Dashboard
            </NavLink>

            <NavLink to="/chat" className="nav-link-auth" activeStyle={{ color: 'white' }}>
                Messages
            </NavLink>
        
            <NavLink to="/accountpage" className="nav-link-auth" activeStyle={{ color: 'white' }}>
                Account
            </NavLink>
            <LogoutButton className="nav-link-auth" />
        </div>
        <MobileNavMenu />
    </header>
);

export default withRouter(NavigationBar);