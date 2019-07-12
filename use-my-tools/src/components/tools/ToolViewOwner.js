import React, { Component } from 'react';

import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Paper from '@material-ui/core/Paper';
// import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ImageCarousel from './ImageCarousel';
import RequestDatesPopUp from '../checkout/RequestDatesPopUp';

import axios from 'axios';

import './css/ToolViewOwner.css';


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
            tool: {},
            selectedFile: null,
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

    handleFileChange = event => {
        // this.setState({
        //   selectedFile: event.target.files[0]
        // });
        let tool_id = this.props.match.params.id;
        const newImageData = new FormData();
        newImageData.append('id', this.props.match.params.id);
        newImageData.append('image_file', event.target.files[0]);
        axios.post('/api/tools/newimage', newImageData)
            .then(response => {
                console.log('/newimage response: ', response);
            })
            .catch(error => {
                console.log(error.messages);
            })
    };

    render() {
        const { tool } = this.state;
        const { classes } = this.props;

        return (
            // <div>
            //     <Paper>
            //     {/* <Card className={classes.card}> */}
            //         {tool.images ? (
            //             <ImageCarousel toolImages={tool.images} />
            //         ) : (
            //             ''
            //         )}

            //         <CardContent className={classes.cardContent}>
            //             <Typography gutterBottom variant="h5" component="h2">
            //                 {tool.brand}{' '}{tool.name}
            //             </Typography>
            //             <Typography>
            //                 {tool.description}
            //             </Typography>
            //             <Typography>
            //                 Daily rental price: ${tool.price}
            //             </Typography>
                        
            //             {tool.available === true ? (
            //                 <Typography>
            //                     This tool is available to be reserved and rented.
            //                 </Typography>
            //             ) : (
            //                 <Typography>
            //                     This tool is not available to be reserved or rented.
            //                 </Typography>
            //             )}

            //             {tool.rented === true ? (
            //                 <Typography>
            //                     This tool is currently rented.
            //                 </Typography>
            //             ) : (
            //                 <Typography>
            //                     This tool is not currently rented.
            //                 </Typography>
            //             )}

            //         </CardContent>

            //         <CardActions>
            //             <input
            //                 accept="image/*"
            //                 className="image-input"
            //                 id="contained-button-file"
            //                 multiple
            //                 type="file"
            //                 name="image"
            //                 onChange={this.handleFileChange}
            //             />
            //             {/* <label htmlFor="contained-button-file">
            //                 <Button component="span" className="register-button">
            //                     Upload Image
            //                 </Button>
            //             </label> */}
            //             {/* <RequestDatesPopUp toolId={tool.id} /> */}
            //         </CardActions>
                    
            //     {/* </Card> */}
            //     </Paper>
            // </div>
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
                    
                        
                        <RequestDatesPopUp toolId={tool.id} />

                    </div>
                </div>

            </div>
        )
    }
}

export default withStyles(styles)(ToolViewOwner);