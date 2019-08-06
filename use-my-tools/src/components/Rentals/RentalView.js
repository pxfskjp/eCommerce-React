import React, { Component } from 'react';

import { withStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import InputAdornment from '@material-ui/core/InputAdornment';

import ImageCarousel from '../ImageCarousel';



import axios from 'axios';

import './css/RentalView.css';

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
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit
    },
    dense: {
        marginTop: 16
    },
    menu: {
        width: 200
    }

})

class RentalView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rental: {},
            // selectedFile: null,
        };
    }

    componentDidMount() {

        let rentalId = this.props.match.params.rentalId;
        console.log()
        // console.log(tool_id);
        // this.getToolInfo(tool_id);
        // console.log(this.state.tool.images);
    }

    // getToolInfo = tool_id => {
    //     console.log('getToolInfo called');
    //     axios.get(`/api/tools/owner/singletool/${tool_id}`)
    //         .then(tool => {
    //             // console.log('getToolInfo tool:', tool);
    //             // console.log('getToolInfo tool.data:', tool.data);

    //             this.setState({
    //                 tool: tool.data,
    //                 renterUid: tool.data.renter_uid,
    //                 brand: tool.data.brand,
    //                 name: tool.data.name,
    //                 description: tool.data.description,
    //                 price: tool.data.price,
    //                 available: tool.data.available,
    //                 rented: tool.data.rented,
    //                 rating: tool.data.rating,
    //             }, () => { 
    //                 console.log("ToolView state.tool after getToolInfo:", this.state.tool);
    //                 // console.log(this.state.tool.images);

    //             });
    //         })
    //         .catch(error => {
    //             console.log(error.message);
    //         })
    // }

    // updateToolDetails = event => {
    //     console.log('TVO state on updateToolDetails: ', this.state);
    //     const id = this.props.match.params.id;
    //     const tool = {
    //         brand: this.state.brand,
    //         name: this.state.name,
    //         description: this.state.description,
    //         price: this.state.price,
    //         available: this.state.available
    //     }

    //     axios.put(`/api/tools/updatetooldetails/${id}`, tool)
    //         .then(tool => {
    //             console.log("Response from /updatetooldetails", tool.data);
    //             this.setState({
    //                 brand: tool.data.brand,
    //                 name: tool.data.name,
    //                 description: tool.data.description,
    //                 price: tool.data.price,
    //                 available: tool.data.available,
    //             })
    //             .catch(error => {
    //                 console.log(error.message);
    //             });
    //         })

    // }

    // handleFileChange = event => {
    //     // this.setState({
    //     //   selectedFile: event.target.files[0]
    //     // });
    //     // let tool_id = this.props.match.params.id;
    //     const newImageData = new FormData();
    //     newImageData.append('id', this.props.match.params.id);
    //     newImageData.append('image_file', event.target.files[0]);
    //     axios.post('/api/tools/newimage', newImageData)
    //         .then(response => {
    //             console.log('/newimage response: ', response);
    //         })
    //         .catch(error => {
    //             console.log(error.messages);
    //         })
    // };

    // handleToolDelete = event => {
    //     this.props.history.push({        
    //         pathname: "/yourtools"
    //     });
    // }

    handleChange = name => event => {
        this.setState({
          [name]: event.target.value
        }, () => console.log(this.state));
    };

    render() {
        const { tool } = this.state;
        const { classes } = this.props;

        return (
            <div className="page-container">
                <div className="title">
                    Title here
                    {/* <Typography gutterBottom variant="h5" component="h2">
                        {tool.brand}{' '}{tool.name}
                    </Typography> */}
                    
                </div>

                <div className="main-container">

                    <div className="left-container">
                        Tool image here
                        {/* {tool.images ? (
                            <ImageCarousel toolImages={tool.images} />
                        ) : (
                            ''
                        )} */}

                    </div>

                    <div className="right-container">
                        <div className="rental-info">
                            Rental Info here
                           
                        </div>

                        <div className="rental-management">
                            Rental management here
                            {/* Rental rating */}

                            {/* Rental review */}

                            {/* Cancel rental Dialog*/}
                            {/* <CancelDialog 
                                toolId={this.props.match.params.id} 
                                handleToolDelete={this.handleToolDelete} 
                            /> */}
                        </div>
                    </div>
                    {/* end right-container */}

                </div> 
                {/* end main-container */}

            </div>
            // end page-container 
        )
    }
}

export default withStyles(styles)(RentalView);