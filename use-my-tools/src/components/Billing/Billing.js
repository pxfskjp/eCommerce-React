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


  basicToken = token => {
    let bodyToSend = {
      ...token,
      subscription: {
        plan: 'plan_EXEVzE4nraOpql',   // corresponds to Basic Monthly plan ID from Stripe Dashboard
      },
    }
    this.addSubscription(bodyToSend)
  }

  enterpriseToken = token => {
    let bodyToSend = {
      ...token,
      subscription: {
        plan: 'plan_EjRPESTVxfVWQs',   // corresponds to Enterprise Monthly plan ID from Stripe Dashboard
      },
    }
    this.addSubscription(bodyToSend)
  }

  addSubscription = body => {  
    // addSub endpoint will do the following:
    // - check if sub for user already exists in webchat db, if no existing sub:
    // -- create Stripe customer with stripe.customers.create
    // -- create Stripe subscription with stripe.subscription.create, using the newly created customer
    // -- insert subscription into subscriptions table in webchat db
    axios
      .post(`/api/billing/addSub`, body)  
      .then(response => {    
        console.log('Subscription created with response: ', response);
        this.setState({ isSubscribed: true });
      })
      .catch(error => {
        console.log('Error from addSub: ', error)
      })
  }

  render() {

    const subscriptionTiers = [
      {
        title: 'Basic',
        price: '30',
        description: ['10 users'],
        value: 'a',
        token: this.basicToken,        // Corresponds to token definition above
      },
      {
        title: 'Enterprise',
        price: '50',
        description: ['30 users'],
        value: 'b',
        token: this.enterpriseToken,   // Corresponds to token definition above
      }
    ]

    const isSubscribed = this.state.isSubscribed;
    const subStatus = this.state.subStatus;

    return (
        <div>
        {isSubscribed ? (
            <div>
            <h1>Your company has already subscribed</h1>
            {subStatus !== 'active' ? ( 
                <h1>Your subscription status is not active.</h1>
                ) : ( ''
            )}
            </div>
        ) : (
        <BillingContainer>
            <PaymentContainer>
            <h1 className="title-wide">Our Subscription Options</h1>
            <h1 className="title-thin">Our</h1>
            <h1 className="title-thin">Subscription</h1>
            <h1 className="title-thin">Options</h1>
            <Grid container spacing={40} alignItems="flex-end">
                {subscriptionTiers.map(tier => (
                <Grid
                    item
                    key={tier.title}
                    xs={12}
                    sm={tier.title === 'Enterprise' ? 12 : 6}
                    md={4}
                >
                    <Card className="card" align="center">
                    <CardHeader
                        title={tier.title}
                        // subheader={tier.subheader} no subheaders defined
                        titleTypographyProps={{ align: 'center', variant: 'h3' }}
                        subheaderTypographyProps={{ align: 'center' }}
                    />
                    <CardContent>
                        <div className={styles.cardPricing}>
                        <Typography
                            align="center"
                            // component="h2"
                            variant="h3"
                            color="textPrimary"
                        >
                            ${tier.price}
                        </Typography>
                        <Typography
                            align="center"
                            variant="h5"
                            color="textSecondary"
                        >
                            monthly
                        </Typography>
                        </div>
                        {tier.description.map(line => (
                        <Typography variant="h6" align="center" key={line}>
                            {line}
                        </Typography>
                        ))}
                        <PaymentButton>
                        <StripeCheckout
                            label="BUY"
                            panelLabel="SUBSCRIBE"
                            token={tier.token}
                            stripeKey="pk_test_rY8prrYy1Hij91qrNdI5zpYu"
                            name={tier.title}
                            description={tier.description}
                            amount={tier.price * 100}
                            allowRememberMe={false}
                        />
                        </PaymentButton>
                    </CardContent>
                    </Card>
                </Grid>
                ))}
            </Grid>
            </PaymentContainer>
        </BillingContainer>
        )}
        </div>
    )
  }
}

//export default Billing;

BillingBase.propTypes = {
  classes: PropTypes.object.isRequired
};

const Billing = withStyles(styles)(withRouter(withFirebase(BillingBase)));

export default Billing;

