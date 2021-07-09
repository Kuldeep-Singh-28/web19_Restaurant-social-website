import React, { useEffect, useState } from "react";
import db, { provider } from "./firebase";
import firebase from "firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, Redirect, useHistory } from "react-router-dom";
import { Navbar, Nav, Form, FormControl, Button, Modal } from "react-bootstrap";
import "./styles/Navbar.css";
import Google_svg from "./Google_svg";
import InstagramIcon from "@material-ui/icons/Instagram";
import FacebookIcon from "@material-ui/icons/Facebook";
// import { user } from "./Auth";
const auth = firebase.auth();

//===================================
function SignOut() {
    // const [user] = useAuthState(auth);
    return (
        auth.currentUser && (
            <div>
                <Nav.Link
                    href="#"
                    onClick={() => auth.signOut()}
                    className="n2"
                    id="left"
                >
                    SIGN OUT
                </Nav.Link>
            </div>
        )
    );
}
//=====================================

function NavBar() {
    const [user] = useAuthState(auth);
    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);

    const dualEvent = () => {
        handleClose();
        handleShow2();
    };

    const dualEvent2 = () => {
        handleClose2();
        handleShow();
    };

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

    const credentialSignIn = (e) => {
        const email = document.getElementById("email").value;
        const pass = document.getElementById("password").value;

        auth.signInWithEmailAndPassword(email, pass).then((res) => {
            handleClose();
            document.getElementById("email").value = "";
            document.getElementById("password").value = "";
        });
    };

    const credentialSignUp = (e) => {
        const email = document.getElementById("email2").value;
        const pass = document.getElementById("password2").value;

        auth.createUserWithEmailAndPassword(email, pass).then((cred) => {
            console.log(
                "the user with email ",
                cred.user.email,
                " has been authenticated"
            );
            db.collection("users").doc(cred.user.id).set({
                email: email,
                password: pass,
            });
            handleClose2();
            document.getElementById("email2").value = "";
            document.getElementById("password2").value = "";
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
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                    <div className="login-prompt">
                        <h1
                            style={{ color: `#20303c` }}
                            className="header-login"
                        >
                            Log In
                        </h1>
                        <br />
                        <div>
                            Don't have an account?{" "}
                            <span
                                onClick={dualEvent}
                                style={{ color: `#3483ff`, cursor: `pointer` }}
                            >
                                Sign up
                            </span>
                        </div>
                    </div>
                    <div className="container-google">
                        <a
                            href="#"
                            onClick={(e) => {
                                signup(e);
                                handleClose();
                            }}
                            className="btn btn-outline-secondary google-button"
                        >
                            <Google_svg />
                            <div className="login-with-google">
                                Login with Google
                            </div>
                        </a>
                    </div>
                    <div className="input-container">
                        <input
                            id="email"
                            className="input-field"
                            type="text"
                            placeholder="Email"
                            name="email"
                            style={{ color: `black` }}
                        />
                    </div>

                    <div className="input-container">
                        <input
                            id="password"
                            className="input-field"
                            type="password"
                            placeholder="Password"
                            name="psw"
                            style={{ color: `black` }}
                        />
                    </div>
                    <Button
                        variant="outline-primary"
                        className="login-btn-submit"
                        onClick={credentialSignIn}
                    >
                        Log In
                    </Button>
                    <div className="divider"></div>
                    <div className="terms">
                        * By logging in, you agree to our{" "}
                        <span style={{ color: `#3483ff` }}>Terms of Use</span>{" "}
                        and to receive HotelX emails & updates and acknowledge
                        that you read our{" "}
                        <span style={{ color: `#3483ff` }}>Privacy Policy</span>
                        .
                    </div>
                </Modal.Body>
            </Modal>
            <Modal show={show2} onHide={handleClose2}>
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                    <div className="login-prompt">
                        <h1
                            style={{ color: `#20303c` }}
                            className="header-login"
                        >
                            Sign Up
                        </h1>
                        <br />
                        <div>
                            Already have an account?{" "}
                            <span
                                onClick={dualEvent2}
                                style={{ color: `#3483ff`, cursor: `pointer` }}
                            >
                                Log In
                            </span>
                        </div>
                    </div>
                    <div className="container-google">
                        <a
                            href="#"
                            onClick={(e) => {
                                signup(e);
                                handleClose2();
                            }}
                            className="btn btn-outline-secondary google-button"
                        >
                            <Google_svg />
                            <div className="login-with-google">
                                Continue with Google
                            </div>
                        </a>
                    </div>
                    <div className="input-container">
                        <input
                            id="email2"
                            className="input-field"
                            type="text"
                            placeholder="Email"
                            name="email"
                            style={{ color: `black` }}
                        />
                    </div>

                    <div className="input-container">
                        <input
                            id="password2"
                            className="input-field"
                            type="password"
                            placeholder="Password"
                            name="psw"
                            style={{ color: `black` }}
                        />
                    </div>
                    <Button
                        variant="outline-primary"
                        className="login-btn-submit"
                        onClick={credentialSignUp}
                    >
                        Sign Up
                    </Button>
                    <div className="divider"></div>
                    <div className="terms">
                        * By logging in, you agree to our{" "}
                        <span style={{ color: `#3483ff` }}>Terms of Use</span>{" "}
                        and to receive HotelX emails & updates and acknowledge
                        that you read our{" "}
                        <span style={{ color: `#3483ff` }}>Privacy Policy</span>
                        .
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default NavBar;
