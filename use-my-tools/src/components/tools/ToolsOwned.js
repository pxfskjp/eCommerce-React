import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom"
import LogoutButton from '../LogoutButton';
import axios from 'axios';


class ToolsOwned extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tools: null
        };
    }

    componentDidMount() {
        axios.get('/api/tools/mytools')
            .then(tools => {
                this.setState({
                    tools: tools
                }, () => console.log('ToolsOwned state.tools after GET tools: ', this.state.tools)) ;
            })
            .catch(error => {
                console.log(error.message);
            })
    }

    render() {
        return (
            <div className="account-page-container">
                <h1>Manage your tools</h1>
            </div>
        );
    }
}

export default withRouter(ToolsOwned);