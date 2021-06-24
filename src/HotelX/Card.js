import React,{useState,useEffect} from 'react'
import "./style/card.css"
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
    return (
        <div >
            
                {dish.map(x=>(
                    <div className="flip-card">
                    <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical" >
                    <div>
                      {x.email}
                      <button onClick={handleClick}>Click to flip</button>
                    </div>
            
                    <div>
                        {x.name}
                      <button onClick={handleClick}>Click to flip</button>
                    </div>
                  </ReactCardFlip>
                  </div>
                ))}
            
            
           
            </div>

    )
}

export default Card