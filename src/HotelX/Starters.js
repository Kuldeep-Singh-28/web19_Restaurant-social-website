import React,{ useState,useEffect} from 'react'
import db ,{storage} from './firebase'
import "./styles/starters.css"
import {Card,Typography} from "@material-ui/core"
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
function Starters() {
    const[files,setFiles]= useState([]);
    const starter = db.collection("dishes").doc("dish").collection("starters");
    useEffect(() => {
        var storageRef = storage.ref("images");
        const fetchImages = async () => {
            
        let result = await storageRef.child('Starters').listAll();
            let urlPromises = result.items.map(imageRef => imageRef.getDownloadURL());
        
            return Promise.all(urlPromises);
    
        }
        
        const loadImages = async () => {
            const urls = await fetchImages();
            
         
            setFiles(urls)
        }
        loadImages();
        }, []);
        
        const addToCart=e=>{
                console.log("hello")
        }
    return (
        <div className="_starters">
            {files.map((item,index) => (
   <Card key={index} className="_box col-sm-12 ">
      <img src={ item } className=" _imgS" style={{filter: 'none',height:"30vh",width:"30vh"}} />
      <Typography variant="h5" component="h2" className="_typo">
            How are you ?
            
          </Typography>
          <AddShoppingCartIcon style={{ color: "#7b877c", size: 0.5 }} className="_cart" onClick={addToCart}/>
   </Card>
))}
            
        </div>
    )
}

export default Starters
