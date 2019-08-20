import React, { Component } from 'react';
import { withRouter, Link } from "react-router-dom"
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
// import ImageCarousel from '../ImageCarousel';

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
                                <Grid item xs={3} key={index}>

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
                                                to={`/toolviewowner/${tool.id}`}
                                                size="small"
                                                color="primary"
                                            >
                                                View Tool Details
                                            </Button>
                                        </CardActions>
                                    </Card>
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