import React, { useState, useEffect } from "react";
import db, { storage } from "./firebase";
import "./styles/starters.module.css";
import firebase from "firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Card, Typography } from "@material-ui/core";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import EditRoundedIcon from '@material-ui/icons/EditRounded';
const auth = firebase.auth();
function Starters() {
    const [user] = useAuthState(auth);
    const [photos, setPhotos] = useState([]);
    const [quantity,setQuantity] = useState([]);
    const [isAdmin, setisAdmin] = useState(false);
    const[newPrice,setNewPrice] = useState();
    const [newName,setNewName] = useState();
    const[newUrl,setNewUrl] = useState();
    const[image,setImage] =useState();
    useEffect(async () => {
        if (user) {
            db.collection("Admin")
                .get()
                .then((snap) => {
                    snap.docs.forEach((doc) => {
                        //console.log(user.id)
                        if (doc.data().id == user.uid) {
                            setisAdmin(true);
                        }
                    });
                });
        } else {
            setisAdmin(false);
        }
    }, [user]);
    useEffect(() => {
        db.collection("dishes")
            .doc("dish")
            .collection("Starters")
            .onSnapshot(snapshot => {
                setPhotos(snapshot.docs);
                setQuantity(snapshot.docs.map((doc)=> doc.data().quantity));
            });
    }, []);
    // ===========================================

    const addToCart = async(e, index, item, quantity) => {
        console.log(index);
        const itemRef = db.collection("users").doc(user.uid).collection("My-cart");
        let doc =  await  itemRef.where("name","==" , item.data().name).get().then(docu => {
        //   docu.docs.map(d => console.log(d.id))
          if(docu.docs.length !== 0) return docu.docs[docu.docs.length - 1].id;
          else return null;
        });
      
        console.log(doc)
        if(!doc)
       { db.collection("users")
            .doc(user.uid)
            .collection("My-cart")
            .add({
                price: Number(item.data().price),
                name: item.data().name,
                quantity: quantity,
            });}
            else{
                itemRef.doc(doc).update({
                    quantity:quantity
                })
            }
    };

    const handleQuantityDecrease=(index) =>{
        console.log(index)
        const newQ =[...quantity]; if(newQ[index]>0){newQ[index] --} ; setQuantity(newQ)
    }
    const handleQuantityIncrease=(index) =>{
        const newQ =[...quantity]; if(newQ[index]<10){newQ[index] ++} ; setQuantity(newQ)
    }
    //console.log(quantity[0]);
    const onImageChange = (e) => {
        
        const reader = new FileReader();
        let file = e.target.files[0];
        if (file) {
            reader.onload = () => {
                if (reader.readyState === 2) {
                    console.log(file);
                    setImage(file);
                }
            };
            reader.readAsDataURL(e.target.files[0]);
        } else {
            setImage(null); // if there is no file, set image back to null
        }
    };
  

    const edit = e=>{   
        const doc = db.collection("dishes").doc("dish").collection("Starters").doc(e.id)

        if(newName && newPrice){ doc.update({
            price:newPrice,
            name:newName,
        })}
        else if(newName){ doc.update({
            name:newName,
        })}
        else if(newPrice){ doc.update({
            price:newPrice,
        })}
    }
    const edit1 = e=>{   
        const doc = db.collection("dishes").doc("dish").collection("Starters").doc(e.id)
           if (image) {
               const storageRef = storage.ref(`images/Starters`);
               const uploadTask = storageRef.child(e.data().name).put(image);
   
               uploadTask.on(
                   "state_changed",
                   (snapshot) => {
                       const progress =
                           (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                       console.log("Upload is " + progress + "% done");
                   },
                   (error) => {
                       // Handle unsuccessful uploads
                       console.log("error:-", error);
                   },
                   () => {
                       uploadTask.snapshot.ref
                           .getDownloadURL()
                           .then((downloadURL) => {
                               console.log("File available at", downloadURL);                                     
                                    doc.update({
                                        url:downloadURL,
                                    })  
                                       .then(() => {
                                           console.log(
                                               "Document successfully written!"
                                           );
                                       })
                                       .catch((error) => {
                                           console.error(
                                               "Error writing document: ",
                                               error
                                           );
                                       });
                               
                           });
                   }
               );
           
       };
    }
    return (
        <div className="_starters">
            {photos.map((item, index) => (
                <Card key={index} className="_box col-sm-12 ">
                    <img
                        src={item.data().url}
                        className=" _imgS"
                        style={{
                            filter: "none",
                            height: "30vh",
                            width: "30vh",
                        }}
                    />
                    <Typography variant="h5" component="h2" className="_typo">
                        How are you ?{item.data().name}
                        {item.data().price}
                        <button onClick={() => handleQuantityDecrease(index)}>-</button>
                        {quantity[index]}
                        <button onClick={() => handleQuantityIncrease(index)}>
                            +
                        </button>
                    </Typography>
                    <AddShoppingCartIcon
                        style={{ color: "#7b877c", size: 0.5 }}
                        className="_cart"
                        onClick={(e) =>
                            addToCart(e, index, item, quantity[index])
                        }
                    />
                    
                    {isAdmin &&   <div>
                        <input type="file" onChange={(e)=> onImageChange(e)} placeholder="NewPrice"  /><EditRoundedIcon onClick={() => edit1(item) }/>
                        <input type="text" onChange={(e)=> setNewName(e.target.value)} placeholder="NewName"  />
                <input type="number" onChange={(e)=> setNewPrice(e.target.value)} placeholder="NewPrice"  /><EditRoundedIcon onClick={() => edit(item) }/>
            </div>}
                </Card>
            ))}
        </div>
    );
}

export default Starters;
