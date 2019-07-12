import React, {Component} from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Public from './components/Public';
import Protected from './components/Protected';

const RouteController = (props) => (
    <Switch>
        <Route exact path='/public' component={Public}/>
        <Route path="/protected" component={Protected} />
    </Switch>
)

export default RouteController;