import React, { useState, useEffect } from "react";
import db, { storage } from "./firebase";
import firebase from "firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Style from "./styles/Admin.module.css";
import No_user from "./No_user";
import "./styles/Admin.css";
import {
    Form,
    Button,
    Container,
    Row,
    Col,
    Modal,
    Accordion,
    Card,
    CardColumns,
    ListGroup,
    ListGroupItem,
} from "react-bootstrap";
const auth = firebase.auth();

function Admin() {
    const [user] = useAuthState(auth);
    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [price, setPrice] = useState("");
    const [type, setType] = useState("");
    const [email, setEmail] = useState("");
    const [id, setId] = useState("");
    //const [url, setUrl] = useState("");
    const [res_orders, setOrders] = useState([]);

    const [show3, setShow3] = useState(false);
    const [show4, setShow4] = useState(false);

    // =======================================================
    const handleClose3 = () => setShow3(false);
    const handleShow3 = () => setShow3(true);

    const handleClose4 = () => setShow4(false);
    const handleShow4 = () => setShow4(true);
    const onImageChange = (e) => {
        const reader = new FileReader();
        let file = e.target.files[0];
        if (file) {
            reader.onload = () => {
                if (reader.readyState === 2) {
                    console.log(file);
                    setImage(file);
                }
            };
            reader.readAsDataURL(e.target.files[0]);
        } else {
            setImage(null); // if there is no file, set image back to null
        }
    };
    const uploadToFirebase = async () => {
        if (image) {
            const storageRef = storage.ref(`images/${type}`);
            const uploadTask = storageRef.child(name).put(image);
            console.log(storageRef, "i am here");
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log("Upload is " + progress + "% done");
                },
                (error) => {
                    // Handle unsuccessful uploads
                    console.log("error:-", error);
                },
                () => {
                    uploadTask.snapshot.ref
                        .getDownloadURL()
                        .then((downloadURL) => {
                            console.log("File available at", downloadURL);
                            if (type) {
                                console.log("the type is available");
                                db.collection("dishes")
                                    .doc("dish")
                                    .collection(type)
                                    .add({
                                        name: name,
                                        price: Number(price),
                                        quantity: 1,
                                        url: downloadURL.toString(),
                                    })
                                    .then(() => {
                                        console.log(
                                            "Document successfully written!"
                                        );
                                    })
                                    .catch((error) => {
                                        console.error(
                                            "Error writing document: ",
                                            error
                                        );
                                    });
                            }
                        });
                }
            );
        }
    };

    // ========================================================

    // ========================================================
    const submit = async (e) => {
        e.preventDefault();
        await uploadToFirebase();
    };

    const submit1 = (e) => {
        e.preventDefault();
        db.collection("Admin")
            .add({
                email: email,
                id: id,
            })
            .then(() => {
                console.log("new admin has been successfully added");
            });
        setType("");
        setName("");
        setPrice("");
        setImage("");
    };

    const deleteOrder = (e, id) => {
        e.preventDefault();
        db.collection("orders")
            .doc(id)
            .delete()
            .then(() => {
                console.log("the orders has been successfully deleted");
            })
            .catch((err) => console.log(err.message));
    };

    let instinct4 = 0;

    useEffect(() => {
        const navbar_admin = document.querySelector(".navbar2");
        const navbar_links = document.querySelectorAll(".n2");
        navbar_admin.style.backdropFilter = `blur(0px)`;
        navbar_admin.style.backgroundColor = `transparent`;

        setTimeout(() => {
            const right = document.getElementById("right");
            right.style.textDecoration = `underline`;
            right.style.textDecorationColor = `coral`;
            right.style.textDecorationThickness = `2px`;
            right.style.textUnderlineOffset = `5px`;
        }, 6000);

        window.addEventListener("DOMContentLoaded", (e) => {
            const navbar_admin = document.querySelector(".navbar2");
            let link_list = Array.from(document.querySelectorAll(".n2"));
            if (window.scrollY < 80) {
                navbar_admin.classList.add("page_top");
                link_list.forEach((link) => {
                    link.classList.add("top_link");
                });
                instinct4 = 0;
            } else {
                navbar_admin.classList.add("page_bottom");
                link_list.forEach((link) => {
                    link.classList.add("bottom_link");
                });
                instinct4 = 1;
            }
        });

        window.addEventListener("scroll", (e) => {
            const navbar_admin = document.querySelector(".navbar2");
            let link_list = Array.from(document.querySelectorAll(".n2"));
            if (window.scrollY < 80 && instinct4 !== 0) {
                navbar_admin.classList.add("page_top");
                navbar_admin.classList.remove("page_bottom");
                link_list.forEach((link) => {
                    link.classList.add("top_link");
                    link.classList.remove("bottom_link");
                });
                instinct4 = 0;
            } else if (window.scrollY >= 80 && instinct4 !== 1) {
                navbar_admin.classList.remove("page_top");
                navbar_admin.classList.add("page_bottom");
                link_list.forEach((link) => {
                    link.classList.remove("top_link");
                    link.classList.add("bottom_link");
                });
                instinct4 = 1;
            }
        });

        db.collection("orders").onSnapshot(
            (snapshot) => {
                setOrders(snapshot.docs);
            },
            (err) => console.log(err.message)
        );
    }, []);

    //=========================================================

    return (
        <div className={Style.admin}>
            {user ? (
                <>
                    <div className={Style.background_image_admin}>
                        <div className={Style.header_container}>
                            <h2 className={Style.welcome_admin}>Welcome to</h2>
                            <h1 className={Style.order_header}>ORDERS PAGE</h1>
                            <small style={{ color: `white`, fontSize: `12px` }}>
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit.
                            </small>
                            <a
                                href="/"
                                style={{ zIndex: `100` }}
                                class="btn btn-light btn-rounded mt-5"
                            >
                                Back to home
                            </a>
                        </div>
                        <div className={Style.admin_svg}>
                            <svg
                                id="wave"
                                // style="transform:rotate(0deg); transition: 0.3s"
                                style={{
                                    transform: `rotate(0deg)`,
                                    transition: `0.3s`,
                                }}
                                viewBox="0 0 1440 140"
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
                                        <stop
                                            stop-color="seashell"
                                            offset="0%"
                                        ></stop>
                                        <stop
                                            stop-color="seashell"
                                            offset="100%"
                                        ></stop>
                                    </linearGradient>
                                </defs>
                                <path
                                    // style="transform:translate(0, 0px); opacity:1"
                                    style={{
                                        transform: `translate(0, 0px)`,
                                        opacity: `1`,
                                    }}
                                    fill="url(#sw-gradient-0)"
                                    d="M0,56L120,63C240,70,480,84,720,86.3C960,89,1200,79,1440,63C1680,47,1920,23,2160,30.3C2400,37,2640,75,2880,77C3120,79,3360,47,3600,39.7C3840,33,4080,51,4320,51.3C4560,51,4800,33,5040,35C5280,37,5520,61,5760,72.3C6000,84,6240,84,6480,84C6720,84,6960,84,7200,81.7C7440,79,7680,75,7920,81.7C8160,89,8400,107,8640,109.7C8880,112,9120,98,9360,93.3C9600,89,9840,93,10080,95.7C10320,98,10560,98,10800,88.7C11040,79,11280,61,11520,65.3C11760,70,12000,98,12240,91C12480,84,12720,42,12960,28C13200,14,13440,28,13680,30.3C13920,33,14160,23,14400,18.7C14640,14,14880,14,15120,18.7C15360,23,15600,33,15840,30.3C16080,28,16320,14,16560,28C16800,42,17040,84,17160,105L17280,126L17280,140L17160,140C17040,140,16800,140,16560,140C16320,140,16080,140,15840,140C15600,140,15360,140,15120,140C14880,140,14640,140,14400,140C14160,140,13920,140,13680,140C13440,140,13200,140,12960,140C12720,140,12480,140,12240,140C12000,140,11760,140,11520,140C11280,140,11040,140,10800,140C10560,140,10320,140,10080,140C9840,140,9600,140,9360,140C9120,140,8880,140,8640,140C8400,140,8160,140,7920,140C7680,140,7440,140,7200,140C6960,140,6720,140,6480,140C6240,140,6000,140,5760,140C5520,140,5280,140,5040,140C4800,140,4560,140,4320,140C4080,140,3840,140,3600,140C3360,140,3120,140,2880,140C2640,140,2400,140,2160,140C1920,140,1680,140,1440,140C1200,140,960,140,720,140C480,140,240,140,120,140L0,140Z"
                                ></path>
                            </svg>
                        </div>
                    </div>
                    <Container fluid className={Style.parent_container}>
                        <div className={Style.parent_row}>
                            <div sm={3} className={Style.sidebar}>
                                <Button
                                    variant="primary"
                                    className={Style.btn1}
                                    onClick={handleShow3}
                                >
                                    New Item
                                </Button>
                                <br />
                                <Button
                                    variant="primary"
                                    className={Style.btn2}
                                    onClick={handleShow4}
                                >
                                    New Admin
                                </Button>
                            </div>
                            <div sm={9} className={Style.orders}>
                                <Container fluid>
                                    <Row
                                        id="main-row"
                                        className={Style.main_row}
                                    >
                                        <CardColumns
                                            className={Style.accordion}
                                        >
                                            {res_orders.map((order, index) => {
                                                let price_tot = 0;
                                                for (let i of order.data()
                                                    .order) {
                                                    price_tot +=
                                                        i.price * i.quantity;
                                                }
                                                return (
                                                    <Card
                                                        className={Style.card}
                                                    >
                                                        <Card.Body
                                                            className={
                                                                Style.card_body
                                                            }
                                                        >
                                                            <Card.Title
                                                                className={
                                                                    Style.title
                                                                }
                                                            >
                                                                <span>
                                                                    {
                                                                        order.data()
                                                                            .name
                                                                    }
                                                                </span>
                                                                <span className="text-muted">
                                                                    &#8377;
                                                                    {price_tot}
                                                                </span>
                                                            </Card.Title>
                                                        </Card.Body>
                                                        <ListGroup variant="flush">
                                                            {order
                                                                .data()
                                                                .order.map(
                                                                    (item) => {
                                                                        return (
                                                                            <ListGroupItem>
                                                                                <small className="text-muted">
                                                                                    {
                                                                                        item.name
                                                                                    }
                                                                                </small>
                                                                                {
                                                                                    " x "
                                                                                }
                                                                                <small className="text-muted">
                                                                                    {
                                                                                        item.quantity
                                                                                    }
                                                                                </small>
                                                                            </ListGroupItem>
                                                                        );
                                                                    }
                                                                )}
                                                        </ListGroup>
                                                        <Card.Body>
                                                            <Button
                                                                variant="primary"
                                                                style={{
                                                                    backgroundColor: `orangered`,
                                                                    borderColor: `orangered`,
                                                                }}
                                                                onClick={(e) =>
                                                                    deleteOrder(
                                                                        e,
                                                                        order.id
                                                                    )
                                                                }
                                                            >
                                                                <small>
                                                                    Ready For
                                                                    Delivery
                                                                </small>
                                                            </Button>
                                                        </Card.Body>
                                                    </Card>
                                                );
                                            })}
                                        </CardColumns>
                                    </Row>
                                </Container>
                            </div>
                        </div>
                    </Container>
                    <Modal
                        className={Style.model_dialog}
                        show={show3}
                        onHide={handleClose3}
                    >
                        <Modal.Header closeButton></Modal.Header>
                        <Modal.Body>
                            <div className={Style.login_prompt}>
                                <h1
                                    style={{ color: `#20303c` }}
                                    className={Style.header_login}
                                >
                                    Add Recipe
                                </h1>
                            </div>
                            <form>
                                <div class="row mb-4">
                                    <div class="col">
                                        <div class="form-outline">
                                            <input
                                                type="text"
                                                id="form3Example1"
                                                className={`form-control ${Style.input_field}`}
                                                onChange={(e) =>
                                                    setType(e.target.value)
                                                }
                                            />
                                            <label
                                                class="form-label"
                                                for="form3Example1"
                                            >
                                                Type
                                            </label>
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="form-outline">
                                            <input
                                                type="text"
                                                id="form3Example2"
                                                className={`form-control ${Style.input_field}`}
                                                onChange={(e) =>
                                                    setPrice(e.target.value)
                                                }
                                            />
                                            <label
                                                class="form-label"
                                                for="form3Example2"
                                            >
                                                Price
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div class="form-outline mb-4">
                                    <input
                                        type="text"
                                        id="form3Example3"
                                        className={`form-control ${Style.input_field}`}
                                        onChange={(e) =>
                                            setName(e.target.value)
                                        }
                                    />
                                    <label
                                        class="form-label"
                                        for="form3Example3"
                                    >
                                        Enter Name
                                    </label>
                                </div>

                                <div className={Style.input_container}>
                                    <input
                                        type="file"
                                        id="customFile"
                                        className={`form-control ${Style.form_control}`}
                                        accept="image/x-png,image/jpeg"
                                        onChange={(e) => {
                                            onImageChange(e);
                                        }}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    class="btn btn-primary btn-block mb-4 add_recipe_button"
                                    onClick={(e) => {
                                        submit(e);
                                        handleClose3();
                                    }}
                                >
                                    Submit
                                </button>
                            </form>
                        </Modal.Body>
                    </Modal>
                    <Modal
                        className={Style.model_dialog}
                        show={show4}
                        onHide={handleClose4}
                    >
                        <Modal.Header closeButton></Modal.Header>
                        <Modal.Body>
                            <div className={Style.login_prompt}>
                                <h1
                                    className={Style.header_login}
                                    style={{
                                        color: `#20303c`,
                                        marginBottom: `45px`,
                                    }}
                                >
                                    New Admin
                                </h1>
                            </div>
                            <form>
                                <div class="form-outline mb-4">
                                    <input
                                        id="form3Example4"
                                        className={`form-control ${Style.input_field}`}
                                        type="email"
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                    />
                                    <label
                                        class="form-label"
                                        for="form3Example4"
                                    >
                                        Enter email
                                    </label>
                                </div>
                                <div class="form-outline mb-4">
                                    <input
                                        type="text"
                                        onChange={(e) => setId(e.target.value)}
                                        id="form3Example5"
                                        className={`form-control ${Style.input_field}`}
                                    />
                                    <label
                                        class="form-label"
                                        for="form3Example5"
                                    >
                                        Enter ID
                                    </label>
                                </div>

                                <button
                                    type="submit"
                                    class="btn btn-primary btn-block mb-4 add_admin_button"
                                    onClick={(e) => {
                                        submit1(e);
                                        handleClose4();
                                    }}
                                >
                                    Submit
                                </button>
                            </form>
                        </Modal.Body>
                    </Modal>
                </>
            ) : (
                <>
                    <Container
                        fluid
                        className={Style.no_user_cont}
                        style={{ marginTop: `13vh` }}
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
export default Admin;
