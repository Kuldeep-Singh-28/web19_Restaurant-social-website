import React, { useRef, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import style from "./styles/Home_carousel.module.css";

const Home_carousel = () => {
    const array = [
        {
            name: "Dal Khichdi",
            price: 23,
            desc:
                "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusantium explicabo voluptates temporibus soluta.Ripit velit doloremque iste laborum laboriosam?",
            img: "./food2.jpg",
        },
        {
            name: "Dal Khichdi",
            price: 34,
            desc:
                "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusantium explicabo voluptates temporibus soluta.Ripit velit doloremque iste laborum laboriosam?",
            img: "./food3.jpg",
        },
        {
            name: "Dal Khichdi",
            price: 34,
            desc:
                "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusantium explicabo voluptates temporibus soluta.Ripit velit doloremque iste laborum laboriosam?",
            img: "./s.jpg",
        },
        {
            name: "Dal Khichdi",
            price: 30,
            desc:
                "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusantium explicabo voluptates temporibus soluta.Ripit velit doloremque iste laborum laboriosam?",
            img: "./images/shaun_meintjes.jpg",
        },
        {
            name: "Dal Khichdi",
            price: 98,
            desc:
                "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusantium explicabo voluptates temporibus soluta.Ripit velit doloremque iste laborum laboriosam?",
            img: "./judith-girard-marczak-26Tp__tUAWc-unsplash.jpg",
        },
        {
            name: "Dal Khichdi",
            price: 25,
            desc:
                "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusantium explicabo voluptates temporibus soluta.Ripit velit doloremque iste laborum laboriosam?",
            img: "./food3.jpg",
        },
        {
            name: "Dal Khichdi",
            price: 45,
            desc:
                "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusantium explicabo voluptates temporibus soluta.Ripit velit doloremque iste laborum laboriosam?",
            img: "./food2.jpg",
        },
        {
            name: "Dal Khichdi",
            price: 63,
            desc:
                "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusantium explicabo voluptates temporibus soluta.Ripit velit doloremque iste laborum laboriosam?",
            img: "./statement.jpg",
        },
        {
            name: "Dal Khichdi",
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
        <a href="/menu">
            <div className={style.home_carousel}>
                <Container fluid className="mx-0">
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
                </Container>
            </div>
        </a>
    );
};

export default Home_carousel;
