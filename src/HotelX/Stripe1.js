import React from 'react'
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Checkout from './Checkout'
import "./styles/stripe.module.css"
const key = "pk_test_51JEFvSSINgwrzeuQ6l6y9KO3UIJs1kFMQ6r9K1vT5u1gp8OScXLZdS1bguBIan5TWWya533gt5ymFrsVE7WIuYob00SEVSnc8G";

const stripeTestPromise = loadStripe(key);

function Stripe1() {
  return (
    <Elements stripe={stripeTestPromise}>
      <Checkout/>
    </Elements>
  )
}

export default Stripe1
