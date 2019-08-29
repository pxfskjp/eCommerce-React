import React from 'react'
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';

const STRIPE_PUBLISHABLE_KEY = 'pk_test_DOERzwvaYYRIUJAJbesVuSJ300Edj6qqZ0'
const CURRENCY = 'USD';


const successPayment = data => {
  alert('Payment Successful');
  console.log(data);
};

const errorPayment = data => {
  alert('Payment Error');
  console.log(data);
};

const onToken = (amount, description, rentalId, goToRentalView) => token => {
  axios.post('/api/rentals/rentalpayment',
    {
      description,
      source: token.id,
      currency: CURRENCY,
      amount: amount,
      rentalId: rentalId
    })
    .then(response => {
      goToRentalView();
    })
    .catch(errorPayment);
};

const Checkout = ({ name, description, amount, rentalId, goToRentalView}) => (
  <StripeCheckout
    name={name}
    description={description}
    amount={amount}
    token={onToken(amount, description, rentalId, goToRentalView)}
    currency={CURRENCY}
    stripeKey={STRIPE_PUBLISHABLE_KEY}
  />
);

export default Checkout;