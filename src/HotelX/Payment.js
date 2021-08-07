import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import firebase from "firebase";
import db from "./firebase";
import Success_svg from "./Success_svg";
import { gsap } from "gsap";
import { useAuthState } from "react-firebase-hooks/auth";
import DeleteForeverOutlinedIcon from "@material-ui/icons/DeleteForeverOutlined";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import No_user from "./No_user";
import Style from "./styles/stripe.module.css";
const auth = firebase.auth();
const cardStyle = {
    style: {
        base: {
            color: "#162d3d",
            fontFamily: "Arial, sans-serif",
            fontSmoothing: "antialiased",
            fontSize: "20px",
            "::placeholder": {
                color: "rgba(0,0,0)",
            },
        },
        invalid: {
            color: "#fa755a",
            iconColor: "#fa755a",
        },
    },
};
const key =
    "pk_test_51JEFvSSINgwrzeuQ6l6y9KO3UIJs1kFMQ6r9K1vT5u1gp8OScXLZdS1bguBIan5TWWya533gt5ymFrsVE7WIuYob00SEVSnc8G";

const stripeTestPromise = loadStripe(key);

const months = {
    1: "Jan",
    2: "Feb",
    3: "Mar",
    4: "Apr",
    5: "May",
    6: "Jun",
    7: "Jul",
    8: "Aug",
    9: "Sep",
    10: "Oct",
    11: "Nov",
    12: "Dec",
};

// =======================================
function Stripe1() {
    return (
        <Elements stripe={stripeTestPromise}>
            <PaymentForm />
        </Elements>
    );
}
// =======================================
const body_success = React.createRef();
const svg_success = React.createRef();
function Scroller() {
    const scroller = React.createRef();
    useEffect(() => {
        // const tl = gsap.timeline({ delay: 4 });
        const tl = gsap.timeline();
        tl.fromTo(
            scroller.current,
            0.9,
            { x: "-100%", backgroundColor: "rgb(0, 191, 166)" },
            { x: "0%", backgroundColor: "black" },
            "-=0.5"
        )
            .fromTo(scroller.current, 0.65, { x: "0%" }, { x: "100%" })
            .fromTo(
                body_success.current,
                0.7,
                { x: "-100%", opacity: 0 },
                { x: "0%", opacity: 1 },
                "-=0.5"
            )
            .fromTo(
                svg_success.current,
                0.5,
                { y: "50", opacity: 0 },
                { y: "0", opacity: 1 },
                "-=0.3"
            );
    }, []);
    return <div className={Style.scroller} ref={scroller}></div>;
}

// =======================================

