import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom"
import LogoutButton from '../LogoutButton';
import axios from 'axios';


class AddTool extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null
        };
    }

    // componentDidMount() {
    //     axios.get('/api/users/userinfo')
    //         .then(user => {
    //             this.setState({
    //                 user: user
    //             }, () => console.log('ToolsOwned state after GET user info: ', this.state.user)) ;
    //         })
    //         .catch(error => {
    //             console.log(error.message);
    //         })
    // }

    render() {
        return (
            <div className="add-tool-container">
                <h1>Add a new tool</h1>
            </div>
        );
    }
}

export default withRouter(AddTool);