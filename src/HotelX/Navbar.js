import React from 'react'
import {Link} from 'react-router-dom'
import "./styles/Navbar.css"
function Navbar() {
    return (
        <div>
    <div className="navbar">
            <div><Link to="menu" className="navbar_link">menu</Link> </div>
            <div> <Link to="login" className="navbar_link"> LOGIN</Link></div>
            <div><Link to="contact" className="navbar_link">contact</Link> </div>
            <div><Link to="about" className="navbar_link">ABOUT</Link></div>
            
        </div>            
        </div>
    )

    
}

export default Navbar
