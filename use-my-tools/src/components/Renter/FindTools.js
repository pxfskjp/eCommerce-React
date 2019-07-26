import React, { Component } from 'react';
import { withRouter, Link } from "react-router-dom"
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import FilterMenu from './FilterMenu';

import './css/FindTools.css';

import axios from 'axios';

const styles = theme => ({
    gridContainer: {

    },
    card: {
        height: "100%",
        width: "100%",
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
    }

})

class FindTools extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tools: [],
            maxPrice: 100,
            keywords: []
        };
    }

    componentDidMount() {
        // Get available tools in the renter's city:
        const criteria = { city: 'renter' };
        axios.post('/api/tools/findtools', criteria)
            .then(tools => {
                this.setState({
                    tools: tools.data
                }, () => console.log('FindTools state.tools after GET /findtools: ', this.state.tools)) ;
            })
            .catch(error => {
                console.log(error.message);
            })
    }

    // openToolView = event => {

    // }

    updateFilter = (name, value) => {
        // if updating the keywords filter with a search string, 
        // split the string and put each word into the state.keywords array:
        if (name === 'searchString') {
            let keywords = [];
            let searchString = value;
            // Return if searchString is null:
            if (!searchString) {
                return;
            }
            // If searchString is not null,
            // split searchString into words 
            // and push each word in lowerCase into state.keywords array:
            for (let word of searchString.split(' ')) {
                keywords.push(word.toLowerCase());
            }
            // console.log(keywords);
            this.setState({ keywords }) 
        }
        this.setState({ [name]: value });
    }

    render() {
        const { classes } = this.props;
        const { tools, maxPrice, keywords } = this.state;

        const filteredTools = tools.filter(tool => 
            tool.price <= maxPrice 
            && (
                keywords.length === 0
                || tool.brand.split(' ').some(word => keywords.indexOf(word.toLowerCase()) >=0)
                || tool.name.split(' ').some(word => keywords.indexOf(word.toLowerCase()) >= 0)
                || tool.description.split(' ').some(word => keywords.indexOf(word.toLowerCase()) >= 0)
            )
        );

        return (
            <div className="page-container">
                <h1>Showing Tools in Your City:</h1>

                <div className="main-container">

                    <div className="filter-menu-container">
                        <FilterMenu updateFilter={this.updateFilter} />
                    </div>

                    <div className="tools-list-container">

                        <Grid container spacing={40} className="tools-grid">

                            {filteredTools.map((tool, index) =>  {
                                return (
                                    <Grid item key={index} className="grid-item">
                                        <Card className={classes.card}>
                                            {/* <ImageCarousel toolImages={tool.images} /> */}
                                            <img src={tool.images[0].url} alt="tool" />
                                            <CardContent className={classes.cardContent}>
                                                <Typography gutterBottom className={classes.cardTitle} >
                                                    {tool.brand}{' '}{tool.name}
                                                </Typography>
                                                <Typography>
                                                    ${tool.price} / day
                                                </Typography>
                                            </CardContent>
                                            <CardActions className={classes.cardActions}>
                                                <Button
                                                    className="details-button"
                                                    component={Link}
                                                    to={`/toolviewrenter/${tool.id}`}
                                                    size="small"
                                                    color="primary"
                                                >
                                                    See Details
                                                </Button>
                                            </CardActions>
                                        </Card>
                                    </Grid>
                                );
                            })}

                        </Grid>
                            
                    </div>
                </div>
            </div>

        );
    }
}

export default withRouter(withStyles(styles)(FindTools));