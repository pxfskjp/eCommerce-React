import React, { Component } from 'react';
import { withRouter, Link } from "react-router-dom"
import { withStyles } from "@material-ui/core/styles";

import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import MyTools from './MyTools';

import axios from 'axios';

const styles = theme => ({
    // card: {
    //     height: "100%",
    //     display: "flex",
    //     flexDirection: "column"
    // },
    // cardContent: {
    //     flexGrow: 1,
    //     maxHeight: 100,
    //     minHeight: 100,
    //     overflow: "hidden"
    // },
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

class OwnerDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            tools: []
        };
    }

    componentDidMount() {
        // axios.get('/api/tools/mytools')
        //     .then(tools => {
        //         this.setState({
        //             tools: tools.data
        //         }, () => console.log('ToolsOwned state.tools after GET tools: ', this.state.tools)) ;
        //     })
        //     .catch(error => {
        //         console.log(error.message);
        //     })
    }

    handleTabSelect = (event, value) => {
        this.setState({ value });
    };

    render() {
        const { classes } = this.props;

        return (
            <div className="mytools-page-container">
                <h1>Manage your tools and rentals</h1>
                <div className={classes.tabMenu}>
                    <Paper className={classes.paper}>
                        <Tabs
                            className={classes.paper2}
                            value={this.state.value}
                            onChange={this.handleTabSelect}
                            indicatorColor="primary"
                            textColor="primary"
                            centered
                            >
                            
                            <Tab className={classes.tabElement} label={<h1 className={classes.tabLabel}>Tools</h1>} />
                            <Tab className={classes.tabElement} label={<h1 className={classes.tabLabel}>Rentals</h1>} />
                        </Tabs>
                    </Paper>
                </div>

                <div className="selected-view-container">
                    {this.state.value === 0 && 
                        <MyTools />
                    }
                    {this.state.value === 1 && 
                        <MyTools />
                    }
                </div>
                
            </div>

        );
    }
}

export default withRouter(withStyles(styles)(OwnerDashboard));