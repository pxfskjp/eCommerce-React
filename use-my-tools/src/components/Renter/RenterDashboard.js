import React, { Component } from 'react';
// import { withRouter, Link } from "react-router-dom"
// import { withStyles } from "@material-ui/core/styles";

// import Paper from "@material-ui/core/Paper";
// import Tabs from "@material-ui/core/Tabs";
// import Tab from "@material-ui/core/Tab";
// import Typography from "@material-ui/core/Typography";

import RentalsView from '../Rentals/RentalsView';

// import axios from 'axios';

import './css/RenterDashboard.css';

const RenterDashboard = props => {
    return (
        <RentalsView userType={"renter"} />
    )
}

export default RenterDashboard;