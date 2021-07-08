import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import firebase from "firebase";
import { Link } from "react-router-dom";
import Carousel from "./Carousel";
import Carousel1 from "./McCarousel";
import Carousel2 from "./Dcarousel";
import Carousel3 from "./BCarousel";
import Style from "./styles/Menu.module.css";
const auth = firebase.auth();
const Menu = () => {
    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                console.dir(user);
            } else {
                console.log("currently no user is logged in");
            }
        });
    }, []);
    return (
        <div className={Style.menu_container}>
            <div className={Style.img_container}>
                <Container
                    fluid
                    className={Style._container}
                    style={{ padding: `3px` }}
                >
                    <Row style={{ marginTop: `16vh` }} className={Style.row}>
                        <Col sm={7}>
                            <div className={Style.Starters}>
                                <Link to="/starters">
                                    <Carousel />
                                </Link>
                            </div>
                        </Col>

                        <Col sm={5}>
                            <div className={Style.content}>Starters</div>
                        </Col>
                    </Row>
                    <Row className={Style.row}>
                        <Col sm={5}>
                            <div className={Style.content}>Main Course</div>
                        </Col>

                        <Col sm={7}>
                            <div className={Style.Main_course}>
                                <Link to="/main-course">
                                    <Carousel1 />
                                </Link>
                            </div>
                        </Col>
                    </Row>
                    <Row className={Style.row}>
                        <Col sm={7}>
                            <div className={Style.Desserts}>
                                <Link to="/dessert">
                                    <Carousel2 />
                                </Link>
                            </div>
                        </Col>
                        <Col sm={5}>
                            <div className={Style.content}>Desserts</div>
                        </Col>
                    </Row>
                    <Row className={Style.row}>
                        <Col sm={5}>
                            <div className={Style.content}>Beverages</div>
                        </Col>

                        <Col sm={7}>
                            <div className={Style.bevrages}>
                                <Link to="/bevrages">
                                    <Carousel3 />
                                </Link>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
};

export default Menu;
