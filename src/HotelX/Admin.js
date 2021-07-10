import React, { useState, useEffect } from "react";
import db, { storage } from "./firebase";
import firebase from "firebase";
import Style from "./styles/Admin.module.css";
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
function Admin() {
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

    // =======================================================

    // =======================================================
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
    // ========================================================

    // ========================================================
    const uploadToFirebase = async () => {
        if (image) {
            const storageRef = storage.ref(`images/${type}`);
            const imageRef = storageRef.child(name);

            imageRef.put(image).then(() => {
                alert("Image uploaded successfully to Firebase.");
            });
            await imageRef.getDownloadURL().then((url) => {
                if (type) {
                    db.collection("dishes").doc("dish").collection(type).add({
                        name: name,
                        price: price,
                        url: url,
                    });
                }
            });
        } else {
            alert("Please upload an image first.");
        }
    };

    // ========================================================

    // ========================================================
    const submit = async (e) => {
        e.preventDefault();
        await uploadToFirebase();

        console.log("xx");
    };
    // ========================================================

    // ========================================================
    const submit1 = (e) => {
        db.collection("Admin").add({
            email: email,
            id: id,
        });
        setType("");
        setName("");
        setPrice("");
        setImage("");
    };
    // ========================================================

    //=========================================================

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

    //=========================================================

    //=========================================================

    useEffect(() => {
        const navbar_admin = document.querySelector(".navbar2");
        navbar_admin.style.color = `rgba(255,255,255,0.89)`;
        navbar_admin.style.backgroundColor = `transparent`;

        db.collection("orders").onSnapshot(
            (snapshot) => {
                setOrders(snapshot.docs);
            },
            (err) => console.log(err.message)
        );
    }, []);

    let instinct = 0;

    //=========================================================

    return (
        <div className={Style.admin}>
            <div className={Style.background_image_admin}>
                <h1 className={Style.order_header}>Orders</h1>
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
                            <Row id="main-row" className={Style.main_row}>
                                <CardColumns className={Style.accordion}>
                                    {res_orders.map((order, index) => {
                                        let price_tot = 0;
                                        for (let i of order.data().order) {
                                            price_tot += i.price;
                                        }
                                        return (
                                            <Card className={Style.card}>
                                                <Card.Body
                                                    className={Style.card_body}
                                                >
                                                    <Card.Title
                                                        className={Style.title}
                                                    >
                                                        <span>
                                                            Order {index + 1}
                                                        </span>
                                                        <span className="text-muted">
                                                            &#8377;{price_tot}
                                                        </span>
                                                    </Card.Title>
                                                </Card.Body>
                                                <ListGroup variant="flush">
                                                    {order
                                                        .data()
                                                        .order.map((item) => {
                                                            return (
                                                                <ListGroupItem>
                                                                    <small className="text-muted">
                                                                        {
                                                                            item.name
                                                                        }
                                                                    </small>
                                                                    {" x "}
                                                                    <small className="text-muted">
                                                                        {
                                                                            item.quantity
                                                                        }
                                                                    </small>
                                                                </ListGroupItem>
                                                            );
                                                        })}
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
                                                            Ready For Delivery
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
            <Modal show={show3} onHide={handleClose3}>
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
                    <Form className="mb-3">
                        <Form.Group controlId="formBasicPassword">
                            <div className={Style.input_container}>
                                <Form.Control
                                    className={Style.input_field}
                                    type="text"
                                    placeholder="Type"
                                    onChange={(e) => setType(e.target.value)}
                                />
                            </div>
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail">
                            <div className={Style.input_container}>
                                <Form.Control
                                    className={Style.input_field}
                                    type="text"
                                    placeholder="Enter name"
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <div className={Style.input_container}>
                                <Form.Control
                                    className={Style.input_field}
                                    type="text"
                                    placeholder="Price"
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                            </div>
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <div className={Style.input_container}>
                                <input
                                    className={Style.input_field}
                                    type="file"
                                    accept="image/x-png,image/jpeg"
                                    onChange={(e) => {
                                        onImageChange(e);
                                    }}
                                />
                            </div>
                        </Form.Group>
                        <Form.Group controlId="formBasicCheckbox"></Form.Group>
                        <Button
                            variant="outline-primary"
                            type="submit"
                            className={Style.btn3}
                            onClick={(e) => {
                                submit(e);
                                handleClose3();
                            }}
                        >
                            Submit
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
            <Modal show={show4} onHide={handleClose4}>
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Control
                                className={Style.input_field}
                                type="email"
                                placeholder="Enter email"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <Form.Text className="text-muted">
                                give permission to make admin
                            </Form.Text>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Control
                                    className={Style.input_field}
                                    type="text"
                                    placeholder="Id"
                                    onChange={(e) => setId(e.target.value)}
                                />
                            </Form.Group>
                        </Form.Group>

                        <Form.Check type="checkbox" label="Check me out" />

                        <Button
                            variant="outline-primary"
                            type="submit"
                            onClick={(e) => {
                                submit1(e);
                                handleClose4();
                            }}
                        >
                            Submit
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default Admin;
