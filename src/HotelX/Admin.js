import React, { useState } from "react";
import db, { storage } from "./firebase";
import firebase from "firebase";
import Style from "./styles/admin.module.css";
import { Form, Button, Container, Row, Col, Modal } from "react-bootstrap";
function Admin() {
    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [price, setPrice] = useState("");
    const [type, setType] = useState("");
    const [email, setEmail] = useState("");
    const [id, setId] = useState("");
    const [url, setUrl] = useState("");

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

    return (
        <div className="_admin">
            <Container fluid>
                <Row>
                    <Col className={Style.sidebar}>
                        <Button variant="outline-primary" onClick={handleShow3}>
                            Click3
                        </Button>
                        <br />
                        <Button variant="outline-primary" onClick={handleShow4}>
                            Click4
                        </Button>
                    </Col>
                    <Col className={Style.orders}>
                        <Container fluid>
                            <Row id="main-row">
                                <p>
                                    Lorem ipsum dolor sit, amet consectetur
                                    adipisicing elit. Repellat, tenetur!
                                </p>
                            </Row>
                        </Container>
                    </Col>
                </Row>
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
