import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import firebase from "firebase";
import db from "./firebase";
import Success_svg from "./Success_svg";
import { useAuthState } from "react-firebase-hooks/auth";
import DeleteForeverOutlinedIcon from "@material-ui/icons/DeleteForeverOutlined";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
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

// =======================================
function Stripe1() {
    return (
        <Elements stripe={stripeTestPromise}>
            <PaymentForm />
        </Elements>
    );
}
// =======================================

// =======================================

function PaymentForm() {
    const [user] = useAuthState(auth);
    const [showItem, setShowItem] = useState(false);
    const [success, setSuccess] = useState(false);
    const [Tprice, setPrice] = useState();
    const stripe = useStripe();
    const [item, setItem] = useState([]);
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
                    .then(async () => {
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
                    "https://LeafyClimate.kirantirunagiri.repl.co:4000/payment",
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
            {!success ? (
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
                                                            {i.data().quantity}
                                                        </small>
                                                        <small
                                                            className="text-muted"
                                                            style={{
                                                                marginLeft: `auto`,
                                                                marginRight: `0.2rem`,
                                                            }}
                                                        >
                                                            &#8377;
                                                            {i.data().price *
                                                                i.data()
                                                                    .quantity}
                                                        </small>
                                                        <small>
                                                            <button
                                                                onClick={(e) =>
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
                                            <div>Shopping cart empty</div>
                                        )}
                                        {item.length !== 0 ? (
                                            <div className={Style.total_price}>
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
                                                    >
                                                        Pay
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
                        <div className={Style.svg_img}>
                            <Success_svg />
                        </div>
                        <Row className={Style.success_row}>
                            <Col className={Style.payment_succ_col}>
                                <Card className={Style.success_card}>
                                    <Card.Body className={Style.success_body}>
                                        <Card.Title className="display-4 mb-4">
                                            Order Confirmed
                                        </Card.Title>
                                        <Card.Subtitle>
                                            <div
                                                className={` mb-4 ${Style.list_item}`}
                                                style={{ color: `#00bfa6` }}
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
