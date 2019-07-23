import React from 'react';

import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ImageCarousel from '../ImageCarousel';
import RequestDatesPopUp from '../RequestTool/RequestDatesPopUp';
import ContactOwner from './ContactOwner.js';

import axios from 'axios';

import './css/ToolViewRenter.css';

const styles = theme => ({

})

class ToolViewRenter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tool: {}
        };
    }

    componentDidMount() {
        let tool_id = this.props.match.params.id;
        // console.log(tool_id);
        this.getToolInfo(tool_id);
        // console.log(this.state.tool.images);
        console.log(this.state.tool);
    }

    getToolInfo = tool_id => {
        console.log('getToolInfo called');
        axios.get(`/api/tools/renter/singletool/${tool_id}`)
            .then(tool => {
                // console.log('getToolInfo tool:', tool);
                console.log('getToolInfo tool.data:', tool.data);

                this.setState({
                    tool: tool.data
                }, () => { 
                    console.log("ToolView state.tool after getToolInfo:", this.state.tool);
                    // console.log(this.state.tool.images);
                });
            })
            .catch(error => {
                console.log(error.message);
            })
    }

    render() {
        const { tool } = this.state;
        const { classes } = this.props;

        return (
            <div className="pageContainer">
                <div className="title">
                    <Typography gutterBottom variant="h5" component="h2">
                        {tool.brand}{' '}{tool.name}
                    </Typography>
                    
                </div>

                <div className="mainContainer">
                    <div className="leftContainer">
                        {tool.images ? (
                            <ImageCarousel toolImages={tool.images} />
                        ) : (
                            ''
                        )}
                    </div>

                    <div className="rightContainer">
                        <div className="toolInfo">
                            <Typography gutterBottom variant="h5" component="h2">
                                Description
                            </Typography>
                            <Typography>
                                {tool.description}
                            </Typography>
                            <br/>
                            <Typography>
                                Location: {tool.ownerCity}{', '}{tool.ownerState}
                            </Typography>
                            <br/>
                            <Typography>
                                Daily rental price: ${tool.price}
                            </Typography>
                        </div>
                    
                        
                        <RequestDatesPopUp toolId={tool.id} userType="renter"/>

                        <ContactOwner renterUID={this.state.tool.renterUid} ownerUID={this.state.tool.ownerUid}/>

                    </div>
                </div>

            </div>
        )
    }
}

export default withStyles(styles)(ToolViewRenter);