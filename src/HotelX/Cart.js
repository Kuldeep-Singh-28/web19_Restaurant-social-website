import React, { useState, useEffect } from "react";
import firebase from "firebase";
import db from "./firebase";
import { Modal, ListGroup, ListGroupItem } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import { Typography } from "@material-ui/core";
import Style from "./styles/Cart.module.css";
const auth = firebase.auth();

function Cart() {
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
        item.forEach((item) => {
            // console.log(item.data());
            order.push(item.data());
        });
        db.collection("orders")
            .add({
                order,
            })
            .then(async () => {
                await remove();
                handleClose5();
            });
    };
    let price_tot = 0;
    return (
        <div className={Style.demo}>
            <button className="btn btn-primary" onClick={handleShow5}>
                click
            </button>
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
                    <ListGroup variant="flush" className="mb-4 d-flex">
                        {item.length !== 0 &&
                            item.map((i, index) => {
                                price_tot += i.data().price;
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
                                            style={{ marginLeft: `auto` }}
                                        >
                                            &#8377;{i.data().price}
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
                            onClick={(e) => placeorder(e)}
                        >
                            PROCEED TO CHECKOUT
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
