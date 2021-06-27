import React from "react";
import { Link, Redirect,useHistory } from "react-router-dom";
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
import "./styles/Navbar.css";
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';
import firebase from "firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { user } from "./Auth";
const auth = firebase.auth();
function SignOut() {
    const [user] = useAuthState(auth);
   
    
    return (
        auth.currentUser && (
            <div>
                <span className="sign-out" onClick={() => auth.signOut()}>
                    Sign Out
                </span>
                <span className="mx-3"></span>
            </div>
        )
    );
}
function NavBar() {
 
    const [user] = useAuthState(auth);
    return (
        <div className="Nav" className="n1">
            <img src="/logo.jpg" className="_logo" />
            <Nav className="mr-auto" className="n">
                <Nav.Link href="/" className="n2">
                    Home
                </Nav.Link>
                <Nav.Link href="#features" className="n2">
                    Features
                </Nav.Link>
                <Nav.Link href="/menu" className="n2">
                    Menu
                </Nav.Link>
                <Nav.Link href="/login" className="n2">
                    {user ? <SignOut /> : <span>login</span>}
                </Nav.Link>
                <Nav.Link href="/login" className="n2">
                    {user ? <div> welcome {user.displayName}</div>: <span></span>}

                </Nav.Link>
                <div className="_navIcon">
                <span className="_navIcons"><InstagramIcon style={{color: "#7b877c",size:.5}}/></span>
                <span className="_navIcons"><FacebookIcon style={{color: "#7b877c",size:.5}}/></span>
                </div>
               
            </Nav>
            
        </div>
    );
}

export default NavBar;
