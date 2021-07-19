import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import axios from "axios"
import React, { useState } from 'react'
import  Styles from "./styles/stripe.module.css"

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

export default function PaymentForm() {
    const [success, setSuccess ] = useState(false)
    const stripe = useStripe()
    const elements = useElements()


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
                amount: 1000,
                id
            })

            if(response.data.success) {
                console.log("Successful payment")
                setSuccess(true)
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
        <form onSubmit={handleSubmit}>
            <div className={Styles.FormGroup}>
                <div className={Styles.FormRow}>
                    <CardElement options={cardStyle}/>
                </div>
            </div>
            <button>Pay</button>
        </form>
        :
       <div>
           <h2>You just bought a sweet spatula congrats this is the best decision of you're life</h2>
       </div> 
        }
            
        </div>
    )
}