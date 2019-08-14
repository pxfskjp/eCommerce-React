import React, { Component } from 'react';
import { withStyles } from "@material-ui/core/styles";
// import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
// import TextField from "@material-ui/core/TextField";

import CancelDialog from './CancelDialog';

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

    // handleChange = name => event => {
    //     this.setState({
    //       [name]: event.target.value
    //     }, () => console.log(this.state));
    // };

    cancelRental = () => {
        const { userType, rentalId } = this.props.match.params;
        let cancelStatus = null;
        if (userType === 'owner') {
            cancelStatus = 'cancelledByOwner';
        } else if (userType === 'renter') {
            cancelStatus = 'cancelledByRenter';
        }
        
        const updateData = { rentalId, status: cancelStatus };
        axios.put(`/api/rentals/updatestatus`, updateData)
        .then(response => {
            console.log('resonse from cancel request: ', response);
            let { rental } = this.state;
            rental.Status = response.data;
            this.setState({ rental }, () => console.log(this.state));
        })
        .catch(error => {
            this.setState({ error: error.message });
        })
      };

    render() {
        const { rental } = this.state;
        const { classes } = this.props;
        const { userType, rentalId } = this.props.match.params;
        let rating = null;
        if (userType === 'owner') {
            rating = 'RatingByOwner';
        } else if (userType === 'renter') {
            rating = 'RatingByRenter';
        }
        console.log(rating);
        
        
        return (
            <div className="page-container">

                <div className="title">
                    {userType === 'renter' &&
                        <Typography
                            variant="h6"
                        >
                            You booked this rental
                        </Typography>
                    }
                    {userType === 'owner' &&
                        <Typography
                            variant="h6"
                        >
                            This is your tool
                        </Typography>
                    }
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

                        <div className="tool-info">
                            <Typography variant="h6">
                                {rental.ToolBrand}{' '}{rental.ToolName}
                            </Typography>

                            {userType === 'renter' &&
                                <Typography variant="h6">
                                    Owner: {rental.OwnerFirstName}{' '}{rental.OwnerLastName}
                                </Typography>
                            }
                        </div>

                    </div>

                    <div className="right-container">
                        <div className="rental-info">
                            {userType === 'owner' &&
                                <Typography variant="h6">
                                    Renter: {rental.RenterFirstName}{' '}{rental.RenterLastName}
                                </Typography>
                            }
                            <br/>
                            <Typography variant="h6">
                                {rental.StartDate}{' - '}{rental.EndDate}
                            </Typography>
                            <br/>
                            
                            {rental.Status === 'upcoming' && 
                                <Typography variant="h6">
                                    Status: Upcoming
                                </Typography>
                            }
                            {rental.Status === 'completed' && 
                                <Typography variant="h6">
                                    Status: Completed
                                </Typography>
                            }
                            {rental.Status === 'cancelledByRenter' && 
                                <Typography variant="h6">
                                    Status: Cancelled by Renter
                                </Typography>
                            }
                            {rental.Status === 'cancelledByOwner' && 
                                <Typography variant="h6">
                                    Status: Cancelled by Owner
                                </Typography>
                            }
                            <br/>
                            <Typography variant="h6">
                                Daily rental price: ${rental.DailyRentalPrice}
                            </Typography>
                        </div>

                        <div className="rental-management">
                            {/* Rental rating */}
                            {(rental.Status === 'completed' && !rental[rating]) ?
                                <div className="rating-container">
                                    <Typography variant="h6">
                                        Rate this rental experience (1-5 stars):
                                    </Typography>
                                    <select name="rating-input">
                                        
                                    </select>
                                </div>
                            : 
                                <Typography variant="h6">
                                    Submit rating once complete
                                </Typography>
                            }
                            {/* Rental review */}

                            {(rental.Status === 'upcoming' || rental.Status === 'active') &&
                                <CancelDialog confirmCancelRental={this.cancelRental}/>
                            }

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