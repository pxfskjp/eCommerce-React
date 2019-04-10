import React, { Component } from 'react';
import { withRouter } from "react-router-dom"
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import axios from 'axios';


class AddTool extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            name: '',
            brand: '',
            description: '',
            price: null,
        };
    }

    componentDidMount() {
       // console.log('AddTool props.idToken: ', this.props.idToken);
    }

    render() {
        const error = this.state.error;
        return (
            <div className="add-tool-container">
                <h1>Add a new tool</h1>
                <MuiThemeProvider>
                    <div>
                        <p className="header">Ender details for the tool you want to post</p>

                        <form onSubmit={this.onSubmit}>
                            <TextField
                                style = {{width: '65%'}}
                                hintText="Tool Name"
                                floatingLabelText="Tool name"
                                name="name"
                                type="text"
                                required={true}
                                value={this.state.name}
                                onChange={this.onChange}
                            />
                            <br/>

                             <TextField
                                style = {{width: '65%'}}
                                hintText="Tool Brand"
                                floatingLabelText="Tool Brand"
                                name="brand"
                                type="text"
                                required={true}
                                value={this.state.brand}
                                onChange={this.onChange}
                            />
                            <br/>

                            <TextField
                                style = {{width: '65%'}}
                                hintText="Tool Description"
                                floatingLabelText="Tool Description"
                                name="description"
                                type="text"
                                required={true}
                                value={this.state.description}
                                onChange={this.onChange}
                            />
                            <br/>

                            <TextField
                                style = {{width: '65%'}}
                                hintText="Daily Rental Price"
                                floatingLabelText="Daily Rental Price (enter 0 if you want people to borrow for free)"
                                required={true}
                                name="price"
                                type="number"
                                value={this.state.price}
                                onChange={this.onChange}
                            />
                            <br/>

                            <RaisedButton
                                className="register-button"
                                label="Submit"
                                primary={true}
                                type="submit"
                                // disabled={invalidCondition}
                            />

                            {error && <p>{error.message}</p>}

                        </form>
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }
}

export default withRouter(AddTool);