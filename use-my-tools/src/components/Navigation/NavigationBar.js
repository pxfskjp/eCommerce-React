import React from 'react';
import { withRouter } from "react-router-dom";
import NavNonAuth from './NavNonAuth';
import NavAuth from './NavAuth';

const NavigationBar = props => (
    <div>{props.authUser ? <NavAuth /> : <NavNonAuth />}</div>
);

export default withRouter(NavigationBar);