import React, { Component } from 'react';
import { withRouter, Link } from "react-router-dom"
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import ToolCard from '../ToolCard';

import './css/MyTools.css';

import axios from 'axios';

const styles = theme => ({
    card: {
        height: "100%",
        display: "flex",
        flexDirection: "column"
    },
    cardContent: {
        // flexGrow: 1,
        maxHeight: 100,
        // minHeight: 100,
        overflow: "hidden",
        textAlign: "left"
    },
    cardActions: {
        flexGrow: 1,
        alignItems: "flex-end"
    },
    cardTitle: {
        fontWeight: "bold"
    },
    gridItem: {
        width: "24%"
    }

})

class MyTools extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tools: []
        };
    }

    componentDidMount() {
        axios.get('/api/tools/mytools')
            .then(tools => {
                this.setState({
                    tools: tools.data
                }, () => console.log('ToolsOwned state.tools after GET tools: ', this.state.tools)) ;
            })
            .catch(error => {
                console.log(error.message);
            })
    }

    render() {
        const { classes } = this.props;

        return (
            <div className="mytools-page-container">
                {/* <h1>Manage your tools</h1> */}

                <div className="tools-list-container">

                    <Grid container spacing={40}>

                        {this.state.tools.map((tool, index) => {
                            return (
                                <Grid item key={index} className={classes.gridItem}>
                                    <ToolCard tool={tool} userType={'renter'} />
                                </Grid>
                            );
                        })}

                    </Grid>

                </div>
            </div>

        );
    }
}

export default withRouter(withStyles(styles)(MyTools));