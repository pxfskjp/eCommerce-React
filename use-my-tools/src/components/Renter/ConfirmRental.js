import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";

import Checkout from '../Billing/Checkout';
import {
    Grid,
    Card,
    CardContent,
    CardHeader,
    Typography,
  } from '@material-ui/core';

import './css/ConfirmRental.css';

import axios from 'axios';

const styles = theme => ({
    cardPricing: {
      display: 'flex',
      justifyContent: 'center',
      marginBottom: theme.spacing.unit * 2,
    },
    cardActions: {
      [theme.breakpoints.up('sm')]: {
        paddingBottom: theme.spacing.unit * 2,
      },
    },
  })

class ConfirmRental extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rental: {}
        };
    };

    componentDidMount() {
        const { rentalId } = this.props.match.params;
        const userType = 'renter';
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
                rental.data.formattedStartDate = formattedStartDate;
                rental.data.formattedEndDate = formattedEndDate;
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
                    console.log("ConfirmRental state.rental after getRentalInfo:", this.state.rental);
                });
            })
            .catch(error => {
                console.log(error.message);
            })
    };

    formatDate = (dateData, dateFormatOptions) => {
        const date = new Date(dateData);
        // console.log(date);
        const formattedDate = date.toLocaleDateString("en-US", dateFormatOptions); 
        // console.log(formattedDate);
        return formattedDate;
    };

    goToRentalView = () => {
        const { rentalId } = this.props.match.params;
        this.props.history.push({
            pathname: `/rentalview/${rentalId}/renter`
        });
    };

    render() {
        const { rental } = this.state;
        return (
            <div className="confirm-rental-page">

                <div className="confirm-rental-panel">

                    <Card className="card" align="left">
                        <CardHeader
                            title='Review details for this rental and provide payment information to confirm.'
                            // subheader={tier.subheader} no subheaders defined
                            titleTypographyProps={{ align: 'left', variant: 'h5' }}
                            subheaderTypographyProps={{ align: 'center' }}
                        />
                        <CardContent>
                            <div className="rental-info-container">
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
                                    
                                    <Typography variant="h6">
                                        {rental.formattedStartDate}{' - '}{rental.formattedEndDate}
                                    </Typography>
                                    
                                    <Typography variant="h6">
                                        Owner: {rental.OwnerFirstName}{' '}{rental.OwnerLastName}
                                    </Typography>
                                </div>
                            </div>
                            <Checkout 
                                name={'Rental Checkout'}
                                description={'Rental Checkout'}
                                amount={rental.DailyRentalPrice * 100}
                                rentalId={rental.RentalID}
                                goToRentalView={this.goToRentalView}
                            /> 
                        </CardContent>
                    </Card>
                </div>
            </div>
        );
    };
};

export default withRouter(withStyles(styles)(ConfirmRental));