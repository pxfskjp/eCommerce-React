import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom"
import LogoutButton from './LogoutButton';
import axios from 'axios';


class ToolsOwned extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null
        };
    }

    componentDidMount() {
        axios.get('/api/users/userinfo')
            .then(user => {
                this.setState({
                    user: user
                }, () => console.log('ToolsOwned state after GET user info: ', this.state.user)) ;
            })
            .catch(error => {
                console.log(error.message);
            })
    }

    render() {
        return (
            <div className="account-page-container">
                <header className="nav-container">
                    <LogoutButton />
                </header>
                <h1>Manage your tools</h1>
            </div>
        );
    }
}

export default withRouter(ToolsOwned);