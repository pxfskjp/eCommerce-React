import React, { Component } from 'react';
import { NavLink, withRouter } from "react-router-dom"
import { AuthUserContext } from './Session';
import LogoutButton from './LogoutButton';

import "./css/NavigationBar.css";

const NavigationBar = () => (
    <AuthUserContext.Consumer>
        {authUser =>
            <div>{authUser ? <NavigationAuth /> : <NavigationNonAuth />}</div>
        }
    </AuthUserContext.Consumer>
);

const NavigationAuth = () => (
    <header className="nav-container">
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
    </header>
);

const NavigationNonAuth = () => (
    <div className="nav-container">
        <div className="nav-link-container">
            <NavLink to="/register" className="nav-link">
                Sign Up
            </NavLink>

            <NavLink to="/login" className="nav-link">
                Sign In
            </NavLink>
        </div>
    </div>
)

export default withRouter(NavigationBar);

// class NavigationBar extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             user: null,
//             showNavLinks: true
//         };
//     }

//     toggleShowNavLinks = event => {
//         const style = (this.state.showNavLinks === true) ? false : true;
//         this.setState({ showNavLinks: style });
//     }

//     render() {
//         return (
            
//             <header className="nav-container">
//                 <h1 className="logo">Use My Tools</h1>
//                 {/* <button className="nav-menu-btn" onClick={this.toggleShowNavLinks}>
//                     Menu
//                 </button> */}
//                 <div className="nav-link-container">
                    
//                     <NavLink to="/findtools" className="nav-link" activeStyle={{ color: 'white' }}>
//                         Find Tools
//                     </NavLink>

//                     <NavLink to="/addtool" className="nav-link" activeStyle={{ color: 'white' }}>
//                         Add a tool
//                     </NavLink>

//                     <NavLink to="/ownerdashboard" className="nav-link" activeStyle={{ color: 'white' }}>
//                         Owner Dashboard
//                     </NavLink>

//                     <NavLink to="/renterdashboard" className="nav-link" activeStyle={{ color: 'white' }}>
//                         Renter Dashboard
//                     </NavLink>

//                     <NavLink to="/chat" className="nav-link" activeStyle={{ color: 'white' }}>
//                         Messages
//                     </NavLink>
                    
//                     <NavLink to="/accountpage" className="nav-link" activeStyle={{ color: 'white' }}>
//                         Account
//                     </NavLink>
//                     <LogoutButton className="nav-link" />
//                 </div>
//             </header>


//         );
//     }
// }