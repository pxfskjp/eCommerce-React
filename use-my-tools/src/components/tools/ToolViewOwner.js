import React, { Component } from 'react';

import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
// import Grid from "@material-ui/core/Grid";
// import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ImageCarousel from './ImageCarousel';
import RequestDatesPopUp from '../checkout/RequestDatesPopUp';

import axios from 'axios';


const styles = theme => ({
    card: {
        height: "100%",
        display: "flex",
        flexDirection: "column"
    },
    cardContent: {
        flexGrow: 1,
        // maxHeight: 100,
        minHeight: 200,
        overflowY: "scroll"
    },

})

class ToolViewOwner extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tool: {}
        };
    }

    componentDidMount() {
        let tool_id = this.props.match.params.id;
        console.log(tool_id);
        this.getToolInfo(tool_id);
        console.log(this.state.tool.images);
    }

    getToolInfo = tool_id => {
        console.log('getToolInfo called');
        axios.get(`/api/tools/owner/singletool/${tool_id}`)
            .then(tool => {
                // console.log('getToolInfo tool:', tool);
                // console.log('getToolInfo tool.data:', tool.data);

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
            <div>
                My Tool View
                <Card className={classes.card}>
                    {tool.images ? (
                        <ImageCarousel toolImages={tool.images} />
                    ) : (
                        ''
                    )}

                    <CardContent className={classes.cardContent}>
                        <Typography gutterBottom variant="h5" component="h2">
                            {tool.brand}{' '}{tool.name}
                        </Typography>
                        <Typography>
                            {tool.description}
                        </Typography>
                        <Typography>
                            Daily rental price: ${tool.price}
                        </Typography>
                        
                        {tool.available === true ? (
                            <Typography>
                                This tool is available to be reserved and rented.
                            </Typography>
                        ) : (
                            <Typography>
                                This tool is not available to be reserved or rented.
                            </Typography>
                        )}

                        {tool.rented === true ? (
                            <Typography>
                                This tool is currently rented.
                            </Typography>
                        ) : (
                            <Typography>
                                This tool is not currently rented.
                            </Typography>
                        )}

                    </CardContent>

                    <CardActions>
                        <RequestDatesPopUp toolId={tool.id} />
                    </CardActions>
                    
                </Card>
            </div>
        )
    }
}

export default withStyles(styles)(ToolViewOwner);