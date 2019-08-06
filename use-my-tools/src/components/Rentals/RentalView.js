import React, { Component } from 'react';

import { withStyles } from "@material-ui/core/styles";

// import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
// import TextField from "@material-ui/core/TextField";
// import InputAdornment from '@material-ui/core/InputAdornment';

// import ImageCarousel from '../ImageCarousel';

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
            // userType: null,
            // selectedFile: null,
        };
    }

    componentDidMount() {

        let { rentalId, userType } = this.props.match.params;
        // console.log('RentalView rentalId:', rentalId);
        // console.log('RentalView userType:', userType);

        this.getRentalInfo(rentalId, userType);
        // console.log(this.state.tool.images);
    }

    getRentalInfo = (rentalId, userType) => {
        console.log('getRentalInfo called');
        axios.get(`/api/rentals/${userType}/rental/${rentalId}`)
            .then(rental => {
                const dateFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };   // format options for dates
                // convert dates into correct format for display:
                const formattedStartDate = this.formatDate(rental.data.StartDate, dateFormatOptions);
                const formattedEndDate = this.formatDate(rental.data.EndDate, dateFormatOptions);
                rental.data.StartDate = formattedStartDate;
                rental.data.EndDate = formattedEndDate;
                this.setState({
                    rental: rental.data,
                    // renterUid: tool.data.renter_uid,
                    // brand: tool.data.brand,
                    // name: tool.data.name,
                    // description: tool.data.description,
                    // price: tool.data.price,
                    // available: tool.data.available,
                    // rented: tool.data.rented,
                    // rating: tool.data.rating,
                }, () => { 
                    console.log("RentalView state.rental after getRentalInfo:", this.state.rental);
                });
            })
            .catch(error => {
                console.log(error.message);
            })
    }

    formatDate = (dateData, dateFormatOptions) =>{
        const date = new Date(dateData);
        // console.log(date);
        const formattedDate = date.toLocaleDateString("en-US", dateFormatOptions); 
        // console.log(formattedDate);
        return formattedDate;
    }

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

    handleChange = name => event => {
        this.setState({
          [name]: event.target.value
        }, () => console.log(this.state));
    };

    render() {
        const { rental } = this.state;
        const { classes } = this.props;
        const { userType } = this.props.match.params;

        return (
            <div className="page-container">

                <div className="title">
                    <Typography gutterBottom variant="h5" component="h2">
                        {rental.ToolBrand}{' '}{rental.ToolName}
                    </Typography>
                </div>

                <div className="main-container">

                    <div className="left-container">
                        <div className="image-container">
                            {rental.ToolImageURL ? (
                                <img src={rental.ToolImageURL} alt="tool"/>
                            ) : (
                                ''
                            )}
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

                    <div className="right-container">
                        <div className="rental-info">
                            <Typography
                                variant="h6"
                            >
                                {rental.StartDate}{' - '}{rental.EndDate}
                            </Typography>
                            <br/>
                            {userType === 'owner' &&
                                <Typography
                                    variant="h6"
                                >
                                    Renter: {rental.RenterFirstName}{' '}{rental.RenterLastName}
                                </Typography>
                            }
                            {userType === 'renter' &&
                                <Typography
                                    variant="h6"
                                >
                                    Owner: {rental.OwnerFirstName}{' '}{rental.OwnerLastName}
                                </Typography>
                            }
                            
                            {rental.Status === 'upcoming' && 
                                <Typography
                                    variant="h6"
                                >
                                    Status: Upcoming
                                </Typography>
                            }
                            {rental.Status === 'completed' && 
                                <Typography
                                    variant="h6"
                                >
                                    Status: Completed
                                </Typography>
                            }
                            {rental.Status === 'cancelledByRenter' && 
                                <Typography
                                    variant="h6"
                                >
                                    Status: Cancelled
                                </Typography>
                            }
                            {rental.Status === 'cancelledByOwner' && 
                                <Typography
                                    variant="h6"
                                >
                                    Status: Cancelled
                                </Typography>
                            }
                            <br/>
                            <Typography
                                variant="h6"
                            >
                                Daily rental price: ${rental.DailyRentalPrice}
                            </Typography>
                           
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