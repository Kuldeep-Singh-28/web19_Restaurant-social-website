import React, { useState, useEffect } from "react";
import db, { storage } from "./firebase";
import Style from "./styles/Beverages.module.css";
import {
    Container,
    Row,
    CardColumns,
    Card,
    ListGroupItem,
    ListGroup,
    Modal,
} from "react-bootstrap";
import firebase from "firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Typography } from "@material-ui/core";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import { MDBRipple } from "mdb-react-ui-kit";
const auth = firebase.auth();
function Beverages() {
    const [user] = useAuthState(auth);
    const [photos, setPhotos] = useState([]);
    const [quantity, setQuantity] = useState([]);
    const [isAdmin, setisAdmin] = useState(false);
    const [newPrice, setNewPrice] = useState();
    const [newName, setNewName] = useState();
    const [newUrl, setNewUrl] = useState();
    const [image, setImage] = useState();
    const [selectedItem, setSelectedItem] = useState();

    const [show9, setShow9] = useState(false);
    const handleClose9 = () => setShow9(false);
    const handleShow9 = () => setShow9(true);

    useEffect(async () => {
        if (user) {
            db.collection("Admin")
                .get()
                .then((snap) => {
                    snap.docs.forEach((doc) => {
                        //console.log(user.id)
                        if (doc.data().id == user.uid) {
                            setisAdmin(true);
                        }
                    });
                });
        } else {
            setisAdmin(false);
        }
    }, [user]);
    useEffect(() => {
        db.collection("dishes")
            .doc("dish")
            .collection("Beverages")
            .onSnapshot((snapshot) => {
                setPhotos(snapshot.docs);
                setQuantity(snapshot.docs.map((doc) => doc.data().quantity));
            });
    }, []);
    // ===========================================

    const addToCart = async (e, index, item, quantity) => {
        console.log(index);
        const itemRef = db
            .collection("users")
            .doc(user.uid)
            .collection("My-cart");
        let doc = await itemRef
            .where("name", "==", item.data().name)
            .get()
            .then((docu) => {
                //   docu.docs.map(d => console.log(d.id))
                if (docu.docs.length !== 0)
                    return docu.docs[docu.docs.length - 1].id;
                else return null;
            });

        console.log(doc);
        if (!doc) {
            db.collection("users")
                .doc(user.uid)
                .collection("My-cart")
                .add({
                    price: Number(item.data().price),
                    name: item.data().name,
                    quantity: quantity,
                });
        } else {
            itemRef.doc(doc).update({
                quantity: quantity,
            });
        }
    };

    const handleQuantityDecrease = (index) => {
        console.log(index);
        const newQ = [...quantity];
        if (newQ[index] > 0) {
            newQ[index]--;
        }
        setQuantity(newQ);
    };
    const handleQuantityIncrease = (index) => {
        const newQ = [...quantity];
        if (newQ[index] < 10) {
            newQ[index]++;
        }
        setQuantity(newQ);
    };
    //console.log(quantity[0]);
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

    const edit = (e, Item) => {
        const doc = db
            .collection("dishes")
            .doc("dish")
            .collection("Beverages")
            .doc(Item.id);

        if (newName && newPrice) {
            doc.update({
                price: newPrice,
                name: newName,
            });
        } else if (newName) {
            doc.update({
                name: newName,
            });
        } else if (newPrice) {
            doc.update({
                price: newPrice,
            });
        }
    };
    const deleteItem = (e, Item) => {
        db.collection("dishes")
            .doc("dish")
            .collection("Beverages")
            .doc(Item.id)
            .delete()
            .then(() => {
                console.log("item has been successfully deleted");
            });
    };
    const edit1 = (e, Item) => {
        const doc = db
            .collection("dishes")
            .doc("dish")
            .collection("Beverages")
            .doc(Item.id);
        if (image) {
            const storageRef = storage.ref(`images/Beverages`);
            const uploadTask = storageRef.child(Item.data().name).put(image);

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
                            doc.update({
                                url: downloadURL,
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
                        });
                }
            );
        }
    };
    return (
        <div className={Style.starters}>
            <div className={Style.background_image_admin}>
                <div className={Style.header_container}>
                    <h2 className={Style.welcome_admin}>Welcome to</h2>
                    <h1 className={Style.order_header}>BEVERAGES</h1>
                    <small style={{ color: `white`, fontSize: `12px` }}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
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
                                <stop stop-color="seashell" offset="0%"></stop>
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
            <Container className={Style.starter_container}>
                <Row className={Style.main_row}>
                    <CardColumns className={Style.accordion}>
                        {photos.map((item, index) => (
                            <Card key={index} className={`mb-4 ${Style.card}`}>
                                <MDBRipple
                                    rippleColor="dark"
                                    rippleTag="div"
                                    className="bg-image hover-overlay"
                                >
                                    <Card.Img
                                        variant="top"
                                        src={item.data().url}
                                        className={Style.image_card}
                                        style={{
                                            filter: "none",
                                        }}
                                    />
                                    <a>
                                        <div
                                            className="mask"
                                            style={{
                                                backgroundColor:
                                                    "rgba(251, 251, 251, 0.15)",
                                            }}
                                        ></div>
                                    </a>
                                </MDBRipple>
                                <Card.Body>
                                    <Card.Title className={Style.card_title}>
                                        <div>{item.data().name}</div>
                                        {isAdmin && (
                                            <button
                                                class="btn btn-primary edit_button"
                                                onClick={() => {
                                                    setSelectedItem(item);
                                                    handleShow9();
                                                }}
                                            >
                                                EDIT
                                            </button>
                                        )}
                                    </Card.Title>
                                    <Card.Text className={Style.card_text}>
                                        Lorem ipsum dolor sit amet consectetur
                                        adipisicing elit. Praesentium beatae
                                        dolor, quia numquam nulla similique hic
                                        dolorum modi odit saepe, nemo neque,
                                        animi consectetur nostrum debitis eum
                                        voluptatum laborum, qui.
                                    </Card.Text>
                                </Card.Body>
                                <ListGroup className="list-group-flush">
                                    <ListGroupItem className={Style.btn_group}>
                                        <div className={Style.btn_group2}>
                                            <button
                                                class="btn btn-sm btn-outline-primary btn-rounded edit_button_border"
                                                onClick={() =>
                                                    handleQuantityDecrease(
                                                        index
                                                    )
                                                }
                                            >
                                                -
                                            </button>
                                            <div className="mx-1">
                                                {quantity[index]}
                                            </div>
                                            <button
                                                class="btn btn-sm btn-outline-primary btn-rounded edit_button_border"
                                                onClick={() =>
                                                    handleQuantityIncrease(
                                                        index
                                                    )
                                                }
                                            >
                                                +
                                            </button>
                                        </div>
                                        <div>
                                            &#8377;
                                            {quantity[index] *
                                                item.data().price}
                                        </div>
                                    </ListGroupItem>
                                </ListGroup>
                                <Card.Body>
                                    {user ? (
                                        <button
                                            class="btn btn-primary btn-block add_recipe_button"
                                            onClick={(e) =>
                                                addToCart(
                                                    e,
                                                    index,
                                                    item,
                                                    quantity[index]
                                                )
                                            }
                                        >
                                            ADD TO CART
                                        </button>
                                    ) : (
                                        <button class="btn btn-primary btn-block disabled edit_button">
                                            LOGIN TO CONTINUE
                                        </button>
                                    )}
                                </Card.Body>
                            </Card>
                        ))}
                    </CardColumns>
                </Row>
            </Container>
            <Modal
                className={Style.model_dialog}
                show={show9}
                onHide={handleClose9}
            >
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                    <div className={Style.login_prompt}>
                        <h1
                            style={{ color: `#162d3d` }}
                            className={Style.header_login}
                        >
                            Edit Recipe
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
                                        type="number"
                                        id="form3Example2"
                                        className={`form-control ${Style.input_field}`}
                                        onChange={(e) =>
                                            setNewPrice(e.target.value)
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
                                onChange={(e) => setNewName(e.target.value)}
                            />
                            <label class="form-label" for="form3Example3">
                                Enter Name
                            </label>
                        </div>

                        <div className={Style.input_container}>
                            <input
                                type="file"
                                id="customFile"
                                className={`form-control ${Style.form_control}`}
                                accept="image/x-png,image/jpeg"
                                onChange={(e) => onImageChange(e)}
                            />
                        </div>

                        <button
                            class="btn btn-primary btn-block mb-4 add_recipe_button"
                            onClick={(e) => {
                                e.preventDefault();
                                edit1(e, selectedItem);
                                edit(e, selectedItem);
                                handleClose9();
                            }}
                        >
                            Submit
                        </button>
                        <button
                            class="btn btn-primary btn-block mb-4 add_recipe_button"
                            onClick={(e) => {
                                e.preventDefault();
                                deleteItem(e, selectedItem);
                                handleClose9();
                            }}
                        >
                            DELETE ITEM
                        </button>
                    </form>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default Beverages;
