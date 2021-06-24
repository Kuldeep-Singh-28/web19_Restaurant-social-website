import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
import "./styles/Navbar.css";
function NavBar() {
    return (
        <div className="Nav" className="n1 mb-5">
                <Nav className="mr-auto" className="n">
                    <Nav.Link href="/" className="n2">Home</Nav.Link>
                    <Nav.Link href="#features" className="n2">Features</Nav.Link>
                    <Nav.Link href="/menu" className="n2">Menu</Nav.Link>
                </Nav>
        </div>
    );
}

export default NavBar;
