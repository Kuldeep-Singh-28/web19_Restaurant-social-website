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

function ControlledCarousel() {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    const w = {
        height: "41vh",
        objectFit: "cover",
    };

    return (
        <div
            id="carouselExampleCaptions"
            class="carousel slide"
            data-mdb-ride="carousel"
        >
            <div class="carousel-indicators">
                <button
                    type="button"
                    data-mdb-target="#carouselExampleCaptions"
                    data-mdb-slide-to="0"
                    class="active"
                    aria-current="true"
                    aria-label="Slide 1"
                ></button>
                <button
                    type="button"
                    data-mdb-target="#carouselExampleCaptions"
                    data-mdb-slide-to="1"
                    aria-label="Slide 2"
                ></button>
                <button
                    type="button"
                    data-mdb-target="#carouselExampleCaptions"
                    data-mdb-slide-to="2"
                    aria-label="Slide 3"
                ></button>
            </div>
            <div class="carousel-inner">
                <div class="carousel-item active">
                    <img
                        className="d-block w-100"
                        style={w}
                        src="./food2.jpg"
                        alt="First slide"
                    />
                    <div class="carousel-caption d-none d-md-block">
                        <div className="comment com-con">
                            <FormatQuoteRoundedIcon className="quote" />
                            <div className="mx-5 comment-text">
                                This is awesome i like very much!
                                <br />
                                <StarIcon />
                                <StarIcon />
                                <StarIcon />
                                <StarIcon />
                                <StarHalfIcon />
                            </div>
                            <FormatQuoteRoundedIcon className="quote2" />
                        </div>
                    </div>
                </div>
                <div class="carousel-item">
                    <img
                        className="d-block w-100"
                        src="./food3.jpg"
                        style={w}
                        alt="Second slide"
                    />
                    <div class="carousel-caption d-none d-md-block">
                        <div className="comment com-con">
                            <FormatQuoteRoundedIcon className="quote" />
                            <div className="mx-5 comment-text">
                                This is awesome i like very much!
                                <br />
                                <StarIcon />
                                <StarIcon />
                                <StarIcon />
                                <StarIcon />
                                <StarHalfIcon />
                            </div>
                            <FormatQuoteRoundedIcon className="quote2" />
                        </div>
                    </div>
                </div>
                <div class="carousel-item">
                    <img
                        className="d-block w-100"
                        src="./statement.jpg"
                        style={w}
                        alt="Third slide"
                    />
                    <div class="carousel-caption d-none d-md-block">
                        <div className="comment com-con">
                            <FormatQuoteRoundedIcon className="quote" />
                            <div className="mx-5 comment-text">
                                This is awesome i like very much!
                                <br />
                                <StarIcon />
                                <StarIcon />
                                <StarIcon />
                                <StarIcon />
                                <StarHalfIcon />
                            </div>
                            <FormatQuoteRoundedIcon className="quote2" />
                        </div>
                    </div>
                </div>
            </div>
            <button
                class="carousel-control-prev"
                type="button"
                data-mdb-target="#carouselExampleCaptions"
                data-mdb-slide="prev"
            >
                <span
                    class="carousel-control-prev-icon"
                    aria-hidden="true"
                ></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button
                class="carousel-control-next"
                type="button"
                data-mdb-target="#carouselExampleCaptions"
                data-mdb-slide="next"
            >
                <span
                    class="carousel-control-next-icon"
                    aria-hidden="true"
                ></span>
                <span class="visually-hidden">Next</span>
            </button>
        </div>
    );
}

function Homepage() {
    //IITISoC---Restaurant-social-website
    return (
        <div>
            <Home_carousel />
            <Container className="navbarx" fluid={true}>
                <Row
                    className="mb-2 mt-2"
                    style={{
                        minHeight: "41vh",
                        backgroundColor: `blanchedalmond`,
                    }}
                >
                    <Col
                        sm={5}
                        style={{
                            minHeight: "41vh",
                            marginTop: `2rem`,
                            marginBottom: `2rem`,
                        }}
                    >
                        <ReactPlayer
                            className="react-player"
                            url="https://www.youtube.com/watch?v=ysz5S6PUM-U"
                            width="100%"
                            height="100%"
                        />
                    </Col>
                    <Col
                        id="temp2"
                        sm={7}
                        style={{ marginTop: `2rem`, marginBottom: `2rem` }}
                    >
                        <ControlledCarousel />
                    </Col>
                </Row>
                <Middle2 />
                <Middle1 />
                <Middle3 />
                <Comment />
            </Container>
        </div>
    );
}

export default Homepage;
