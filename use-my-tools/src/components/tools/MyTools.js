import React, { Component } from 'react';
import { withRouter } from "react-router-dom"
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ImageCarousel from './ImageCarousel';

import axios from 'axios';

const styles = theme => ({
    card: {
        height: "100%",
        display: "flex",
        flexDirection: "column"
    },
    cardContent: {
        flexGrow: 1,
        maxHeight: 100,
        minHeight: 100,
        overflow: "hidden"
    },

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
                <h1>Manage your tools</h1>

                <div className="tools-list-container">

                    <Grid container spacing={40}>

                        {this.state.tools.map((tool, index) => {
                            return (
                                <Grid item key={index}>
                                    <Card className={classes.card}>
                                        <ImageCarousel toolImages={tool.images} />
                                        <CardContent className={classes.cardContent}>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                {tool.brand}{' '}{tool.name}
                                            </Typography>
                                            <Typography>
                                                {tool.description}
                                            </Typography>
                                        </CardContent>
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