import React from 'react'
import { withFirebase } from "../Firebase";
import { withRouter } from "react-router-dom"

import StripeCheckout from 'react-stripe-checkout';
import { withStyles } from "@material-ui/core/styles";
import styled from 'styled-components'

import PropTypes from "prop-types";

import axios from 'axios'

import {
  Grid,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from '@material-ui/core'

const BillingContainer = styled.div`
  
`
const PaymentContainer = styled.div`
  margin: 100px auto 100px auto;

  max-width: 800px;
  /* width: 70%; */
  display: flex;
  flex-direction: column;

  h1 {
    margin: 0 auto;
    margin-bottom: 60px;
    color: white;
  }
  .title-thin {
    display: none;
  }
  @media (max-width: 600px) {
    margin: 50px auto;

    .title-thin {
      display: block;
      margin: 0 auto;

      &:last-of-type {
        margin-bottom: 40px;
      }
    }
    .title-wide {
      display: none;
    }
  }

  .card {
    box-shadow: 0 0 5px 5px rgb(230, 230, 230);
    border-radius: 0;
    /* background: linear-gradient(to right, rgb(82, 157, 248), rgb(66, 126, 199)); */
  }

  .MuiCardHeader-root-262 {
    padding-bottom: 0;
  }
`

const PaymentButton = styled.div`
  margin: auto;
  margin-top 5%;
  width: 40%;
  display: flex;
  flex-direction: column;
`

const styles = theme => ({
  cardPricing: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: theme.spacing.unit * 2,
  },
  cardActions: {
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing.unit * 2,
    },
  },
})

class BillingBase extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isSubscribed: false,
            plan: null,
            subStatus: null
        }
    }

    componentDidMount() {
 
        this.props.firebase.auth.onAuthStateChanged(user => {
            if (user) {

            this.props.firebase.auth.currentUser.getIdToken()
            .then(idToken => {

                console.log("idToken after in Admin panel: ", idToken);
                axios.defaults.headers.common['Authorization'] = idToken;
                
                const id = this.props.company_id;
                axios.get(`/api/billing/getSub`)
                .then(response => {
                    console.log('response from Billing getSub: ', response);
                    if (response.data) {   // if max_reps on subscription is greater than current team size
                        this.setState({ 
                            isSubscribed: true,
                            plan: response.data.stripe_plan_nickname,
                            subStatus: response.data.stripe_subscription_status
                        }, () => console.log('Billing state after getSub: ', this.state));
                    } else {
                        this.setState({ 
                            isSubscribed: false,
                            plan: 'Free',
                            subStatus: 'active'
                        }, () => console.log('Billing state after getSub: ', this.state));
                    }
                })
                .catch(error => {
                    this.setState({ error: error.message });
                })
            })	
            .catch(error => {            // if Firebase getIdToken throws an error
                    console.log(error.message);
                        //this.setState({ error:error });
                })
            }	
            else {
                this.props.history.push('/repslogin');
            }
        }); 
    };


//   basicToken = token => {
//     let bodyToSend = {
//       ...token,
//       subscription: {
//         plan: 'plan_EXEVzE4nraOpql',   // corresponds to Basic Monthly plan ID from Stripe Dashboard
//       },
//     }
//     this.addSubscription(bodyToSend)
//   }

    render() {

        return (
            <div>
                <StripeCheckout
                    label="Submit"
                    panelLabel="Submit"
                    token={this.onToken}
                    stripeKey="pk_test_DOERzwvaYYRIUJAJbesVuSJ300Edj6qqZ0"
                    // name={tier.title}
                    // description={tier.description}
                    // amount={tier.price * 100}
                    // allowRememberMe={false}
                />
            </div>
        )
    }
}

BillingBase.propTypes = {
    classes: PropTypes.object.isRequired
};

const Billing = withStyles(styles)(withRouter(withFirebase(BillingBase)));

export default Billing;

{/* <BillingContainer>
    <PaymentContainer>
    <h1 className="title-wide">Our Subscription Options</h1>
    <h1 className="title-thin">Our</h1>
    <h1 className="title-thin">Subscription</h1>
    <h1 className="title-thin">Options</h1>
    
            <Card className="card" align="center">
            <CardHeader
                title='Enter credit card details'
                // subheader={tier.subheader} no subheaders defined
                titleTypographyProps={{ align: 'center', variant: 'h3' }}
                subheaderTypographyProps={{ align: 'center' }}
            />
            <CardContent>
                
                <PaymentButton>
                <StripeCheckout
                    label="Submit"
                    panelLabel="Update"
                    // token={tier.token}
                    // stripeKey="pk_test_rY8prrYy1Hij91qrNdI5zpYu"
                    // name={tier.title}
                    // description={tier.description}
                    // amount={tier.price * 100}
                    // allowRememberMe={false}
                />
                </PaymentButton>
            </CardContent>
            </Card>
    </PaymentContainer>
</BillingContainer> */}