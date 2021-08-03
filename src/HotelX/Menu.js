import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { Container, Row, Col } from "react-bootstrap";
import firebase from "firebase";
import "fullpage.js/vendors/scrolloverflow";
import ReactFullpage from "@fullpage/react-fullpage";
import { gsap } from "gsap";
import { Link } from "react-router-dom";
import Carousel from "./Carousel";
import Carousel1 from "./McCarousel";
import Carousel2 from "./Dcarousel";
import Carousel3 from "./BCarousel";
import Style from "./styles/Menu.module.css";
import "./styles/Menu.css";
const auth = firebase.auth();

class Menu extends React.Component {
    componentDidMount() {
        const menu_id = document.getElementById("menu_id");
        menu_id.style.textDecoration = `underline`;
        menu_id.style.textDecorationColor = `coral`;
        menu_id.style.textDecorationThickness = `2px`;
        menu_id.style.textUnderlineOffset = `5px`;
    }
    onLeave(origin, destination, direction) {
        // console.log("i am here");
        const section = destination.item;
        const title = section.querySelector(".piccol");
        const title4 = section.querySelector(".piccol_temp");
        const title3 = section.querySelector(".carousel-inner");
        const title2 = section.querySelector(".heading_new");
        const desc = section.querySelector(".descc");
        const btnn = section.querySelector(
            ".btn.btn-outline-light.btn-rounded"
        );
        // console.log(title);
        const tl = gsap.timeline({ delay: 0.5 });
        if (title) {
            tl.fromTo(
                title,
                0.5,
                { x: "100%", opacity: 0 },
                { x: "0%", opacity: 1 }
            )
                .fromTo(
                    title2,
                    0.5,
                    { y: "50", opacity: 0 },
                    { y: "0", opacity: 1 },
                    "-=0.5"
                )
                .fromTo(
                    desc,
                    0.5,
                    { y: "50", opacity: 0 },
                    { y: "0", opacity: 1 },
                    "-=0.4"
                )
                .fromTo(
                    btnn,
                    0.5,
                    { y: "50", opacity: 0 },
                    { y: "0", opacity: 1 },
                    "-=0.3"
                )
                .fromTo(
                    title3,
                    0.5,
                    { y: "50", opacity: 0 },
                    { y: "0", opacity: 1 },
                    "-=0.2"
                );
        } else {
            tl.fromTo(
                title4,
                0.5,
                { x: "-100%", opacity: 0 },
                { x: "0%", opacity: 1 }
            )
                .fromTo(
                    title2,
                    0.5,
                    { y: "50", opacity: 0 },
                    { y: "0", opacity: 1 },
                    "-=0.5"
                )
                .fromTo(
                    desc,
                    0.5,
                    { y: "50", opacity: 0 },
                    { y: "0", opacity: 1 },
                    "-=0.4"
                )
                .fromTo(
                    btnn,
                    0.5,
                    { y: "50", opacity: 0 },
                    { y: "0", opacity: 1 },
                    "-=0.3"
                )
                .fromTo(
                    title3,
                    0.5,
                    { y: "50", opacity: 0 },
                    { y: "0", opacity: 1 },
                    "-=0.2"
                );
        }
        console.log("Leaving section " + origin.index);
    }
    afterLoad(origin, destination, direction) {
        console.log("After load: " + destination.index);
    }
    render() {
        return (
            <ReactFullpage
                scrollOverflow={true}
                navigation={true}
                // sectionsColor={["orange", "purple", "green"]}
                onLeave={this.onLeave.bind(this)}
                afterLoad={this.afterLoad.bind(this)}
                render={({ state, fullpageApi }) => {
                    return (
                        <div
                            // ntainer}
                            id="fullpage-wrapper"
                        >
                            <div className={`section ${Style.section}`}>
                                <Row className={Style.row}>
                                    <Col
                                        sm={6}
                                        className={`piccol_temp ${Style.pic_col}`}
                                    >
                                        <div className={Style.Starters}>
                                            <Link to="/starters">
                                                <Carousel />
                                            </Link>
                                        </div>
                                    </Col>

                                    <Col sm={6} className={Style.text_col}>
                                        <div className={Style.content}>
                                            <div className="heading_new">
                                                Starters
                                            </div>
                                            <div
                                                className={`descc ${Style.desc}`}
                                            >
                                                Lorem ipsum dolor sit amet
                                                consectetur adipisicing elit.
                                                Quidem explicabo obcaecati
                                                doloremque aut libero dolore
                                                fuga nobis laboriosam rem et,
                                                molestias corporis dignissimos
                                                amet placeat illum eveniet
                                                exercitationem tempore!
                                                Sapiente.
                                            </div>
                                            <a
                                                href="/starters"
                                                style={{
                                                    zIndex: `100`,
                                                    color: `#d0c194`,
                                                }}
                                                class="btn btn-outline-light btn-rounded mt-4"
                                            >
                                                VIEW STARTERS
                                            </a>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                            <div className={`section ${Style.section}`}>
                                <Row className={Style.row}>
                                    <Col
                                        sm={6}
                                        className={`${Style.main_text_col} ${Style.text_col}`}
                                    >
                                        <div className={Style.content}>
                                            <div
                                                style={{
                                                    lineHeight: `1.2`,
                                                    marginBottom: `0.5rem`,
                                                }}
                                                className="heading_new"
                                            >
                                                Main Course
                                            </div>
                                            <div
                                                className={`descc ${Style.desc}`}
                                            >
                                                Lorem ipsum dolor sit amet,
                                                consectetur adipisicing elit.
                                                In, perspiciatis excepturi odit
                                                totam illum, molestiae.
                                                Cupiditate quas illo, atque
                                                modi, quis ex consequatur
                                                inventore quam quia, animi
                                                sapiente esse eligendi!
                                            </div>
                                            <a
                                                href="/main_course"
                                                style={{
                                                    zIndex: `100`,
                                                    color: `#d0c194`,
                                                }}
                                                class="btn btn-outline-light btn-rounded mt-4"
                                            >
                                                VIEW MAIN COURSE
                                            </a>
                                        </div>
                                    </Col>

                                    <Col
                                        sm={6}
                                        className={`piccol ${Style.main_pic_col} ${Style.pic_col}`}
                                    >
                                        <div className={Style.Main_course}>
                                            <Link to="/main_course">
                                                <Carousel1 />
                                            </Link>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                            <div className={`section ${Style.section}`}>
                                <Row className={Style.row}>
                                    <Col
                                        sm={6}
                                        className={`piccol_temp ${Style.pic_col}`}
                                    >
                                        <div className={Style.Desserts}>
                                            <Link to="/desserts">
                                                <Carousel2 />
                                            </Link>
                                        </div>
                                    </Col>
                                    <Col sm={6} className={Style.text_col}>
                                        <div className={Style.content}>
                                            <div className="heading_new">
                                                Desserts
                                            </div>
                                            <div
                                                className={`descc ${Style.desc}`}
                                            >
                                                Lorem ipsum, dolor sit amet
                                                consectetur adipisicing elit.
                                                Necessitatibus veniam magnam
                                                fugit nostrum autem explicabo
                                                non, deserunt ullam iusto ipsa
                                                animi perferendis, assumenda
                                                voluptate, temporibus asperiores
                                                odio, architecto? Pariatur,
                                                exercitationem!
                                            </div>
                                            <a
                                                href="/desserts"
                                                style={{
                                                    zIndex: `100`,
                                                    color: `#d0c194`,
                                                }}
                                                class="btn btn-outline-light btn-rounded mt-4"
                                            >
                                                VIEW DESSERTS
                                            </a>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                            <div className={`section ${Style.section}`}>
                                <Row className={Style.row}>
                                    <Col
                                        sm={6}
                                        className={`${Style.bev_text_col} ${Style.text_col}`}
                                    >
                                        <div className={Style.content}>
                                            <div className="heading_new">
                                                Beverages
                                            </div>
                                            <div
                                                className={`descc ${Style.desc}`}
                                            >
                                                Lorem ipsum dolor sit amet
                                                consectetur adipisicing elit.
                                                Sit recusandae earum perferendis
                                                ut tempore numquam quos id sequi
                                                iure. Facere laboriosam rem
                                                tenetur quia voluptatum impedit,
                                                recusandae rerum a. Voluptatem.
                                            </div>
                                            <a
                                                href="/beverages"
                                                style={{
                                                    zIndex: `100`,
                                                    color: `#d0c194`,
                                                }}
                                                class="btn btn-outline-light btn-rounded mt-4"
                                            >
                                                VIEW BEVERAGES
                                            </a>
                                        </div>
                                    </Col>

                                    <Col
                                        sm={6}
                                        className={`piccol ${Style.bev_pic_col} ${Style.pic_col}`}
                                    >
                                        <div className={Style.Beverages}>
                                            <Link to="/beverages">
                                                <Carousel3 />
                                            </Link>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    );
                }}
            />
        );
    }
}

// const Menu = () => {
//     return (

//     );
// };

export default Menu;
