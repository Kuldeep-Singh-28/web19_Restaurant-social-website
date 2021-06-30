import React from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
import "./styles/Navbar.css";
import InstagramIcon from "@material-ui/icons/Instagram";
import FacebookIcon from "@material-ui/icons/Facebook";
import firebase from "firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { user } from "./Auth";
const auth = firebase.auth();

//===================================
function SignOut() {
    const [user] = useAuthState(auth);
    return (
        auth.currentUser && (
            <div>
                <span className="sign-out" onClick={() => auth.signOut()}>
                    SIGN OUT
                </span>
            </div>
        )
    );
}
//=====================================

function NavBar() {
    const [user] = useAuthState(auth);
    return (
        <Navbar fixed="top" expand="lg" className="navbar2">
            <Navbar.Brand href="/">
                <img src="/newLogo.png" className="_logo" />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="n" style={{ alignItems: `center` }}>
                    <Nav.Link href="/" className="n2">
                        HOME
                    </Nav.Link>
                    <Nav.Link href="/menu" className="n2">
                        MENU
                    </Nav.Link>
                    <Nav.Link href="/login" className="n2" id="left">
                        {user ? <SignOut /> : <span>LOGIN</span>}
                    </Nav.Link>
                    <Nav.Link href="/login" className="n2" id="right">
                        {user ? (
                            <div> WELCOME {user.displayName}</div>
                        ) : (
                            <span></span>
                        )}
                    </Nav.Link>
                    <div className="_navIcon">
                        <span className="_navIcons">
                            <InstagramIcon
                                style={{ color: "#7b877c", size: 0.5 }}
                            />
                        </span>
                        <span className="_navIcons">
                            <FacebookIcon
                                style={{ color: "#7b877c", size: 0.5 }}
                            />
                        </span>
                    </div>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default NavBar;
