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
                console.log(snapshot.docs.map(doc => doc.data().name))
                setItem(snapshot.docs.map(doc => doc.data()))
            }
        )}
    },[user])
    console.log(item)
    return (
        <div className="_cart">
            he
            {item && item.map((i,index) =>{
                <div key={index} variant="h5" component="h2" className="_typo">
                    hello
                {i.name}
                {i.price}
              </div>
            }) }
        </div>
    )
}

export default Cart
