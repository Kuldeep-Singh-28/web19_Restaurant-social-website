import React,{useState} from 'react'
import db ,{storage}from "./firebase"
import firebase from "firebase"
import "./styles/admin.css"
import {Form,Button} from "react-bootstrap"
function Admin() {
    const [name,setName]  =useState("")
    const [image,setImage] = useState("")
    const [price,setPrice] = useState("")
    const [type,setType] =useState("")
    const[email,setEmail] = useState("")
    const[id,setId] = useState("")
   const[url,setUrl] = useState("")
    const onImageChange = (e) => {
        const reader = new FileReader();
        let file = e.target.files[0]; // get the supplied file
        // if there is a file, set image to that file
        if (file) {
          reader.onload = () => {
            if (reader.readyState === 2) {
              console.log(file);
              setImage(file);
            }
          };
          reader.readAsDataURL(e.target.files[0]);
        // if there is no file, set image back to null
        } else {
          setImage(null);
        }
      };
      const uploadToFirebase = async() => {
        //1.
        if (image) {
          //2.
          const storageRef = storage.ref(`images/${type}`);
          //3.
          const imageRef = storageRef.child(name);
          //4.
          imageRef.put(image)
         //5.
         .then(() => {
            alert("Image uploaded successfully to Firebase.");
        });
       await imageRef.getDownloadURL()
        .then((url) => {
            setUrl(url);
          })
        } else {
          alert("Please upload an image first.");
        }
      };
const submit=async(e)=>{
    e.preventDefault();
   await uploadToFirebase();
    db.collection("dishes").doc("dish").collection(type).add({
        name:name,
        price:price,
        url:url
    })
   
}
const submit1=e=>{
    db.collection("Admin").add({
        email:email,
        id:id
    })
    setType("")
    setName("")
    setPrice("")
    setImage("")
}
    return (
        <div className="_admin">
            <Form>
            <Form.Group controlId="formBasicPassword">
    <Form.Label>Type</Form.Label>
    <Form.Control type="text" placeholder="Type"  onChange={(e) => setType(e.target.value)}/>
  </Form.Group>
  <Form.Group controlId="formBasicEmail">
    <Form.Label>Name</Form.Label>
    <Form.Control type="text" placeholder="Enter name" onChange={(e) => setName(e.target.value)} />
  </Form.Group>

  <Form.Group controlId="formBasicPassword">
    <Form.Label>Price</Form.Label>
    <Form.Control type="text" placeholder="Price"  onChange={(e) => setPrice(e.target.value)}/>
  </Form.Group>
  <Form.Group controlId="formBasicPassword">
    <Form.Label>PhotoUrl</Form.Label>
    <input type="file" accept="image/x-png,image/jpeg" onChange={(e) => {onImageChange(e); }}/>
  </Form.Group>
  <Form.Group controlId="formBasicCheckbox">
  </Form.Group>
  <Button variant="primary" type="submit" onClick={e=>submit(e)}>
    Submit
  </Button>
</Form>
<Form>
  <Form.Group controlId="formBasicEmail">
    <Form.Label>Email</Form.Label>
    <Form.Control type="email" placeholder="Enter email"  onChange={(e) => setEmail(e.target.value)}/>
    <Form.Text className="text-muted">
      give permission to make admin
    </Form.Text>
    <Form.Group controlId="formBasicPassword">
    <Form.Label>Id</Form.Label>
    <Form.Control type="text" placeholder="Id"  onChange={(e) => setId(e.target.value)}/>
  </Form.Group>
  </Form.Group>

  
    <Form.Check type="checkbox" label="Check me out" />

  <Button variant="primary" type="submit" onChange={(e) =>submit1(e)}>
    Submit
  </Button>
</Form>
        </div>
    )
}

export default Admin
