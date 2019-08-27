import React, { Component } from 'react';
import { withRouter } from "react-router-dom"
// import { withStyles } from "@material-ui/core/styles";

import axios from 'axios';

class ConfirmRental extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reservationData: {}
        };
    };

    // onConfirm = () => {
    //     // create new Rental; API creates reserved dates then Rental:
    //     axios.post('/api/rentals/newrental', reservationData)
    //     .then(response => {
    //         console.log('Rental created with response: ', response);
    //         this.props.history.push({
    //         pathname: `/rentalview/${response.data}/renter`
    //         });
    //     })
    //     .catch(error => {
    //         console.log(error.message);
    //         this.setState({ error: error.message });
    //     });
    // };

    render() {
        return (
            <div>
                ConfirmRental page
            </div>
        );
    };
};

export default withRouter(ConfirmRental);