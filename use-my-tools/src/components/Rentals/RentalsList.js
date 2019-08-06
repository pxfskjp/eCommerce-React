//  RentalsList displays list of rentals of specific category (Upcoming, Active, or History)
// takes a prop from RentalsView that specifies category
// CDM get request for rentals uses a variable for Rental Status based on category prop
// for Upcoming, get Rentals with Status 'upcoming'
// for Active, get Rentals with Status 'active'
// for History, get Rentals with Status 'completed', 'cancelledByOwner', or 'cancelledByRenter

import React, { Component } from 'react';
import { withRouter, Link } from "react-router-dom"
// import { withStyles } from "@material-ui/core/styles";
// import Card from "@material-ui/core/Card";
// import CardActions from "@material-ui/core/CardActions";
// import CardContent from "@material-ui/core/CardContent";
// import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
// import Paper from "@material-ui/core/Paper";
// import Tabs from "@material-ui/core/Tabs";
// import Tab from "@material-ui/core/Tab";

import axios from 'axios';
// import moment from 'moment';

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
                // console.log('RentalsList CDM rental data: ', rentals.data);
                const dateFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };   // format options for dates used below
                // convert dates into correct format for display:
                for (let rental of rentals.data) {
                    const formattedStartDate = this.formatDate(rental.StartDate, dateFormatOptions);
                    const formattedEndDate = this.formatDate(rental.EndDate, dateFormatOptions);
                    rental.StartDate = formattedStartDate;
                    rental.EndDate = formattedEndDate;
                }
                this.setState({ rentals: rentals.data }, () => console.log(this.state));
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

    render() {
        const { rentals } = this.state;
        if (rentals.length === 0) {
            return (
                <h1>You do not have any rentals in {this.props.tabName}.</h1>
            )
        } else {
            return (
                <div className="rentals-list-container">
                    
                        {rentals.map((rental, index) => {
                        
                            return (
                                <Link key={index} className="rental-container">
        
                                    <img 
                                        className="tool-image"
                                        src={rental.ToolImageURL} 
                                        alt="tool"
                                    />
                                    <div className="rental-info">
                                        <Typography
                                        variant="h5"
                                        >
                                            {rental.ToolBrand}{' '}{rental.ToolName}
                                        </Typography>
                                        <br/>
        
                                        <Typography
                                        variant="h6"
                                        >
                                            {rental.StartDate}{' - '}{rental.EndDate}
                                        </Typography>
                                        <br/>
        
                                        {rental.Status === 'completed' && 
                                            <Typography
                                                variant="h6"
                                            >
                                                Completed
                                            </Typography>
                                        }
                                        {rental.Status === 'cancelledByRenter' && 
                                            <Typography
                                                variant="h6"
                                            >
                                                Cancelled by renter
                                            </Typography>
                                        }
                                        {rental.Status === 'cancelledByOwner' && 
                                            <Typography
                                                variant="h6"
                                            >
                                                Cancelled by you
                                            </Typography>
                                        }
                                    </div>
        
                                </Link>
                            )
                        })}
                </div>
            )
        }   
    }
}

export default withRouter(RentalsList);