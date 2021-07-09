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
} from "react-bootstrap";
function Admin() {
    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [price, setPrice] = useState("");
    const [type, setType] = useState("");
    const [email, setEmail] = useState("");
    const [id, setId] = useState("");
    const [url, setUrl] = useState("");
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
        let file = e.target.files[0]; // get the supplied file,if there is a file, set image to that file
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
                setUrl(url);
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
        db.collection("dishes").doc("dish").collection(type).add({
            name: name,
            price: price,
            url: url,
        });
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

    useEffect(() => {
        const navbar_admin = document.querySelector(".navbar2");
        navbar_admin.style.backgroundColor = `rgba(0,0,0,0.48)`;

        db.collection("orders").onSnapshot(
            (snapshot) => {
                setOrders(snapshot.docs);
            },
            (err) => console.log(err.message)
        );
    }, []);

    console.log("here are the restaurant orders", res_orders);
    let instinct = 0;

    //=========================================================

    return (
        <div className={Style.admin}>
            <div className={Style.background_image_admin}></div>
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
                                <h1 className={Style.order_header}>Orders</h1>
                                <Accordion className={Style.accordion}>
                                    {res_orders.map((order, index) => {
                                        return (
                                            <Card>
                                                <Accordion.Toggle
                                                    as={Card.Header}
                                                    eventKey={index + 1}
                                                >
                                                    Order {index + 1}
                                                </Accordion.Toggle>
                                                <Accordion.Collapse
                                                    eventKey={index + 1}
                                                >
                                                    <Card.Body>
                                                        {
                                                            order.data()
                                                                .order[0].name
                                                        }
                                                    </Card.Body>
                                                </Accordion.Collapse>
                                            </Card>
                                        );
                                    })}
                                </Accordion>
                            </Row>
                        </Container>
                    </div>
                </div>
            </Container>
            <Modal show={show3} onHide={handleClose3}>
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                    <Form className="mb-3">
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Type</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Type"
                                onChange={(e) => setType(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter name"
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Price"
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>PhotoUrl</Form.Label>
                            <input
                                type="file"
                                accept="image/x-png,image/jpeg"
                                onChange={(e) => {
                                    onImageChange(e);
                                }}
                            />
                        </Form.Group>
                        <Form.Group controlId="formBasicCheckbox"></Form.Group>
                        <Button
                            variant="outline-primary"
                            type="submit"
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
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <Form.Text className="text-muted">
                                give permission to make admin
                            </Form.Text>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Id</Form.Label>
                                <Form.Control
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
