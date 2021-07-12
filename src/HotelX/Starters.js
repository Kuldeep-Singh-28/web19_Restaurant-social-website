import React, { useState, useEffect } from "react";
import db, { storage } from "./firebase";
import "./styles/starters.css";
import firebase from "firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Card, Typography } from "@material-ui/core";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
const auth = firebase.auth();
function Starters() {
    const [user] = useAuthState(auth);
<<<<<<< HEAD
    const[photos,setPhotos]= useState([]);
=======
    const [photos, setPhotos] = useState([]);
>>>>>>> 275abdc4ccd8d697b4ec20b79a7f9207fcd3d6ec

    useEffect(() => {
        db.collection("dishes")
            .doc("dish")
            .collection("Starters")
            .onSnapshot((snapshot) => {
                setPhotos(snapshot.docs.map((doc) => doc.data()));
            });
    }, []);
    const addToCart = (e, index, item) => {
        console.log(index);
        db.collection("users").doc(user.uid).collection("My-cart").add({
            price: item.price,
            name: item.name,
        });
    };

    console.log(photos);
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
                    </Typography>
                    <AddShoppingCartIcon
                        style={{ color: "#7b877c", size: 0.5 }}
                        className="_cart"
                        onClick={(e) => addToCart(e, index, item)}
                    />
                </Card>
            ))}
        </div>
    );
}
<<<<<<< HEAD

=======
>>>>>>> 275abdc4ccd8d697b4ec20b79a7f9207fcd3d6ec

export default Starters;
