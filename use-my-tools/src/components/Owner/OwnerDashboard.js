import React, { Component } from 'react';
import { withRouter, Link } from "react-router-dom"
import { withStyles } from "@material-ui/core/styles";

import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";

import MyTools from './MyTools';

// import axios from 'axios';

import './css/OwnerDashboard.css';

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

const VerticalTabs = withStyles(theme => ({
    flexContainer: {
      flexDirection: "column"
    },
    indicator: {
      display: "none"
    }
}))(Tabs);

const MyTab = withStyles(theme => ({
    selected: {
      color: "tomato",
      borderRight: "2px solid tomato"
    }
}))(Tab);

function TabContainer(props) {
    return (
      <Typography component="div" style={{ padding: 8 * 3 }}>
        {props.children}
      </Typography>
    );
}

class OwnerDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTabIndex: 0,
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
                        borderRight: "2px solid grey",
                        padding: 10
                    }}
                >
                    <h2>Owner Dashboard</h2>
                    <VerticalTabs value={activeTabIndex} onChange={this.handleTabSelect}>
                    <MyTab label="rentals" />
                    <MyTab label="tools" />

                    </VerticalTabs>
                </div>
                    {activeTabIndex === 0 && <TabContainer>Rentals</TabContainer>}
                    {activeTabIndex === 1 && <MyTools />}

                

                {/* <div className="selected-view-container">
                    {this.state.value === 0 && 
                        <MyTools />
                    }
                    {this.state.value === 1 && 
                        <MyTools />
                    }
                </div> */}
                
            </div>

        );
    }
}

export default withRouter(withStyles(styles)(OwnerDashboard));

{/* <div className={classes.sideTabeMenu}>

<Tabs
    orientation="vertical"
    variant="scrollable"
    // className={classes.paper2}
    value={this.state.value}
    onChange={this.handleTabSelect}
    indicatorColor="primary"
    textColor="primary"
    // centered
    >
    
    <Tab className={classes.tabElement} label={<h1 className={classes.tabLabel}>Tools</h1>} />
    <Tab className={classes.tabElement} label={<h1 className={classes.tabLabel}>Rentals</h1>} />
</Tabs>

</div> */}