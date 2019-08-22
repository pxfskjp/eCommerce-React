import React, { Component } from 'react';
import { withRouter, Link } from "react-router-dom"
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

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

});

const ToolCard = props => {
    const { classes, tool } = props;
    return (

            <Card className={classes.card}>
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

    )
};

export default withRouter(withStyles(styles)(ToolCard));