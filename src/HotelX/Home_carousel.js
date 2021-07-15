import React, { useRef, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import style from "./styles/Home_carousel.module.css";

const Home_carousel = () => {
    const array = [
        {
            name: "Focaccia Bread",
            price: 23,
            desc:
                "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusantium explicabo voluptates temporibus soluta.Ripit velit doloremque iste laborum laboriosam?",
            img: "./food2.jpg",
        },
        {
            name: "Caprese Salad",
            price: 34,
            desc:
                "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusantium explicabo voluptates temporibus soluta.Ripit velit doloremque iste laborum laboriosam?",
            img: "./food3.jpg",
        },
        {
            name: "Mushroom Risotto",
            price: 34,
            desc:
                "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusantium explicabo voluptates temporibus soluta.Ripit velit doloremque iste laborum laboriosam?",
            img: "./s.jpg",
        },
        {
            name: "Cassoulet",
            price: 30,
            desc:
                "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusantium explicabo voluptates temporibus soluta.Ripit velit doloremque iste laborum laboriosam?",
            img: "./images/shaun_meintjes.jpg",
        },
        {
            name: "Cherry Clafoutis",
            price: 98,
            desc:
                "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusantium explicabo voluptates temporibus soluta.Ripit velit doloremque iste laborum laboriosam?",
            img: "./judith-girard-marczak-26Tp__tUAWc-unsplash.jpg",
        },
        {
            name: "Jambon Beurre",
            price: 25,
            desc:
                "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusantium explicabo voluptates temporibus soluta.Ripit velit doloremque iste laborum laboriosam?",
            img: "./food3.jpg",
        },
        {
            name: "Croque Monsieur",
            price: 45,
            desc:
                "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusantium explicabo voluptates temporibus soluta.Ripit velit doloremque iste laborum laboriosam?",
            img: "./food2.jpg",
        },
        {
            name: "Boeuf Bourguignon",
            price: 63,
            desc:
                "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusantium explicabo voluptates temporibus soluta.Ripit velit doloremque iste laborum laboriosam?",
            img: "./statement.jpg",
        },
        {
            name: "Blanquette de Veau",
            price: 71,
            desc:
                "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusantium explicabo voluptates temporibus soluta.Ripit velit doloremque iste laborum laboriosam?",
            img: "./s.jpg",
        },
    ];

    const used = [];
    let tr;

    const func = () => {
        let i = document.getElementById("kiran");

        //=======================
        let temp = document.createElement("DIV");
        temp.classList.add("col-sm-3");
        temp.classList.add(style.col5);
        if (instinct === 0) {
            temp.style.left = `400%`;
        } else if (instinct === 1) {
            let ti = window.getComputedStyle(i.firstChild).width;
            let ar = Array.from(ti);
            ar.pop();
            ar.pop();
            ar = ar.join("");
            ar = Number(ar);
            let arr = Math.max(337.25, ar);
            temp.style.left = `${arr * 4}px`;
        }
        temp.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.2)),url(${used[0].img})`;
        temp.style.backgroundSize = `cover`;
        temp.innerHTML = `
            <div class=${style.innertext}>
                <h1>${used[0].name}</h1>
                <h3>${used[0].price}</h3>
            </div>
        `;
        i.appendChild(temp);

        //=========================

        const wid1 = window.getComputedStyle(i.firstChild).width;

        let trans = Array.from(i.childNodes);
        trans.forEach((ele, i) => {
            let ti = window.getComputedStyle(ele).width;
            let ar = Array.from(ti);
            ar.pop();
            ar.pop();
            ar = ar.join("");
            ar = Number(ar);

            if (instinct === 0) {
                ele.style.left = `${i * 100 - 100}%`;
            } else if (instinct === 1) {
                let arr = Math.max(337.25, ar);
                ele.style.left = `${i * arr - arr}px`;
            }
        });

        //=============================

        return new Promise((resolve, reject) => {
            setTimeout(() => {
                used.shift();
                i.removeChild(i.firstChild);
                resolve();
            }, 1500);
        });

        //===============================
    };
    let last = 4;

    //=====================================

    useEffect(() => {
        used.push(array[last]);

        setInterval(async () => {
            await func();
            last = (last + 1) % 8;
            used.push(array[last]);
        }, 9000);
    }, []);
    let instinct;

    window.addEventListener("DOMContentLoaded", (event) => {
        let col2 = document.getElementById("col_2");
        let col3 = document.getElementById("col_3");
        let col4 = document.getElementById("col_4");

        if (window.innerWidth >= 576) {
            let ti = window.getComputedStyle(col2).width;
            let ar = Array.from(ti);
            ar.pop();
            ar.pop();
            ar = ar.join("");
            ar = Number(ar);
            let arr = Math.max(337.25, ar);
            col2.style.left = `${arr}px`;
            col3.style.left = `${arr * 2}px`;
            col4.style.left = `${arr * 3}px`;
            instinct = 1;
        } else if (window.innerWidth < 576) {
            col2.style.left = `100%`;
            col3.style.left = `200%`;
            col4.style.left = `300%`;
            instinct = 0;
        }
    });

    //====================================

    window.addEventListener("resize", function (e) {
        let i = document.getElementById("kiran");
        let trans = Array.from(i.childNodes);

        if (window.innerWidth >= 576 && instinct != 1) {
            trans.forEach((ele, i) => {
                let ti = window.getComputedStyle(ele).width;
                let ar = Array.from(ti);
                ar.pop();
                ar.pop();
                ar = ar.join("");
                ar = Number(ar);
                let arr = Math.max(337.25, ar);
                ele.style.left = `${i * arr - arr}px`;
            });
            instinct = 1;
        } else if (window.innerWidth < 576 && instinct != 0) {
            trans.forEach((ele, i) => {
                ele.style.left = `${i * 100 - 100}%`;
            });
            instinct = 0;
        }
    });

    // ===================================

    return (
        <div className={style.home_carousel}>
            <h2 className={style.welcome_admin}>Discover</h2>
            <h1 className={style.order_header}>OUR GALLERY</h1>
            <a href="/menu">
                <Container
                    fluid
                    className={`mx-0 px-0`}
                    style={{ position: `relative` }}
                >
                    <Row id="kiran" className={style.main_carousel}>
                        <Col sm={3} className={style.col1}>
                            <div className={style.innertext}>
                                <h1>{array[0].name}</h1>
                                <h3>{array[0].price}</h3>
                            </div>
                        </Col>
                        <Col id="col_2" sm={3} className={style.col2}>
                            <div className={style.innertext}>
                                <h1>{array[1].name}</h1>
                                <h3>{array[1].price}</h3>
                            </div>
                        </Col>
                        <Col id="col_3" sm={3} className={style.col3}>
                            <div className={style.innertext}>
                                <h1>{array[2].name}</h1>
                                <h3>{array[2].price}</h3>
                            </div>
                        </Col>
                        <Col id="col_4" sm={3} className={style.col4}>
                            <div className={style.innertext}>
                                <h1>{array[3].name}</h1>
                                <h3>{array[3].price}</h3>
                            </div>
                        </Col>
                    </Row>
                    <div className={style.admin_svg}>
                        <svg
                            id="wave"
                            style={{
                                transform: `rotate(0deg)`,
                                transition: `0.3s`,
                            }}
                            viewBox="0 0 1440 100"
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <defs>
                                <linearGradient
                                    id="sw-gradient-0"
                                    x1="0"
                                    x2="0"
                                    y1="1"
                                    y2="0"
                                >
                                    <stop stop-color="#fff" offset="0%"></stop>
                                    <stop
                                        stop-color="#fff"
                                        offset="100%"
                                    ></stop>
                                </linearGradient>
                            </defs>
                            <path
                                style={{
                                    transform: `translate(0, 0px)`,
                                    opacity: `1`,
                                }}
                                fill="url(#sw-gradient-0)"
                                d="M0,90L120,78.3C240,67,480,43,720,43.3C960,43,1200,67,1440,63.3C1680,60,1920,30,2160,26.7C2400,23,2640,47,2880,46.7C3120,47,3360,23,3600,20C3840,17,4080,33,4320,33.3C4560,33,4800,17,5040,15C5280,13,5520,27,5760,38.3C6000,50,6240,60,6480,53.3C6720,47,6960,23,7200,25C7440,27,7680,53,7920,66.7C8160,80,8400,80,8640,70C8880,60,9120,40,9360,26.7C9600,13,9840,7,10080,5C10320,3,10560,7,10800,20C11040,33,11280,57,11520,63.3C11760,70,12000,60,12240,51.7C12480,43,12720,37,12960,43.3C13200,50,13440,70,13680,70C13920,70,14160,50,14400,41.7C14640,33,14880,37,15120,38.3C15360,40,15600,40,15840,35C16080,30,16320,20,16560,23.3C16800,27,17040,43,17160,51.7L17280,60L17280,100L17160,100C17040,100,16800,100,16560,100C16320,100,16080,100,15840,100C15600,100,15360,100,15120,100C14880,100,14640,100,14400,100C14160,100,13920,100,13680,100C13440,100,13200,100,12960,100C12720,100,12480,100,12240,100C12000,100,11760,100,11520,100C11280,100,11040,100,10800,100C10560,100,10320,100,10080,100C9840,100,9600,100,9360,100C9120,100,8880,100,8640,100C8400,100,8160,100,7920,100C7680,100,7440,100,7200,100C6960,100,6720,100,6480,100C6240,100,6000,100,5760,100C5520,100,5280,100,5040,100C4800,100,4560,100,4320,100C4080,100,3840,100,3600,100C3360,100,3120,100,2880,100C2640,100,2400,100,2160,100C1920,100,1680,100,1440,100C1200,100,960,100,720,100C480,100,240,100,120,100L0,100Z"
                            ></path>
                        </svg>
                    </div>
                    <div className={style.admin_svg2}>
                        <svg
                            id="wave"
                            style={{
                                transform: `rotate(180deg)`,
                                transition: `0.3s`,
                            }}
                            viewBox="0 0 1440 100"
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <defs>
                                <linearGradient
                                    id="sw-gradient-0"
                                    x1="0"
                                    x2="0"
                                    y1="1"
                                    y2="0"
                                >
                                    <stop stop-color="#fff" offset="0%"></stop>
                                    <stop
                                        stop-color="#fff"
                                        offset="100%"
                                    ></stop>
                                </linearGradient>
                            </defs>
                            <path
                                style={{
                                    transform: `translate(0, 0px)`,
                                    opacity: `1`,
                                }}
                                fill="url(#sw-gradient-0)"
                                d="M0,90L120,78.3C240,67,480,43,720,43.3C960,43,1200,67,1440,63.3C1680,60,1920,30,2160,26.7C2400,23,2640,47,2880,46.7C3120,47,3360,23,3600,20C3840,17,4080,33,4320,33.3C4560,33,4800,17,5040,15C5280,13,5520,27,5760,38.3C6000,50,6240,60,6480,53.3C6720,47,6960,23,7200,25C7440,27,7680,53,7920,66.7C8160,80,8400,80,8640,70C8880,60,9120,40,9360,26.7C9600,13,9840,7,10080,5C10320,3,10560,7,10800,20C11040,33,11280,57,11520,63.3C11760,70,12000,60,12240,51.7C12480,43,12720,37,12960,43.3C13200,50,13440,70,13680,70C13920,70,14160,50,14400,41.7C14640,33,14880,37,15120,38.3C15360,40,15600,40,15840,35C16080,30,16320,20,16560,23.3C16800,27,17040,43,17160,51.7L17280,60L17280,100L17160,100C17040,100,16800,100,16560,100C16320,100,16080,100,15840,100C15600,100,15360,100,15120,100C14880,100,14640,100,14400,100C14160,100,13920,100,13680,100C13440,100,13200,100,12960,100C12720,100,12480,100,12240,100C12000,100,11760,100,11520,100C11280,100,11040,100,10800,100C10560,100,10320,100,10080,100C9840,100,9600,100,9360,100C9120,100,8880,100,8640,100C8400,100,8160,100,7920,100C7680,100,7440,100,7200,100C6960,100,6720,100,6480,100C6240,100,6000,100,5760,100C5520,100,5280,100,5040,100C4800,100,4560,100,4320,100C4080,100,3840,100,3600,100C3360,100,3120,100,2880,100C2640,100,2400,100,2160,100C1920,100,1680,100,1440,100C1200,100,960,100,720,100C480,100,240,100,120,100L0,100Z"
                            ></path>
                        </svg>
                    </div>
                </Container>
            </a>
        </div>
    );
};

export default Home_carousel;
