import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom"
import LogoutButton from './LogoutButton';
import axios from 'axios';


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
                <LogoutButton />
            </header>


        );
    }
}

export default withRouter(NavigationBar);