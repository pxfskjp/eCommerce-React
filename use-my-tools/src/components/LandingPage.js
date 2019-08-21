import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import ManUsingDrill from '../assets/images/Man-using-drill.jpeg';
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
                    </div>
                </section>

                <section className="intro-section" >
                    <div className="intro-row">
                        <img
                            className="intro-image image-left"
                            src={ManUsingDrill}
                            alt="man-using-drill"
                        />
                        <div className="intro-row-text-container">
                            <h3>
                                Need to make some home repairs or start a DIY project but don't have all the tools?
                            </h3>

                            <h3>
                                Find trusted owners near you and rent the tools for a fraction of the cost.
                            </h3>
                        </div>
                    </div>
                    <h2>
                        Browse and search for available tools near you.
                    </h2>
                    <br/>
                    <h3>
                        Rent or borrow tools for a designated period of time.
                    </h3>
                    <br/>
                    <h3>
                        Have extra tools lying around? Post them for others to rent and start making money!
                    </h3>
                    <br/>
                </section>
            </div>
        );
    }
}

export default withRouter(LandingPage);