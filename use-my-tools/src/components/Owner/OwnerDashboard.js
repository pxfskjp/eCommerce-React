import React, { Component } from 'react';
import { withRouter, Link } from "react-router-dom"
import { withStyles } from "@material-ui/core/styles";

// import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
// import Typography from "@material-ui/core/Typography";

import MyTools from './MyTools';
import RentalsView from '../Rentals/RentalsView';

// import axios from 'axios';

import './css/OwnerDashboard.css';

const styles = theme => ({
    tabMenu: {
        // height: '100%',
        // border: '1px solid red',
        borderRadius: '0px',
        width: '100%',
        borderBottom: '1px gray solid',
    },
    paper: {
        // height: '100%'
        borderRadius: '0px'
    },
    paper2: {
        // height: '100%',
        borderRadius: '0px'
    },
    tabs1: {
        height: '100%'
    },
        tabElement: {
        width: '30%',
        minWidth: 50,
        maxWidth: 200
    },
        tab: {
        display: 'flex',
        justifyContent: 'space-around'
    },
        tabLabel: {
        fontSize: 16,
        padding: 0
    },

})

const VerticalTabs = withStyles(theme => ({
    flexContainer: {
      flexDirection: "column",
      height: "100%",
    },
    indicator: {
      display: "none"
    }
}))(Tabs);

const VerticalTab = withStyles(theme => ({
    selected: {
      color: "tomato",
      borderRight: "5px solid tomato"
    }
}))(Tab);

class OwnerDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTabIndex: 0
        };
    }

    handleTabSelect = (_, activeTabIndex) => this.setState({ activeTabIndex });

    render() {
        const { classes } = this.props;
        const { activeTabIndex } = this.state
        return (
            <div className="owner-dashboard-container">
                
                <div
                    style={{
                        width: "max-content",
                        height: "100vh",
                        // display: "flex",
                        borderRight: "5px solid grey",
                        padding: 5,
                    }}
                >
                    <h2>Owner Dashboard</h2>
                    <VerticalTabs value={activeTabIndex} onChange={this.handleTabSelect}>
                        <VerticalTab label="rentals" />
                        <VerticalTab label="tools" />

                    </VerticalTabs>
                </div>
                    
                <div className="selected-view-container">
                    {activeTabIndex === 0 && <RentalsView userType={"owner"}/>}
                    {activeTabIndex === 1 && <MyTools />}
                </div>
                
            </div>

        );
    }
}

export default withRouter(withStyles(styles)(OwnerDashboard));
