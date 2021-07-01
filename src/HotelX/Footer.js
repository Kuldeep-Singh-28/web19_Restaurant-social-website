import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Carousel } from "react-bootstrap";
import Foo_style from "./styles/Footer.module.css";
import InstagramIcon from "@material-ui/icons/Instagram";
import FacebookIcon from "@material-ui/icons/Facebook";
function Footer() {
  return (
    <div className={Foo_style.footer}>
      <Container fluid>
        <Row>
          <Col sm={3}>
            <p>LOGO</p>
          </Col>
          <Col sm={3} className="px-1">
            <ul>
              <li className={Foo_style.hd}>
                <a href="/">HotelX</a>
              </li>
              <li className={Foo_style.bd}>
                <a href="#">Home</a>
              </li>
              <li className={Foo_style.bd}>
                <a href="#">Menu</a>
              </li>
              <li className={Foo_style.bd}>
                <a href="#">My Cart</a>
              </li>
            </ul>
          </Col>
          <Col sm={3} className="px-1">
            <ul>
              <li className={Foo_style.hd}>Our Company</li>
              <li className={Foo_style.bd}>
                <a href="#">Locate us</a>
              </li>
              <li className={Foo_style.bd}>Contact Us</li>
              <li className={Foo_style.bd}>Privacy Policy</li>
            </ul>
          </Col>
          <Col sm={3} className="px-1">
            <ul>
              <li className={Foo_style.hd}>Follow us</li>
              <li className={Foo_style.bd}>
                <FacebookIcon color="secondary" className="mx-2" />
                <a href="#">Facebook</a>
              </li>
              <li className={Foo_style.bd}>
                <InstagramIcon color="secondary" className="mx-2" />
                <a href="#">Instagram</a>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Footer;
