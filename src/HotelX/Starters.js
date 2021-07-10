import React,{ useState,useEffect} from 'react'
import db ,{storage} from './firebase'
import "./styles/starters.css"
import firebase from "firebase"
import { useAuthState } from "react-firebase-hooks/auth";
import {Card,Typography} from "@material-ui/core"
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
const auth = firebase.auth();
function Starters() {
    
    const [user] = useAuthState(auth);
    const[files,setFiles]= useState([]);
    //const starter = db.collection("dishes").doc("dish").collection("starters");
    // useEffect(() => {
    //     var storageRef = storage.ref("images");
    //     const fetchImages = async () => {
            
    //     let result = await storageRef.child('Starters').listAll();
    //         let urlPromises = result.items.map(imageRef => imageRef.getDownloadURL());
        
    //         return Promise.all(urlPromises);
    
    //     }
        
    //     const loadImages = async () => {
    //         const urls = await fetchImages();
    //         setFiles(urls)
    //     }
    //     loadImages();
    //     }, []);
    //     const addToCart= (e,index)=>{
    //             console.log(index)
    //             db.collection("users").doc(user.uid).collection("My-cart").add({
    //                 photo:files[index],

    //             })

    //     }
    return (
        <div className="_starters">
    x         
        </div>
    )
}

export default Starters