function PaymentForm() {
    const [user] = useAuthState(auth);
    const [showItem, setShowItem] = useState(false);
    const [success, setSuccess] = useState(false);
    const [Tprice, setPrice] = useState();
    const stripe = useStripe();
    const [item, setItem] = useState([]);
    const [loader, setLoader] = useState(false);
    const elements = useElements();

    useEffect(() => {
        if (user) {
            const cart = db
                .collection("users")
                .doc(user.uid)
                .collection("My-cart");
            cart.onSnapshot((snapshot) => {
                setItem(snapshot.docs);
                let price = 0;
                snapshot.docs.forEach((doc) => {
                    price += Number(doc.data().price) * doc.data().quantity;
                });
                setPrice(price);
            });
        }
    }, [user]);

    useEffect(() => {
        window.addEventListener("DOMContentLoaded", (e) => {
            let main_navbar = document.getElementById("main_navbar");
            let link_list = Array.from(document.querySelectorAll(".n2"));
            console.log(main_navbar, "the navbar inside the payment portal");
            window.scrollTo(0, 11);
            main_navbar.classList.remove("jumbotron_home");
            link_list.forEach((link) => {
                link.classList.remove("jumbotron_links");
            });
            main_navbar.classList.add("dark");
            link_list.forEach((link) => {
                link.classList.add("dark_link");
            });
        });
    }, []);

    const remove_item = (e, id) => {
        console.log(id);
        const cart = db.collection("users").doc(user.uid).collection("My-cart");
        cart.doc(id).delete();
    };

    const remove = async (e, id) => {
        return db
            .collection("users")
            .doc(user.uid)
            .collection("My-cart")
            .get()
            .then((snapshot) => {
                snapshot.docs.forEach(async (doc) => {
                    await db
                        .collection("users")
                        .doc(user.uid)
                        .collection("My-cart")
                        .doc(doc.id)
                        .delete();
                });
                return;
            });
    };

    const placeorder = (e) => {
        const order = [];
        // console.log(item);
        let name;
        db.collection("users")
            .doc(user.uid)
            .get()
            .then((doc) => {
                name = doc.data().name;
                item.forEach((item) => {
                    // console.log(item.data());
                    order.push(item.data());
                });

                db.collection("orders")
                    .add({
                        name,
                        order,
                    })
                    .then(async (res) => {
                        // console.log(res.id);
                        let newObj = new Date();
                        let month = newObj.getUTCMonth() + 1;
                        let day = newObj.getUTCDate();
                        let year = newObj.getUTCFullYear();
                        let date = `${day} ${months[month]} ${year}`;
                        let am = true;
                        let hours = newObj.getHours();
                        if (hours > 12) {
                            am = false;
                            hours -= 12;
                        }
                        let min = newObj.getMinutes();
                        let time = am
                            ? `${hours}:${min} AM`
                            : `${hours}:${min} PM`;
                        db.collection("users")
                            .doc(user.uid)
                            .collection("history")
                            .add({
                                date,
                                time,
                                id: res.id,
                                order,
                            })
                            .then(() => {
                                console.log("added history Successfully");
                            });
                        await remove();
                    });
            });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement),
        });

        if (!error) {
            try {
                const { id } = paymentMethod;
                const response = await axios.post(
                    "https://leafyclimate.kirantirunagiri.repl.co/payment",
                    {
                        amount: Tprice,
                        id: id,
                    }
                );

                if (response.data.success) {
                    console.log("Successful payment");
                    setSuccess(true);
                    placeorder();
                }
            } catch (error) {
                console.log("Error", error);
            }
        } else {
            console.log(error.message);
        }
    };
    // console.log(item, "this is the value of the item");
    return (
        <div>
            {user ? (
                !success ? (
                    <>
                        <Container fluid className={Style.payment_cont}>
                            <Row className={Style.payment_row}>
                                <Col className={Style.img_col}></Col>
                                <Col className={Style.card_col}>
                                    <Card className={Style.payment_card}>
                                        <Card.Body>
                                            <Card.Title className="display-5 mb-4">
                                                Order Summary
                                            </Card.Title>
                                            {item.length !== 0 &&
                                                item.map((i, index) => {
                                                    return (
                                                        <Card.Subtitle
                                                            className={
                                                                Style.list_group_item
                                                            }
                                                        >
                                                            <small className="text-muted">
                                                                {i.data().name}
                                                            </small>
                                                            <small className="mx-1">
                                                                x
                                                            </small>
                                                            <small className="text-muted">
                                                                {
                                                                    i.data()
                                                                        .quantity
                                                                }
                                                            </small>
                                                            <small
                                                                className="text-muted"
                                                                style={{
                                                                    marginLeft: `auto`,
                                                                    marginRight: `0.2rem`,
                                                                }}
                                                            >
                                                                &#8377;
                                                                {i.data()
                                                                    .price *
                                                                    i.data()
                                                                        .quantity}
                                                            </small>
                                                            <small>
                                                                <button
                                                                    onClick={(
                                                                        e
                                                                    ) =>
                                                                        remove_item(
                                                                            e,
                                                                            i.id
                                                                        )
                                                                    }
                                                                    type="submit"
                                                                    class="btn btn-sm btn-danger px-1 mx-1"
                                                                    style={{
                                                                        textAlign: `center`,
                                                                    }}
                                                                >
                                                                    <DeleteForeverOutlinedIcon
                                                                        style={{
                                                                            color: `white`,
                                                                        }}
                                                                    />
                                                                </button>
                                                            </small>
                                                        </Card.Subtitle>
                                                    );
                                                })}
                                            {item.length === 0 && (
                                                <>
                                                    <div>
                                                        Shopping cart empty
                                                    </div>
                                                    <a
                                                        href="/menu"
                                                        type="button"
                                                        class="btn  btn-rounded  btn-dark mt-4"
                                                    >
                                                        Back to menu
                                                    </a>
                                                </>
                                            )}
                                            {item.length !== 0 ? (
                                                <div
                                                    className={
                                                        Style.total_price
                                                    }
                                                >
                                                    <h3
                                                        style={{
                                                            display: `inline-block`,
                                                        }}
                                                    >
                                                        Total
                                                    </h3>
                                                    <h3
                                                        style={{
                                                            marginLeft: `auto`,
                                                            display: `inline`,
                                                        }}
                                                    >
                                                        &#8377;{Tprice}
                                                    </h3>
                                                </div>
                                            ) : (
                                                ""
                                            )}
                                            {item.length !== 0 ? (
                                                <>
                                                    <Card.Title className="display-6 mb-3">
                                                        Card Details
                                                    </Card.Title>
                                                    <form
                                                        id="payment-form"
                                                        onSubmit={handleSubmit}
                                                    >
                                                        <CardElement
                                                            id="card"
                                                            style={{
                                                                borderBottom: `1px solid rgba(0,0,0,0.4)`,
                                                            }}
                                                        />
                                                        <button
                                                            class="btn btn-dark btn-block mt-4"
                                                            type="submit"
                                                            id="pay-id"
                                                        >
                                                            <div
                                                                onClick={() => {
                                                                    setLoader(
                                                                        true
                                                                    );
                                                                }}
                                                                class="d-flex justify-content-center align-items-center"
                                                            >
                                                                <div
                                                                    className={`spinner-grow ${Style.spinner}`}
                                                                    role="status"
                                                                    style={
                                                                        loader
                                                                            ? {
                                                                                  display: `unset`,
                                                                                  marginRight: `0.23rem`,
                                                                              }
                                                                            : {
                                                                                  display: `none`,
                                                                              }
                                                                    }
                                                                >
                                                                    <span class="visually-hidden">
                                                                        Loading...
                                                                    </span>
                                                                </div>
                                                                pay
                                                            </div>
                                                        </button>
                                                    </form>
                                                </>
                                            ) : (
                                                ""
                                            )}
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                        </Container>
                    </>
                ) : (
                    <>
                        <Container fluid className={Style.success_cont}>
                            <Scroller />

                            <div className={Style.svg_img} ref={svg_success}>
                                <Success_svg />
                            </div>
                            <Row
                                className={Style.success_row}
                                ref={body_success}
                            >
                                <Col className={Style.payment_succ_col}>
                                    <Card className={Style.success_card}>
                                        <Card.Body
                                            className={Style.success_body}
                                        >
                                            <Card.Title className="display-4 mb-4">
                                                Order Confirmed
                                            </Card.Title>
                                            <Card.Subtitle>
                                                <div
                                                    className={` mb-4 ${Style.list_item}`}
                                                    style={{
                                                        color: `#00bfa6`,
                                                    }}
                                                >
                                                    Order placed
                                                </div>
                                                <div
                                                    className={`mb-4 ${Style.list_item} ${Style.link_item1}`}
                                                >
                                                    Preparing order
                                                </div>
                                                <div
                                                    className={`text-muted mb-4 ${Style.list_item}`}
                                                >
                                                    Successfully delivered
                                                </div>
                                            </Card.Subtitle>
                                            <a
                                                type="button"
                                                href="/"
                                                class="btn btn-dark btn-rounded my-5"
                                                style={{
                                                    transform: `translateY(0px)`,
                                                }}
                                            >
                                                back to home
                                            </a>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                        </Container>
                    </>
                )
            ) : (
                <>
                    <Container
                        fluid
                        className={Style.no_user_cont}
                        style={{ marginTop: `19vh` }}
                    >
                        <div className={Style.svg_img2}>
                            <No_user />
                        </div>
                        <Row className={Style.no_user_row}>
                            <div className={Style.no_user_div}>
                                <h4 className="display-5 mb-4">
                                    No User Is
                                    <br /> Currently{" "}
                                    <span style={{ color: `coral` }}>
                                        Logged
                                    </span>{" "}
                                    In
                                </h4>
                                <a
                                    href="/"
                                    type="button"
                                    class="btn btn-dark btn-rounded mb-4"
                                >
                                    Back to Home
                                </a>
                            </div>
                        </Row>
                    </Container>
                </>
            )}
        </div>
    );
}

// =======================================

// =======================================
function Payment() {
    return (
        <div className={Style.App}>
            <Stripe1 />
        </div>
    );
}
// =======================================

export default Payment;
