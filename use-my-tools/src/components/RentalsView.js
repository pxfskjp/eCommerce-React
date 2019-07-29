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

const styles = {
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
    }
}


class RentalsView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTabIndex: 0
        }
    }

    handleTabSelect = (_, activeTabIndex) => this.setState({ activeTabIndex });

    render() {
        const { classes } = this.props;
        const { activeTabIndex } = this.state

        return (
            <div className="rentals-view-container">

                <div className={classes.tabMenu}>
                    <Paper className={classes.paper}>
                        <Tabs
                            className={classes.paper2}
                            value={this.state.activeTabIndex}
                            onChange={this.handleTabSelect}
                            indicatorColor="primary"
                            textColor="primary"
                            centered
                        >

                            <Tab className={classes.tabElement} label={<h1 className={classes.tabLabel}>Upcoming</h1>} />
                            <Tab className={classes.tabElement} label={<h1 className={classes.tabLabel}>Active</h1>} />
                            <Tab className={classes.tabElement} label={<h1 className={classes.tabLabel}>History</h1>} />

                        </Tabs>
                    </Paper>
                </div>

                <div className="selected-view-container">
                    {activeTabIndex === 0 && <p>Upcoming</p>}
                    {activeTabIndex === 1 && <p>Active</p>}
                    {activeTabIndex === 2 && <p>History</p>}
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(RentalsView);