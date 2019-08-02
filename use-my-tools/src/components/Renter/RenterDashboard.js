import React, { Component } from 'react';

import RentalsView from '../Rentals/RentalsView';

import './css/RenterDashboard.css';

const RenterDashboard = props => {
    return (
        <RentalsView userType={"renter"} />
    )
}

export default RenterDashboard;