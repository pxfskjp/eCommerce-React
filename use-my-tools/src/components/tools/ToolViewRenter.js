import React, { Component } from 'react';
import axios from 'axios';

class ToolViewRenter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tool: null
        };
    }

    componentDidMount() {
        let tool_id = this.props.match.params.id;
        console.log(tool_id);
        
    }

    getToolInfo = tool_id => {
        axios.get(`/api/tools/tool/renter/${tool_id}`)
            .then(tool => {
                this.setState({
                    tool: tool.data
                }, () => console.log('ToolsOwned state.tools after GET tools: ', this.state.tools)) ;
            })
            .catch(error => {
                console.log(error.message);
            })
    }

    render() {
        return (
            <div>
                Tool View
            </div>
        )
    }
}

export default ToolViewRenter;