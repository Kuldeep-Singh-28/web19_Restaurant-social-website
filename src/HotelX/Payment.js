import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import axios from "axios"
import React, { useState,useEffect } from 'react'
import firebase from "firebase";
import db from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Style from "./styles/stripe.module.css"
const auth = firebase.auth();
const cardStyle = {
  style: {
    base: {
      color: "#32325d",
      fontFamily: 'Arial, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#32325d"
      }
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a"
    }
  }
}
const key = "pk_test_51JEFvSSINgwrzeuQ6l6y9KO3UIJs1kFMQ6r9K1vT5u1gp8OScXLZdS1bguBIan5TWWya533gt5ymFrsVE7WIuYob00SEVSnc8G";

const stripeTestPromise = loadStripe(key);

function Stripe1({price,item}) {
  return (
    <Elements stripe={stripeTestPromise}>
      <PaymentForm price={price} item={item} />
    </Elements>
  )
}
function Payment() {
  const [user] = useAuthState(auth);
    const [showItem, setShowItem] = useState(false)
    const [Tprice,setPrice] = useState()
    const [item, setItem] = useState([]);
    let price=0
    useEffect(() => {
      if (user) {
          const cart = db
              .collection("users")
              .doc(user.uid)
              .collection("My-cart");
          cart.onSnapshot((snapshot) => {
            setItem(snapshot.docs);
              snapshot.docs.forEach((doc) => {
                
                price+=  Number(doc.data().price) * doc.data().quantity;
              })
              setPrice(price)
          });
          
      }
  }, [user]);
    return (
        <div className={Style.App} >
        <h1>Order Summary</h1>
        {showItem ? <Stripe1 price={Tprice} item={item} /> : <> <h3>{Tprice}</h3> 
        <button onClick={() => setShowItem(true)}>Checkout</button></>}
      </div>
    );
     
}
 function PaymentForm({price,item}) {
  const [user] = useAuthState(auth);
    const [success, setSuccess ] = useState(false)
    const stripe = useStripe()
    
    
    const [show5, setShow5] = useState(false);
    const elements = useElements()
    const handleClose5 = () => setShow5(false);
    const remove_item = (e, id) => {
      console.log(id);
      const cart = db.collection("users").doc(user.uid).collection("My-cart");
      cart.doc(id).delete();
  };
  const remove = async (e, id) => {
    // console.log(id);
    return db
        .collection("users")
        .doc(user.uid)
        .collection("My-cart")
        .get()
        .then((snapshot) => {
            snapshot.docs.forEach(async (doc) => {
                await db
                    .collection("users")
                    .doc(user.uid)
                    .collection("My-cart")
                    .doc(doc.id)
                    .delete();
            });
            return;
        });}
    const placeorder = (e) => {
      const order = [];
      // console.log(item);
      let name;
      db.collection("users")
          .doc(user.uid)
          .get()
          .then((doc) => {
              name = doc.data().name;
              item.forEach((item) => {
                  // console.log(item.data());
                  order.push(item.data());
              });

              
              db.collection("orders")
                  .add({
                      name,
                      order,
                  })
                  .then(async () => {
                      await remove();
                      handleClose5();
                  });
          });
  };


    const handleSubmit = async (e) => {
        e.preventDefault()
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement)
        })


    if(!error) {
        try {
            const {id} = paymentMethod
            const response = await axios.post("http://localhost:4000/payment", {
                amount: price*100,
                id:id
            })

            if(response.data.success) {
                console.log("Successful payment")
                setSuccess(true)
                placeorder();
            }

        } catch (error) {
            console.log("Error", error)
        }
    } else {
        console.log(error.message)
    }
}

    return (
        <div>
        {!success ? 
          <>
          <h1>Card</h1>
    
          <form id="payment-form" onSubmit={handleSubmit}>
            <label htmlFor="card">Card</label>
            <CardElement id="card" />
    
            <button type="submit">Pay</button>
          </form>
          
        </>
        :
       <div>
           <h2>You just bought a sweet spatula congrats this is the best decision of you're life</h2>
       </div> 
        }
            
        </div>
    )
}
export default Payment
