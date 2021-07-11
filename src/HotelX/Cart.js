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
        const cart =  db.collection("users").doc(user.uid).collection("My-cart");

        cart.onSnapshot(
            snapshot => {
                setItem(snapshot.docs.map(doc => doc.data()))
            }
        )}
    },[])
    return (
        <div className="_cart">
            {item.map(i =>{
                <Typography variant="h5" component="h2" className="_typo">
                {i.name}
                {i.price}
              </Typography>
            }) }
        </div>
    )
}

export default Cart
