import React, { useRef, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import style from "./styles/Home_carousel.module.css";

const Home_carousel = () => {
    const array = [
        {
            name: "Dal Khichdi",
            price: 23,
            desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusantium explicabo voluptates temporibus soluta.Ripit velit doloremque iste laborum laboriosam?",
            img: "./food2.jpg",
        },
        {
            name: "Dal Khichdi",
            price: 34,
            desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusantium explicabo voluptates temporibus soluta.Ripit velit doloremque iste laborum laboriosam?",
            img: "./food3.jpg",
        },
        {
            name: "Dal Khichdi",
            price: 34,
            desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusantium explicabo voluptates temporibus soluta.Ripit velit doloremque iste laborum laboriosam?",
            img: "./s.jpg",
        },
        {
            name: "Dal Khichdi",
            price: 30,
            desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusantium explicabo voluptates temporibus soluta.Ripit velit doloremque iste laborum laboriosam?",
            img: "./images/shaun_meintjes.jpg",
        },
        {
            name: "Dal Khichdi",
            price: 98,
            desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusantium explicabo voluptates temporibus soluta.Ripit velit doloremque iste laborum laboriosam?",
            img: "./judith-girard-marczak-26Tp__tUAWc-unsplash.jpg",
        },
        {
            name: "Dal Khichdi",
            price: 25,
            desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusantium explicabo voluptates temporibus soluta.Ripit velit doloremque iste laborum laboriosam?",
            img: "./food3.jpg",
        },
        {
            name: "Dal Khichdi",
            price: 45,
            desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusantium explicabo voluptates temporibus soluta.Ripit velit doloremque iste laborum laboriosam?",
            img: "./food2.jpg",
        },
        {
            name: "Dal Khichdi",
            price: 63,
            desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusantium explicabo voluptates temporibus soluta.Ripit velit doloremque iste laborum laboriosam?",
            img: "./statement.jpg",
        },
        {
            name: "Dal Khichdi",
            price: 71,
            desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusantium explicabo voluptates temporibus soluta.Ripit velit doloremque iste laborum laboriosam?",
            img: "./s.jpg",
        },
    ];

    const used = [];

    // const first = useRef();

    const func = () => {
        let i = document.getElementById("kiran");
        let temp = document.createElement("DIV");
        temp.classList.add("col-md-3");
        temp.classList.add("col-sm-6");
        temp.classList.add(style.col5);
        temp.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.33)),url(${used[0].img})`;
        temp.style.backgroundSize = `cover`;
        temp.innerHTML = `
			<div class=${style.innertext}>
				<h1>${used[0].name}</h1>
				<h3>${used[0].price}</h3>
			</div>
		`;
        i.appendChild(temp);
        const wid1 = window.getComputedStyle(i.firstChild).width;

        // i.firstChild.style.transform = `translateX(-${wid1})`;
        let trans = Array.from(i.childNodes);
        trans.forEach((ele) => {
            let ti = window.getComputedStyle(ele).width;
            let ar = Array.from(ti);
            ar.pop();
            ar.pop();
            ar = ar.join("");
            ar = Number(ar);
            let movement = ele.offsetLeft - ar;
            ele.style.left = `${movement}px`;
        });
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                used.shift();
                i.removeChild(i.firstChild);
                resolve();
            }, 1500);
        });
        // i.removeChild(i.firstChild);
    };
    let last = 4;
    useEffect(() => {
        used.push(array[last]);

        let col2 = document.getElementById("col_2");
        let col3 = document.getElementById("col_3");
        let col4 = document.getElementById("col_4");

        let ti = window.getComputedStyle(col2).width;
        let ar = Array.from(ti);
        ar.pop();
        ar.pop();
        ar = ar.join("");
        ar = Number(ar);
        console.log(ar, "the value of ar is");
        col2.style.left = `${ar}px`;
        col3.style.left = `${ar * 2}px`;
        col4.style.left = `${ar * 3}px`;

        setInterval(async () => {
            await func();
            last = (last + 1) % 8;
            used.push(array[last]);
        }, 9000);
    }, []);

    return (
        <div className="home_carousel">
            <Container fluid className="mx-0">
                <Row id="kiran" className={style.main_carousel}>
                    <Col md={3} sm={6} className={style.col1}>
                        <div className={style.innertext}>
                            <h1>{array[0].name}</h1>
                            <h3>{array[0].price}</h3>
                        </div>
                    </Col>
                    <Col id="col_2" md={3} sm={6} className={style.col2}>
                        <div className={style.innertext}>
                            <h1>{array[1].name}</h1>
                            <h3>{array[1].price}</h3>
                        </div>
                    </Col>
                    <Col id="col_3" md={3} sm={6} className={style.col3}>
                        <div className={style.innertext}>
                            <h1>{array[2].name}</h1>
                            <h3>{array[2].price}</h3>
                        </div>
                    </Col>
                    <Col id="col_4" md={3} sm={6} className={style.col4}>
                        <div className={style.innertext}>
                            <h1>{array[3].name}</h1>
                            <h3>{array[3].price}</h3>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Home_carousel;
