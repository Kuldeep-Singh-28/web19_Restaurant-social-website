import React, { useState, useEffect } from "react";
import firebase from "firebase";
import db from "./firebase";
import { Modal, ListGroup, ListGroupItem, Nav } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import { Typography } from "@material-ui/core";
import DeleteForeverOutlinedIcon from "@material-ui/icons/DeleteForeverOutlined";
import Style from "./styles/Cart.module.css";
const auth = firebase.auth();
function Cart({ instinct2, instinct6 }) {
    let price_tot = 0;
    const [user] = useAuthState(auth);
    const [item, setItem] = useState([]);

    const [show5, setShow5] = useState(false);

    const handleClose5 = () => setShow5(false);
    const handleShow5 = () => setShow5(true);

    useEffect(() => {
        if (user) {
            // console.log(user);
            const cart = db
                .collection("users")
                .doc(user.uid)
                .collection("My-cart");
            cart.onSnapshot((snapshot) => {
                setItem(snapshot.docs);
            });
        }
    }, [user]);

    const remove_item = (e, id) => {
        console.log(id);
        const cart = db.collection("users").doc(user.uid).collection("My-cart");
        cart.doc(id).delete();
    };

    const remove = async (e, id) => {
        // console.log(id);
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
        // cart.doc(id).delete();
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
                        handleClose5();
                    });
            });
    };
    // let price_tot = 0;
    return (
        <div>
            <Nav.Link
                href="#"
                onClick={handleShow5}
                className={`n2 ${
                    !instinct2
                        ? "dark_link"
                        : !instinct6
                        ? "jumbotron_links"
                        : ""
                }`}
            >
                CART
            </Nav.Link>
            <Modal
                className={Style.model_dialog}
                show={show5}
                onHide={handleClose5}
            >
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                    <div className={Style.login_prompt}>
                        <h1
                            style={{ color: `#20303c` }}
                            className={Style.header_login}
                        >
                            SHOPPING CART
                        </h1>
                    </div>
                    <ListGroup
                        variant="flush"
                        className="mb-4 d-flex"
                        style={{ marginTop: `6px` }}
                    >
                        {item.length !== 0 &&
                            item.map((i, index) => {
                                price_tot +=
                                    Number(i.data().price) * i.data().quantity;
                                return (
                                    <ListGroupItem
                                        className={Style.list_group_item}
                                    >
                                        <small className="text-muted">
                                            {i.data().name}
                                        </small>
                                        <small className="mx-1">x</small>
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
                                            {i.data().price * i.data().quantity}
                                        </small>
                                        <small
                                            style={{
                                                position: `absolute`,
                                                right: `-15px`,
                                            }}
                                        >
                                            <button
                                                onClick={(e) =>
                                                    remove_item(e, i.id)
                                                }
                                                type="submit"
                                                class="btn btn-sm btn-danger px-1 mx-1"
                                                style={{ textAlign: `center` }}
                                            >
                                                <DeleteForeverOutlinedIcon
                                                    style={{
                                                        color: `white`,
                                                    }}
                                                />
                                            </button>
                                        </small>
                                    </ListGroupItem>
                                );
                            })}
                    </ListGroup>
                    {item.length === 0 && <div>Shopping cart empty</div>}
                    {item.length !== 0 ? (
                        <div className={Style.total_price}>
                            <h3 style={{ display: `inline-block` }}>Total</h3>
                            <h3
                                style={{
                                    marginLeft: `auto`,
                                    display: `inline`,
                                }}
                            >
                                &#8377;{price_tot}
                            </h3>
                        </div>
                    ) : (
                        ""
                    )}
                    {item.length !== 0 ? (
                                 <button
                            type="submit"
                            class="btn btn-primary btn-block mb-4 add_recipe_button"
                            // className={`btn btn-primary btn-block mb-4 add_recipe_button`}
                        >
                            <a href="/payment" >PROCEED TO CHECKOUT</a>
                        </button>
                   
                    ) : (
                        ""
                    )}
                   
                </Modal.Body>
            </Modal>
        </div>
    );
}
export default Cart;
