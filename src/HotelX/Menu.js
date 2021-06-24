import React from "react";
import { Container, Row } from "react-bootstrap";
import Carousel from "./Carousel";
import Style from "./styles/Menu.module.css";

const Menu = () => {
    return (
        <Container fluid>
            <div className={Style.Starters}>
                <Carousel />
            </div>
            <div className={Style.Starters}>
                <Carousel />
            </div>
            <div className={Style.Starters}>
                <Carousel />
            </div>
        </Container>
    );
};

export default Menu;
