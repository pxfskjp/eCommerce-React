import React, { Component } from 'react';
import { withStyles } from "@material-ui/core/styles";
// import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
// import TextField from "@material-ui/core/TextField";
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
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
    },
    formControl: {
        margin: "0 15px 0 15px",
        minWidth: 90,
      },
})

class RentalView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rental: {},
            // userType: null,
            // selectedFile: null,
        };
    };

    componentDidMount() {
        let { rentalId, userType } = this.props.match.params;
        this.getRentalInfo(rentalId, userType);
    };

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
    };

    formatDate = (dateData, dateFormatOptions) =>{
        const date = new Date(dateData);
        // console.log(date);
        const formattedDate = date.toLocaleDateString("en-US", dateFormatOptions); 
        // console.log(formattedDate);
        return formattedDate;
    };

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

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
                                        Rate this rental experience:
                                    </Typography>
                                    {/* <form className="rating-form">
                                        <select name="rating-select" size="5">
                                            <option value="1">1 Star</option>
                                            <option value="2">2 Stars</option>
                                            <option value="3">3 Stars</option>
                                            <option value="4">4 Stars</option>
                                            <option value="5">5 Stars</option>
                                        </select>
                                        <button type="submit">Submit</button>
                                    </form> */}
                                    <FormControl className={classes.formControl}>
                                        <InputLabel htmlFor="rating-select">Rating</InputLabel>
                                            <Select
                                                // value={values.age}
                                                onChange={this.handleChange}
                                                inputProps={{
                                                    name: 'rating-select',
                                                    id: 'rating-select',
                                                }}
                                            >
                                        <MenuItem value={1}>1 Star</MenuItem>
                                        <MenuItem value={2}>2 Stars</MenuItem>
                                        <MenuItem value={3}>3 Stars</MenuItem>
                                        <MenuItem value={4}>4 Stars</MenuItem>
                                        <MenuItem value={5}>5 Stars</MenuItem>
                                        </Select>
                                    </FormControl>
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
                        {/* end rental-management */}
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