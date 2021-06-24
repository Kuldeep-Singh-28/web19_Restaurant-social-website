import React, { useEffect } from "react";
import db, { provider, storage } from "./firebase";
import firebase from "firebase";
import Card from './Card'
import { useAuthState } from "react-firebase-hooks/auth";
import {Container,Row,Col} from 'react-bootstrap'
import {BrowserRouter as Router,Route,Switch,useParams} from 'react-router-dom'
import Navbar from './Navbar'
import './styles/hotel.css'
import ReactPlayer from 'react-player'
const auth = firebase.auth();

function Hotel({ user }) {
    useEffect(async () => {
        const x = (await db.collection("users").doc(user.uid).get()) != null;
        if (x == true) {
            await db.collection("users").doc(user.uid).set({
                CreatedAt: firebase.firestore.FieldValue.serverTimestamp(),
                username: user.displayName,
                photo: user.photoURL,
                email: user.email,
            });
        }
    }, [user]);
    const upload = (e) => {
        var file = e.target.files[0];
        var Storage = storage.ref("images" + file.name);
        Storage.put(file);
    };
    return (
        <div>
           <Container fluid={true} >
           <Container className="navbarx" >
                <Router>
                <Navbar/>    
                </Router>
            </Container>
            <Container className="navbarx" fluid={true}>
            <Row>
                <Col>
                <ReactPlayer
          className='react-player'
          url='https://www.youtube.com/watch?v=ysz5S6PUM-U'
          width='450px'
          height='400px' />
                </Col>
            <Col>
                    <div className='comment'>
                        this is awesome i like very much!
                    </div>
            </Col>
            </Row>
            </Container>
            <div>
            <Container className='_statement' className="navbarx" >
                helafa;nfa afjnkanfaoh
            </Container>
            </div>
          
           </Container>
           
        </div>
    );
}

export default Hotel;

