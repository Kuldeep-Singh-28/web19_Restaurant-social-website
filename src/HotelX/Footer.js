import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Carousel } from "react-bootstrap";
import Foo_style from "./styles/Footer.module.css";
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
                            <li className={Foo_style.hotel_name}>
                                <a href="/">UJJU HOTEL</a>
                            </li>
                            <li className="">
                                <a href="/menu">MENU</a>
                            </li>
                            <li className="text-muted">ujju@gmail.com</li>
                            <li className="">1234567890</li>
                            <li className="text-muted">
                                <a href="/">PRIVACY POLICY</a>
                            </li>
                        </ul>
                    </Col>
                    <Col sm={3} className="px-1">
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Obcaecati molestiae quas commodi incidunt a,
                            recusandae aliquid pariatur dolorum aut optio porro
                            dignissimos dolores eaque necessitatibus esse
                            perferendis doloremque! Vitae, rerum?
                        </p>
                    </Col>
                    <Col sm={3} className="px-1">
                        <p>
                            Lorem, ipsum dolor sit amet consectetur adipisicing
                            elit. Soluta amet tempore mollitia provident
                            molestiae voluptas recusandae autem odio deleniti,
                            iusto dolor consequuntur voluptatum minus sint.
                            Possimus voluptatibus corporis deserunt eligendi!
                        </p>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Footer;
