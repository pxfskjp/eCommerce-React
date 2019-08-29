import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import Checkout from '../Billing/Checkout';

// import { withStyles } from "@material-ui/core/styles";

import axios from 'axios';

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

    render() {
        const { rental } = this.state;
        return (
            <div>
                ConfirmRental page
                <Checkout 
                    name={'Rental Checkout'}
                    description={'Rental Checkout'}
                    amount={rental.DailyRentalPrice * 100}
                />
            </div>
        );
    };
};

export default withRouter(ConfirmRental);