import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import LogoutButton from '../LogoutButton';
import './css/MobileNavMenu.css';

class MobileNavMenu extends Component {
    state = {
        isOpen: false
    }
    
    render() {
        return (
            <div className="mobile-nav-menu-container">
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
        )
    }
};

export default MobileNavMenu;
