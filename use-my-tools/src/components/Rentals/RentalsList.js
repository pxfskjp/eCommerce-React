//  RentalsList displays list of rentals of specific category (Upcoming, Active, or History)
// takes a prop from RentalsView that specifies category
// CDM get request for rentals uses a variable for Rental Status based on category prop
// for Upcoming, get Rentals with Status 'upcoming'
// for Active, get Rentals with Status 'active'
// for History, get Rentals with Status 'completed', 'cancelledByOwner', or 'cancelledByRenter

import React, { Component } from 'react';
import { withRouter, Link } from "react-router-dom"
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
// import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import axios from 'axios';

import './css/RentalsList.css';

class RentalsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rentals: []
        }
    }
    
    componentDidMount() {
        // get rentals
        const { userType, tabName } = this.props;
        let statuses = [];
        if (tabName === 'upcoming') {
            statuses = ['upcoming']
        } else if (tabName === 'active') {
            statuses = ['active']
        } else if (tabName === 'history') {
            statuses = ['completed', 'cancelledByOwner', 'cancelledByRenter']
        }

        let rentalRequestData = {
            statuses
        }
        
        axios.post(`/api/rentals/${userType}/getrentals`, rentalRequestData)
            .then(rentals => {
                console.log('RentalsList CDM rental data: ', rentals.data);
                this.setState({ rentals: rentals.data });
            })
            .catch(error => {
                console.log(error.message);
            })
    } 

    render() {
        const { rentals } = this.state;
        return (
            <div className="rentals-list-container">
                {rentals.map((rental, index) => {
                    return (
                        <div className="rental-container">
                            <h3>{rental.ToolBrand}{' '}{rental.ToolName}</h3>
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default withRouter(RentalsList);