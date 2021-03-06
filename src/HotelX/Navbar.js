import React, { useEffect, useState } from "react";
import db, { provider } from "./firebase";
import firebase from "firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, Redirect, useHistory } from "react-router-dom";
import { MDBBtn } from "mdb-react-ui-kit";
import {
    Navbar,
    Nav,
    Form,
    FormControl,
    Button,
    Modal,
    Row,
} from "react-bootstrap";
import "./styles/Navbar.css";
import Google_svg from "./Google_svg";
import InstagramIcon from "@material-ui/icons/Instagram";
import FacebookIcon from "@material-ui/icons/Facebook";
import Cart from "./Cart";
const auth = firebase.auth();
let instinct2;
let instinct6;
let instinct_width;

function SignOut() {
    console.log(instinct2, instinct6);
    return (
        auth.currentUser && (
            <div>
                <Nav.Link
                    href="#"
                    onClick={() => auth.signOut()}
                    className={`n2 ${
                        !instinct2
                            ? "dark_link"
                            : !instinct6
                            ? "jumbotron_links"
                            : ""
                    }`}
                    id="left"
                >
                    SIGN OUT
                </Nav.Link>
            </div>
        )
    );
}

function NavBar() {
    const [user] = useAuthState(auth);
    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);
    const [isAdmin, setisAdmin] = useState(false);
    const [email, setEmail] = useState();
    const [show3, setShow3] = useState(false);

    const [validated, setValidated] = useState(false);
    const [validated2, setValidated2] = useState(false);
    const [validated3, setValidated3] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            setValidated(true);
        } else {
            event.preventDefault();
            credentialSignIn(event);
        }
    };
    const handleSubmit2 = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            setValidated2(true);
        } else {
            event.preventDefault();
            credentialSignUp(event);
        }
    };
    const handleSubmit3 = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            setValidated3(true);
        } else {
            event.preventDefault();
            forgot(event);
            handleClose3();
        }
    };

    useEffect(async () => {
        if (user) {
            db.collection("Admin")
                .get()
                .then((snap) => {
                    snap.docs.forEach((doc) => {
                        //console.log(user.id)
                        if (doc.data().id == user.uid) {
                            setisAdmin(true);
                        }
                    });
                });
        } else {
            setisAdmin(false);
        }
    }, [user]);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);

    const handleClose3 = () => setShow3(false);
    const handleShow3 = () => setShow3(true);

    const dualEvent = () => {
        handleClose();
        handleShow2();
    };

    const dualEvent2 = () => {
        handleClose2();
        handleShow();
    };

    const dualEvent3 = () => {
        handleClose();
        handleShow3();
    };

    const forgot = (e) => {
        e.preventDefault();
        if (email != "") {
            firebase
                .auth()
                .sendPasswordResetEmail(email)
                .then(() => {
                    window.alert("email is sent");
                })
                .catch((error) => {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    window.alert(
                        "That address is either invalid or is not associated with any user"
                    );
                    // ..
                });
        }
    };
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
                db.collection("users").doc(user.uid).set({
                    name: user.displayName,
                    email: user.email,
                    photo: user.photoURL,
                });
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
        document.getElementById("email").value = "";
        document.getElementById("password").value = "";

        auth.signInWithEmailAndPassword(email, pass)
            .then((res) => {
                document.getElementById("email").value = "";
                document.getElementById("password").value = "";
                handleClose();
            })
            .catch((err) => {
                console.log("error", err.message);
                window.alert("incorrect paasword");
            });
    };

    const credentialSignUp = (e) => {
        const email = document.getElementById("email2").value;
        const pass = document.getElementById("password2").value;

        auth.createUserWithEmailAndPassword(email, pass).then((cred) => {
            const name = document.getElementById("name8").value;
            console.log(
                "the user with email ",
                cred.user.email,
                " has been authenticated"
            );

            db.collection("users").doc(cred.user.uid).set({
                name: name,
                email: email,
                password: pass,
            });
            document.getElementById("name8").value = "";
            document.getElementById("email2").value = "";
            document.getElementById("password2").value = "";
            handleClose2();
        });
    };

    function check() {
        if (isAdmin) {
            const k = document.getElementById("left");
            k.style.marginRight = `0px`;
            return (
                <Nav.Link
                    href="/admin"
                    className={`n2 ${
                        !instinct2
                            ? "dark_link"
                            : !instinct6
                            ? "jumbotron_links"
                            : ""
                    }`}
                    id="right"
                >
                    ADMIN
                </Nav.Link>
            );
        }
    }

    useEffect(() => {
        window.addEventListener("DOMContentLoaded", (e) => {
            let main_navbar = document.getElementById("main_navbar");
            let link_list = Array.from(document.querySelectorAll(".n2"));

            if (window.scrollY < 10) {
                main_navbar.classList.add("jumbotron_home");
                link_list.forEach((link) =>
                    link.classList.add("jumbotron_links")
                );
                instinct6 = 0;
            } else {
                instinct6 = 1;
            }
            if (window.scrollY < 600) {
                instinct2 = 0;
            } else {
                main_navbar.classList.add("dark");
                link_list.forEach((link) => {
                    link.classList.add("dark_link");
                });
                instinct2 = 1;
            }

            if (window.innerWidth >= 992) {
                instinct_width = 1;
            } else if (window.innerWidth < 992) {
                main_navbar.classList.add("jumbotron_home_width");
                instinct_width = 0;
            }
        });

        window.addEventListener("scroll", (e) => {
            let main_navbar = document.getElementById("main_navbar");
            let link_list = Array.from(document.querySelectorAll(".n2"));

            if (window.scrollY < 10 && instinct6 !== 0) {
                main_navbar.classList.add("jumbotron_home");
                link_list.forEach((link) =>
                    link.classList.add("jumbotron_links")
                );
                instinct6 = 0;
            } else if (window.scrollY >= 10 && instinct6 !== 1) {
                main_navbar.classList.remove("jumbotron_home");
                link_list.forEach((link) => {
                    link.classList.remove("jumbotron_links");
                });
                instinct6 = 1;
            }
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

        //====================================

        window.addEventListener("resize", function (e) {
            let main_navbar = document.getElementById("main_navbar");

            if (window.innerWidth >= 992 && instinct_width != 1) {
                main_navbar.classList.remove("jumbotron_home_width");
                instinct_width = 1;
            } else if (window.innerWidth < 992 && instinct_width != 0) {
                main_navbar.classList.add("jumbotron_home_width");
                instinct_width = 0;
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
                    <Nav
                        className="n"
                        style={{ alignItems: `center` }}
                        id="nav-cont"
                    >
                        <Nav.Link href="/" className="n2" id="home_id">
                            HOME
                        </Nav.Link>
                        <Nav.Link href="/menu" className="n2" id="menu_id">
                            MENU
                        </Nav.Link>
                        <Nav.Link href="/locate" className="n2" id="locate_id">
                            LOCATE
                        </Nav.Link>
                        <Nav.Link
                            href="/contact_us"
                            className="n2"
                            id="contact_id"
                        >
                            CONTACT US
                        </Nav.Link>
                        {user ? (
                            <Nav.Link href="/user" className="n2" id="user_id">
                                MY ACCOUNT
                            </Nav.Link>
                        ) : (
                            ""
                        )}
                        {user ? (
                            <Cart instinct2={instinct2} instinct6={instinct6} />
                        ) : (
                            ""
                        )}
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
                        {check()}
                        <div className="_navIcon">
                            <span className="_navIcons">
                                <a href="http://instagram.com" target="_blank">
                                    <InstagramIcon className="social_icons" />{" "}
                                </a>
                            </span>
                            <span className="_navIcons">
                                <a href="http://facebook.com" target="_blank">
                                    {" "}
                                    <FacebookIcon className="social_icons" />
                                </a>{" "}
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
                            className="btn btn-outline-dark google-button"
                        >
                            <Google_svg />
                            <div className="login-with-google">
                                Login with Google
                            </div>
                        </a>
                    </div>
                    <Form
                        noValidate
                        validated={validated}
                        onSubmit={handleSubmit}
                    >
                        <Row>
                            <Form.Group
                                controlId="validationCustom01"
                                className="input-container"
                            >
                                <Form.Control
                                    id="email"
                                    className="input-field"
                                    type="text"
                                    placeholder="Email"
                                    name="email"
                                    style={{ color: `black` }}
                                    required
                                />
                                <Form.Control.Feedback className="feedback">
                                    Looks good!
                                </Form.Control.Feedback>
                                <Form.Control.Feedback
                                    type="invalid"
                                    className="feedback"
                                >
                                    Please provide a valid email.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Group
                                controlId="validationCustom04"
                                className="input-container"
                                style={{ marginTop: `0.6rem` }}
                            >
                                <Form.Control
                                    id="password"
                                    className="input-field"
                                    type="password"
                                    placeholder="Password"
                                    name="psw"
                                    style={{ color: `black` }}
                                    required
                                />
                                <Form.Control.Feedback
                                    type="invalid"
                                    className="feedback"
                                >
                                    Please provide a valid password.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <div
                            className="login_forgot"
                            style={{ marginTop: `-0.2rem` }}
                        >
                            <MDBBtn
                                outline
                                rounded
                                className="login-btn-submit"
                                type="submit"
                                style={{ margin: `0.2rem` }}
                            >
                                Log In
                            </MDBBtn>
                            <span
                                outline
                                rounded
                                className="forgot_pass"
                                onClick={dualEvent3}
                            >
                                forgot password?
                            </span>
                        </div>
                    </Form>
                    <div className="divider"></div>
                    <div></div>
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
            <Modal show={show3} onHide={handleClose3}>
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                    <div className="login-prompt">
                        <h1
                            style={{ color: `#20303c` }}
                            className="header-login"
                        >
                            Reset Password
                        </h1>
                        <br />
                    </div>
                    <Form
                        noValidate
                        validated={validated3}
                        onSubmit={handleSubmit3}
                    >
                        <Row>
                            <Form.Group
                                controlId="validationCustom07"
                                className="input-container"
                                style={{ marginTop: `0.6rem` }}
                            >
                                <Form.Control
                                    id="email"
                                    className="input-field "
                                    type="text"
                                    placeholder="Enter Email"
                                    name="email"
                                    style={{ color: `black`, width: `92%` }}
                                    required
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <Form.Control.Feedback
                                    className="feedback"
                                    style={{ width: `92%` }}
                                >
                                    Looks good!
                                </Form.Control.Feedback>
                                <Form.Control.Feedback
                                    type="invalid"
                                    className="feedback"
                                    style={{ width: `92%` }}
                                >
                                    Please provide a valid email.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <button
                            class="mb-3 btn btn-primary btn-block"
                            type="submit"
                            style={{ margin: `0` }}
                        >
                            Send recovery email
                        </button>
                    </Form>
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
                            className="btn btn-outline-dark google-button"
                        >
                            <Google_svg />
                            <div className="login-with-google">
                                Continue with Google
                            </div>
                        </a>
                    </div>
                    <Form
                        noValidate
                        validated={validated2}
                        onSubmit={handleSubmit2}
                    >
                        <Row>
                            <Form.Group
                                controlId="validationCustom01"
                                className="input-container"
                            >
                                <Form.Control
                                    id="name8"
                                    className="input-field"
                                    type="text"
                                    placeholder="Name"
                                    name="name"
                                    style={{ color: `black` }}
                                    required
                                />
                                <Form.Control.Feedback className="feedback">
                                    Looks good!
                                </Form.Control.Feedback>
                                <Form.Control.Feedback
                                    type="invalid"
                                    className="feedback"
                                >
                                    Please provide a valid name.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Group
                                controlId="validationCustom02"
                                className="input-container"
                                style={{ marginTop: `0.6rem` }}
                            >
                                <Form.Control
                                    id="email2"
                                    className="input-field"
                                    type="text"
                                    placeholder="Email"
                                    name="email"
                                    style={{ color: `black` }}
                                    required
                                />
                                <Form.Control.Feedback className="feedback">
                                    Looks good!
                                </Form.Control.Feedback>
                                <Form.Control.Feedback
                                    type="invalid"
                                    className="feedback"
                                >
                                    Please provide a valid email.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Group
                                controlId="validationCustom04"
                                className="input-container"
                                style={{ marginTop: `0.6rem` }}
                            >
                                <Form.Control
                                    id="password2"
                                    className="input-field"
                                    type="password"
                                    placeholder="Password"
                                    name="psw"
                                    style={{ color: `black` }}
                                    required
                                />
                                <Form.Control.Feedback
                                    type="invalid"
                                    className="feedback"
                                >
                                    Please provide a valid password.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <Button
                            variant="outline-primary"
                            className="login-btn-submit"
                            type="submit"
                        >
                            Sign Up
                        </Button>
                    </Form>
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
