import React, { useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap";
import Style from "./styles/Middle2.module.css";

function Middle2() {
    let instinct;

    useEffect(() => {
        window.addEventListener("DOMContentLoaded", (e) => {
            let btn1 = document.getElementById("btn1");
            let btn2 = document.getElementById("btn2");
            if (window.innerWidth >= 576) {
                console.log("i am here in the dom content loaded");
                btn1.classList.add("btn-lg");
                btn2.classList.add("btn-lg");
                instinct = 1;
            } else {
                instinct = 0;
            }
        });

        window.addEventListener("resize", (e) => {
            let btn1 = document.getElementById("btn1");
            let btn2 = document.getElementById("btn2");
            if (window.innerWidth < 576 && instinct !== 0) {
                console.log("i am also here in the add event listener min");
                btn1.classList.remove("btn-lg");
                btn2.classList.remove("btn-lg");
                instinct = 0;
            } else if (window.innerWidth >= 576 && instinct !== 1) {
                console.log("i am also here in the add event listener max");
                btn1.classList.add("btn-lg");
                btn2.classList.add("btn-lg");
                instinct = 1;
            }
        });
    }, []);

    return (
        <div>
            <Container fluid>
                <Row>
                    <div className={Style.main}>
                        <div className={Style.content}>
                            <span style={{ fontSize: `small` }}>
                                ALWAYS FRESH. NEVER FROZEN.
                            </span>
                            <div className={Style.heading}>
                                <h1>
                                    THERE IS NO LOVE SINCERE
                                    <br />
                                    THAN THE LOVE OF FOOD
                                </h1>
                            </div>
                            <div className={Style.desc}>
                                Our original burgers are handmade in-store and
                                come topped with fresh lettuce, onions, tomato,
                                and cheese along with a choice of our ‘Homemade
                                Classic’, ‘Hot Signature’ or 'Smokin’ Hot BBQ'
                                Sauces. We don’t freeze any of our meat patties
                                so you can be sure you’re getting top-quality
                                ingredients &#38; taste.
                            </div>
                            <a
                                id="btn1"
                                className="btn mx-3 my-4"
                                style={{ backgroundColor: `#DC9458` }}
                                href="/locate"
                            >
                                LOCATE US
                            </a>
                            <a
                                id="btn2"
                                className="btn btn-outline-secondary mx-3 my-4 "
                                href="/menu"
                                style={{
                                    color: `white`,
                                }}
                            >
                                GET STARTED
                            </a>
                        </div>
                    </div>
                </Row>
            </Container>
        </div>
    );
}

export default Middle2;
