import React,{useState,useEffect} from 'react'
import firebase from "firebase"
import db from "./firebase"
import {useAuthState } from "react-firebase-hooks/auth";
import { Typography } from '@material-ui/core';
import "./styles/cart.css"
const auth = firebase.auth()

function Cart() {
    const[user] =useAuthState(auth);
    const[item,setItem]=useState([])
    
    useEffect(() => {
        if(user){
            console.log(user)
        const cart =  db.collection("users").doc(user.uid).collection("My-cart");
        cart.onSnapshot(
            snapshot => {
                setItem(snapshot.docs)
            }
        )}
    },[user])

    const remove=(e,id)=>{
        console.log(id)
        const cart = db.collection("users").doc(user.uid).collection("My-cart");
        cart.doc(id).delete();
    }

    const placeorder=(e)=>{
         db.collection("orders").add({
            order:item.data()
        })
    }

    return (
        <div className="_cart">
            
            {item && item.map((i,index) =>(
                <div key={index} variant="h5" component="h2" className="_typo">
                  
                {i.data().name}---
                {i.data().price}---
                {i.data().quantity}
                <button onClick={(e) =>remove(e,i.id)}>delete</button>
              </div>
            )) }
            <input type="submit" onClick={e=>placeorder(e)}/>
        </div>
    )
}

export default Cart
