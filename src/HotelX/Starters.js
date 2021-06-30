import React,{ useState,useEffect} from 'react'
import {storage} from './firebase'
import "./styles/starters.css"
function Starters() {
    const[files,setFiles]= useState([]);
    useEffect(() => {
        var storageRef = storage.ref("images");
        const fetchImages = async () => {
            
        let result = await storageRef.child('Starters').listAll();
            let urlPromises = result.items.map(imageRef => imageRef.getDownloadURL());
        
            return Promise.all(urlPromises);
    
        }
        
        const loadImages = async () => {
            const urls = await fetchImages();
            setFiles(urls);
        }
        loadImages();
        }, []);
        
    return (
        <div className="_starters">
            {files.map((x)=>{
                <img src={x} style={{filter:'none' ,height:"100px"}}/>
            })}
            <img src={files[0]} style={{filter:'none'}}/>
        </div>
    )
}

export default Starters
