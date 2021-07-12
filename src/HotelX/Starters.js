import React, { useState, useEffect } from "react";
import db, { storage } from "./firebase";
import "./styles/starters.module.css";
import firebase from "firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Card, Typography } from "@material-ui/core";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
const auth = firebase.auth();
function Starters() {
    const [user] = useAuthState(auth);
    const [photos, setPhotos] = useState([]);
    const [quantity,setQuantity] = useState([]);

    useEffect(() => {
        db.collection("dishes")
            .doc("dish")
            .collection("Starters")
            .onSnapshot((snapshot) => {
                setPhotos(snapshot.docs.map((doc) => doc.data()));
                setQuantity(snapshot.docs.map((doc)=> doc.data().quantity));
            });
    }, []);
    const addToCart = (e, index, item,quantity) => {
        console.log(index);
        
         db.collection("users").doc(user.uid).collection("My-cart").add({
             price: item.price,
             name: item.name,
             quantity: quantity
        });
    };

    const handleQuantityDecrease=(index) =>{
        console.log(index)
        const newQ =[...quantity]; if(newQ[index]>0){newQ[index] --} ; setQuantity(newQ)
    }
    const handleQuantityIncrease=(index) =>{
        const newQ =[...quantity]; if(newQ[index]<10){newQ[index] ++} ; setQuantity(newQ)
    }
    console.log(quantity[0]);
    return (
        <div className="_starters">
            {photos.map((item, index) => (
                <Card key={index} className="_box col-sm-12 ">
                    <img
                        src={item.url}
                        className=" _imgS"
                        style={{
                            filter: "none",
                            height: "30vh",
                            width: "30vh",
                        }}
                    />
                    <Typography variant="h5" component="h2" className="_typo">
                        How are you ?{item.name}
                        {item.price}
                        <button onClick={() => handleQuantityDecrease(index)}>-</button>
                        {quantity[index]}
                        <button  onClick={() => handleQuantityIncrease(index)}>+</button>
                    </Typography>
                    <AddShoppingCartIcon
                        style={{ color: "#7b877c", size: 0.5 }}
                        className="_cart"
                        onClick={(e) => addToCart(e, index, item,quantity[index])}
                    />
                </Card>
            ))}
        </div>
    );
}

export default Starters;
