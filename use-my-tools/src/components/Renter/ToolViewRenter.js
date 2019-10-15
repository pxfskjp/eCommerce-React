import React from 'react';
import { withRouter, Route, BrowserRouter as Router } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import ImageCarousel from '../ImageCarousel';
import RequestDates from '../RequestTool/RequestDates';
import ContactOwner from './ContactOwner.js';
// import ConfirmRental from './ConfirmRental';


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
        this.getToolInfo(tool_id);
        console.log(this.state.tool);
    }

    getToolInfo = tool_id => {
        axios.get(`/api/tools/renter/singletool/${tool_id}`)
            .then(tool => {
                this.setState({
                    tool: tool.data
                });
            })
            .catch(error => {
                console.log(error.message);
            })
    }

    render() {
        const { tool } = this.state;
        const toolId = this.props.match.params.id;

        return (
            <div className="pageContainer">
                

                <div className="mainContainer">
                    <div className="leftContainer">
                        <div className="tool-title-container">
                            <Typography gutterBottom variant="h5" component="h2">
                                {tool.brand}{' '}{tool.name}
                            </Typography>
                        </div>
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
                                Rating: {tool.rating} Stars
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
                    
                        <br/>

                        {tool.id && 
                            <RequestDates toolId={toolId} dailyRentalPrice={tool.price} userType="renter" confirmRental={this.goToConfirmRental} />
                        }

                        <br/>
                        <ContactOwner renterUID={this.state.tool.renterUid} ownerUID={this.state.tool.ownerUid}/>

                    </div>
                </div>

            </div>
        )
    }
}

export default withRouter(withStyles(styles)(ToolViewRenter));