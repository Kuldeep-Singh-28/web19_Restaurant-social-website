import React from "react";
import { Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Carousel from "./Carousel";
import Style from "./styles/Menu.module.css";

const Menu = () => {
    return (
        <Container fluid>
            <div className={Style.Starters}>
                <Link to="/starters">
                    <Carousel />
                </Link>
            </div>
            <div className={Style.Main_course}>
                <Link to="/main_course">
                    <Carousel />
                </Link>
            </div>
            <div className={Style.Dessert}>
                <Link to="/dessert">
                    <Carousel />
                </Link>
            </div>
        </Container>
    );
};

export default Menu;
