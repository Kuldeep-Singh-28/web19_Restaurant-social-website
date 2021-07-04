import React, { useEffect, useState } from "react";
import { provider } from "./firebase";
import firebase from "firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, Redirect, useHistory } from "react-router-dom";
import { Navbar, Nav, Form, FormControl, Button, Modal } from "react-bootstrap";
import "./styles/Navbar.css";
import InstagramIcon from "@material-ui/icons/Instagram";
import FacebookIcon from "@material-ui/icons/Facebook";
// import { user } from "./Auth";
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
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    let instinct2;

    const signup = async (e) => {
        e.preventDefault();
        firebase
            .auth()
            .signInWithPopup(provider)
            .then(async (result) => {
                var credential = result.credential;
                var token = credential.accessToken;
                var user = result.user;
                console.log(user);
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                var email = error.email;
                var credential = error.credential;
            });
    };

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
        <div>
            <Navbar
                id="main_navbar"
                fixed="top"
                expand="lg"
                className="navbar2"
            >
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
                            <Nav.Link
                                href="#"
                                onClick={handleShow}
                                className="n2"
                                id="left"
                            >
                                LOGIN
                            </Nav.Link>
                        ) : (
                            <SignOut />
                        )}
                        {user ? (
                            <Nav.Link href="#" className="n2" id="right">
                                <div>
                                    {" "}
                                    WELCOME {user.displayName.toUpperCase()}
                                </div>
                            </Nav.Link>
                        ) : (
                            ""
                        )}
                        <div className="_navIcon">
                            <span className="_navIcons">
                                <a
                                    href="http://instagram.com/ujjawalmittal55"
                                    target="_blank"
                                >
                                    <InstagramIcon
                                        style={{ color: "#7b877c", size: 0.5 }}
                                    />{" "}
                                </a>
                            </span>
                            <span className="_navIcons">
                                <a href="http://facebook.com" target="_blank">
                                    {" "}
                                </a>{" "}
                                <FacebookIcon
                                    style={{ color: "#7b877c", size: 0.5 }}
                                />
                            </span>
                        </div>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>LOGIN</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <img className="lgimg" src="./images/canvas.jpeg" alt="" />
                    <div className="input-container">
                        <i className="fa fa-user icon"></i>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            aria-describedby="emailHelp"
                            placeholder="Name"
                            required
                        />
                    </div>
                    <div className="input-container">
                        <i className="fa fa-envelope icon"></i>
                        <input
                            className="input-field"
                            type="text"
                            placeholder="Email"
                            name="email"
                        />
                    </div>

                    <div className="input-container">
                        <i className="fa fa-key icon"></i>
                        <input
                            className="input-field"
                            type="password"
                            placeholder="Password"
                            name="psw"
                        />
                    </div>
                    <div className="or">Or</div>
                    <div className="container gl">
                        <a
                            href="#"
                            onClick={(e) => signup(e)}
                            className="google btn gl2 py-2"
                        >
                            <i className="fa fa-google fa-fw"></i> Login with
                            Google
                        </a>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default NavBar;
