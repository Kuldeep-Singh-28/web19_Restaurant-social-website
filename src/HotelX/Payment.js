import React,{useState} from 'react'
import Stripe1  from './Stripe1';
import Style from "./styles/stripe.module.css"
function Payment() {
    const [showItem, setShowItem] = useState(false)
    return (
        <div className={Style.App} >
        <h1>The Spatula Store</h1>
        {showItem ? <Stripe1/> : <> <h3>$10.00</h3> <img src="/newLogo.png" alt="Spaluta" />
        <button onClick={() => setShowItem(true)}>Purchase Spatula</button></>}
      </div>
    );
    
}

export default Payment
