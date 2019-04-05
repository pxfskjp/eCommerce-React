import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom"

import './css/LandingPage.css';

class LandingPage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="landingpage">
                <header className="nav-container">
                    <Link to="/register" className="nav-link">
                        Sign Up
                    </Link>
                    <br/>

                    <Link to="/login" className="nav-link">
                        Sign In
                    </Link>
                </header>
                <section className="welcome-section">
                    <h1 className="welcome-title">
                        Use My Tools - the best way to borrow and rent tools in your area!
                    </h1>
                </section>
            </div>
        );
    }
}

export default withRouter(LandingPage);