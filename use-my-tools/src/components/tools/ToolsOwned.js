import React, { Component } from 'react';
import { withRouter } from "react-router-dom"
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
                    tools: tools.data
                }, () => console.log('ToolsOwned state.tools after GET tools: ', this.state.tools)) ;
            })
            .catch(error => {
                console.log(error.message);
            })
    }

    render() {
        
        return (
            <div className="mytools-page-container">
                <h1>Manage your tools</h1>
                {/* <div className="tools-list-container">
                    {this.state.tools.map((tool, index) => {
                        return (
                            <div className="tool-item">
                                <p>{tool.name}</p>
                            </div>
                        );
                    })}
                </div> */}
            </div>

        );
    }
}

export default withRouter(ToolsOwned);