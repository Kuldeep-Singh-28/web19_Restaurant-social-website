import React, { useEffect } from "react";
import db, { provider, storage } from "./firebase";
import firebase from "firebase";
import Card from "./Card";
import { useAuthState } from "react-firebase-hooks/auth";
import { Container, Row, Col } from "react-bootstrap";
import {
    BrowserRouter as Router,
    Route,
    Switch,
    useParams,
} from "react-router-dom";
import Navbar from "./Navbar";
import Homepage from "./Homepage";
import Menu from "./Menu";
import Auth from "./Auth";
import Footer from "./Footer";

const auth = firebase.auth();

function Hotel() {
    return (
        <div>
            <div>
                <Container fluid={true} className="px-0">
                    <Container
                        className="navbarx mx-0 px-0 w-100"
                        style={{ maxWidth: "100vw" }} 
                    >
                        <Router>
                            <Navbar />
                            <Route path="/menu" component={Menu} />
                            <Route exact path="/" component={Homepage} />
                            <Route path="/login" component={Auth} />
                        </Router>
                    </Container>
                </Container>
                <Footer />
            </div>
        </div>
    );
}

export default Hotel;
