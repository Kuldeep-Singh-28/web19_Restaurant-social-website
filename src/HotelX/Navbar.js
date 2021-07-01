import React, { useEffect } from "react";
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

    let instinct2;

    useEffect(() => {
        window.addEventListener("DOMContentLoaded", (e) => {
            let main_navbar = document.getElementById("main_navbar");
            let link_list = Array.from(document.querySelectorAll(".n2"));
            if (window.scrollY < 600) {
                instinct2 = 0;
            } else {
                main_navbar.classList.add("dark");
                link_list.forEach((link) => {
                    link.classList.add("dark_link");
                });
                instinct2 = 1;
            }
        });

        window.addEventListener("scroll", (e) => {
            let main_navbar = document.getElementById("main_navbar");
            let link_list = Array.from(document.querySelectorAll(".n2"));
            if (window.scrollY < 600 && instinct2 !== 0) {
                main_navbar.classList.remove("dark");
                link_list.forEach((link) => {
                    link.classList.remove("dark_link");
                });
                instinct2 = 0;
            } else if (window.scrollY >= 600 && instinct2 !== 1) {
                main_navbar.classList.add("dark");
                link_list.forEach((link) => {
                    link.classList.add("dark_link");
                });
                instinct2 = 1;
            }
        });
    }, []);

    return (
        <Navbar id="main_navbar" fixed="top" expand="lg" className="navbar2">
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
                    {!user ? (
                        <Nav.Link href="/login" className="n2" id="left">
                            <span>LOGIN</span>
                        </Nav.Link>
                    ) : (
                        <SignOut />
                    )}
                    {user ? (
                        <Nav.Link href="/login" className="n2" id="right">
                            <div> WELCOME {user.displayName}</div>
                        </Nav.Link>
                    ) : (
                        ""
                    )}
                    <div className="_navIcon">
                        <span className="_navIcons">
                            <a href="http://instagram.com/ujjawalmittal55" target="_blank"><InstagramIcon 
                                style={{ color: "#7b877c", size: 0.5 }}
                            /> </a>
                        </span>
                        <span className="_navIcons">
                          <a href="http://facebook.com" target="_blank"> </a>  <FacebookIcon
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
