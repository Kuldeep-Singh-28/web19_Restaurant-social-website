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
            <ul className={Foo_style.ul}>
              <li className={Foo_style.hd}>
                <a
                  className={Foo_style.alink}
                  style={{ color: `#EA6A47` }}
                  href="/"
                >
                  HotelX
                </a>
              </li>
              <li className={Foo_style.bd}>
                <a className={Foo_style.alink} href="#">
                  Home
                </a>
              </li>
              <li className={Foo_style.bd}>
                <a className={Foo_style.alink} href="#">
                  Menu
                </a>
              </li>
              <li className={Foo_style.bd}>
                <a className={Foo_style.alink} href="#">
                  My Cart
                </a>
              </li>
            </ul>
          </Col>
          <Col sm={3}>
            <ul className={Foo_style.ul}>
              <li className={Foo_style.hd}>Our Company</li>
              <li className={Foo_style.bd}>
                <a className={Foo_style.alink} href="#">
                  Locate us
                </a>
              </li>
              <li className={Foo_style.bd}>Contact Us</li>
              <li className={Foo_style.bd}>Privacy Policy</li>
            </ul>
          </Col>
          <Col sm={3}>
            <ul className={Foo_style.ul}>
              <li className={Foo_style.hd}>Follow us</li>
              <li className={Foo_style.bd}>
                <FacebookIcon
                  className={Foo_style.ic}
                  style={{ color: `white` }}
                />
                <a className={Foo_style.alink} href="#">
                  Facebook
                </a>
              </li>
              <li className={Foo_style.bd}>
                <InstagramIcon
                  className={Foo_style.ic}
                  style={{ color: `white` }}
                />
                <a className={Foo_style.alink} href="#">
                  Instagram
                </a>
              </li>
            </ul>
          </Col>
          <Col sm={3}>
            <img src="/newLogo.png" className={Foo_style.logo} />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Footer;
