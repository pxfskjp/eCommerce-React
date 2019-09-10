import React from 'react';
import { NavLink } from "react-router-dom";
import './css/NavNonAuth.css';

const NavNonAuth = () => (
    <div className="nav-non-auth-container">
        <h1 className="logo">Use My Tools</h1>
        <div className="nav-link-container">
            <NavLink to="/" className="nav-link">
                Home
            </NavLink>
            <NavLink to="/register" className="nav-link">
                Sign Up
            </NavLink>
            <NavLink to="/login" className="nav-link">
                Sign In
            </NavLink>
        </div>
    </div>
);

export default NavNonAuth;