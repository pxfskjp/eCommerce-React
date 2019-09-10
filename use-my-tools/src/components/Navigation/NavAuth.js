import React from 'react';
import { NavLink } from "react-router-dom";
import LogoutButton from '../LogoutButton';
import MobileNavMenu from './MobileNavMenu';
import './css/NavAuth.css';

const NavAuth = () => (
    <header className="nav-container-auth">
        <h1 className="logo">Use My Tools</h1>
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
        <MobileNavMenu />
    </header>
);

export default NavAuth;