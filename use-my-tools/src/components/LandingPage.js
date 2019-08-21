import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import ManUsingDrill from '../assets/images/Man-using-drill.jpeg';
import ToolsOnWall from '../assets/images/Wrenches-on-wall.jpeg';

import './css/LandingPage.css';

class LandingPage extends Component {
    // constructor(props) {
    //     super(props);
    // }

    render() {
        return (
            <div className="landingpage">

                <div className="nav-bar">
                    <div className="link-container">
                        <Link to="/register" className="nav-link">
                            Sign Up
                        </Link>
                        {/* <br/> */}

                        <Link to="/login" className="nav-link">
                            Sign In
                        </Link>
                    </div>
                </div>

                <section className="welcome-section">
                    <div className="welcome-text-container">
                        <h1 className="title-text">
                            Better than buying expensive tools
                        </h1>
                        <h2 className="subtitle-text">
                            Rent tools from owners near you
                        </h2>
                        <Link to="/register" className="signup-button">
                            <button>
                                Get Started
                            </button>
                        </Link>
                    </div>
                </section>

                <section className="intro-section" >
                    <div className="intro-row">
                        <div className="intro-image-container">
                            <img
                                className="intro-image"
                                src={ManUsingDrill}
                                alt="man-using-drill"
                            />
                        </div>
                        <div className="intro-text-container">
                            <h3>
                                Need to make some home repairs or start a DIY project but don't have all the tools?
                            </h3>

                            <h3>
                                Find trusted owners near you and rent their tools for a fraction of the cost.
                            </h3>
                        </div>
                    </div>

                    <div className="intro-row  image-right">
                        <div className="intro-image-container">
                            <img
                                className="intro-image image-right"
                                src={ToolsOnWall}
                                alt="man-using-drill"
                            />
                        </div>
                        <div className="intro-text-container">
                            <h3>
                                Have extra tools in our workshop that aren't being used?
                            </h3>

                            <h3>
                                List your tools on Use My Tools and start making money by renting them to people near you.
                            </h3>
                        </div>
                        
                    </div>
                </section>
            </div>
        );
    }
}

export default withRouter(LandingPage);