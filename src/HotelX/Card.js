import React,{useState,useEffect} from 'react'
import "./styles/card.css"
import ReactCardFlip from 'react-card-flip';
import db from './firebase'
function Card({user}) {
    console.log(user.uid);
    const [isFlipped,setIsFlipled] =useState(false);
    const[dish,setDish] =useState([]);
    useEffect(async()=>{
        const citiesRef = db.collection('users');
        const snapshot = await citiesRef.get();
        snapshot.forEach(doc => {
          setDish(dish=>[...dish, doc.data()]);
        });
        
    },[])
    
    console.log(dish)
    const handleClick =()=>{
        setIsFlipled(!isFlipped); 
    }
    const count=0;
    return (
        <div className="_card">
            
                
                    <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical" >
                    <div onClick={handleClick}>
                    <img src="/download.jpg" className="flip" ></img>
                      
                    </div>
            
                    <div onClick={handleClick}>
                        tasty
                      
                    </div>
                  </ReactCardFlip >
            </div>

    )
}

export default Card