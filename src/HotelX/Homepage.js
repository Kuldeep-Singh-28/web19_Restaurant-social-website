import React, { useState } from "react";
import ReactPlayer from "react-player";
import { Container, Row, Col, Carousel } from "react-bootstrap";
import FormatQuoteRoundedIcon from "@material-ui/icons/FormatQuoteRounded";
import StarHalfIcon from "@material-ui/icons/StarHalf";
import Home_carousel from "./Home_carousel";
import "./styles/hotel.css";
import StarIcon from "@material-ui/icons/Star";
import Middle1 from "./Middle1";
import Middle2 from "./Middle2";
import Middle3 from "./Middle3";
import Comment from "./Comment";
import Services from "./Services";
import Homepage_jumbotron from "./Homepage_jumbotron";

function Homepage() {
    //IITISoC---Restaurant-social-website
    return (
        <div>
            <Homepage_jumbotron />
            <Home_carousel />
            <Container className="navbarx" fluid={true}>
                <Services />
                <Middle2 />
                <Middle1 />
                <Comment />
                <Middle3 />
            </Container>
        </div>
    );
}

export default Homepage;
