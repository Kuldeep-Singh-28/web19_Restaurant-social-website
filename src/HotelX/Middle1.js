import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Style from "./styles/Middle1.module.css";

function Middle1() {
    return (
        <div>
            <Container fluid>
                <Row className={Style.row}>
                    <Col className={Style.col1}>
                        <a href="/menu">VIEW OUR MENU</a>
                    </Col>
                    <Col className={Style.col2}>
                        <a href="#">LOCATE US</a>
                    </Col>
                    <Col className={Style.col3}>
                        <a href="/menu">ORDER ONLINE</a>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Middle1;
