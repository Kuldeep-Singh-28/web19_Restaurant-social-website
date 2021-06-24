import React from "react";
import { Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Carousel from "./Carousel";
import Style from "./styles/Menu.module.css";

const Menu = () => {
    return (
        <div className={Style.menu_container}>
            <div className={Style.img_container}></div>
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
        </div>
    );
};

export default Menu;
