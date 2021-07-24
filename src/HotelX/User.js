import React, { useState, useEffect } from "react";
import firebase from "firebase";
import db, { storage } from "./firebase";
import { useHistory } from "react-router-dom";
import Style from "./styles/Users.module.css";
import "./styles/Admin.css";
import { useAuthState } from "react-firebase-hooks/auth";
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
function User() {
	const [user_present] = useAuthState(auth);
	const [name, setName] = useState("");
	const [image, setImage] = useState("");
	const [id, setId] = useState("");
	const histori = useHistory();
	//const [url, setUrl] = useState("");
	const [res_orders, setOrders] = useState([]);
	const [cur_orders, setCurrent] = useState([]);
	const [prev_orders, setPrevious] = useState([]);
	// =======================================================

	const routeChange = () => {
		let path = `/payment`;
		histori.push(path);
	};

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
	// const uploadToFirebase = async () => {
	// 	if (image) {
	// 		const storageRef = storage.ref(`images/${type}`);
	// 		const uploadTask = storageRef.child(name).put(image);
	// 		console.log(storageRef, "i am here");
	// 		uploadTask.on(
	// 			"state_changed",
	// 			(snapshot) => {
	// 				const progress =
	// 					(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
	// 				console.log("Upload is " + progress + "% done");
	// 			},
	// 			(error) => {
	// 				// Handle unsuccessful uploads
	// 				console.log("error:-", error);
	// 			},
	// 			() => {
	// 				uploadTask.snapshot.ref
	// 					.getDownloadURL()
	// 					.then((downloadURL) => {
	// 						console.log("File available at", downloadURL);
	// 						if (type) {
	// 							console.log("the type is available");
	// 							db.collection("dishes")
	// 								.doc("dish")
	// 								.collection(type)
	// 								.add({
	// 									name: name,
	// 									price: Number(price),
	// 									quantity: 1,
	// 									url: downloadURL.toString(),
	// 								})
	// 								.then(() => {
	// 									console.log(
	// 										"Document successfully written!"
	// 									);
	// 								})
	// 								.catch((error) => {
	// 									console.error(
	// 										"Error writing document: ",
	// 										error
	// 									);
	// 								});
	// 						}
	// 					});
	// 			}
	// 		);
	// 	}
	// };

	// ========================================================

	const remove = async (e, id) => {
		// console.log(id);
		return db
			.collection("users")
			.doc(user_present.uid)
			.collection("My-cart")
			.get()
			.then((snapshot) => {
				snapshot.docs.forEach(async (doc) => {
					await db
						.collection("users")
						.doc(user_present.uid)
						.collection("My-cart")
						.doc(doc.id)
						.delete();
				});
				return;
			});
		// cart.doc(id).delete();
	};

	// ========================================================

	const reOrder = async (e, id) => {
		e.preventDefault();
		if (user_present) {
			await remove();
			await db
				.collection("users")
				.doc(user_present.uid)
				.collection("history")
				.doc(id)
				.get()
				.then(async (doc) => {
					// console.log("the doc is ")
					doc.data().order.forEach(async (item) => {
						await db
							.collection("users")
							.doc(user_present.uid)
							.collection("My-cart")
							.add(item);
					});
				});
			routeChange();
		} else {
			console.log("no user is logged in at present");
		}
	};
	let instinct_temp = false;
	useEffect(() => {
		if (user_present) {
			let order_ids = [];
			db.collection("orders").onSnapshot(
				async (snapshot) => {
					setOrders(snapshot.docs);
					instinct_temp = !instinct_temp;
					console.log("the on snapshot is working as intended");
					snapshot.docs.forEach((doc) => {
						order_ids.push(doc.id);
					});
					await db
						.collection("users")
						.doc(user_present.uid)
						.collection("history")
						.onSnapshot(
							(snapshot) => {
								let temp_prev = [];
								let temp_cur = [];
								snapshot.docs.forEach((doc) => {
									let temp = doc.data().id;
									if (order_ids.includes(temp)) {
										temp_cur.push(doc);
									} else {
										temp_prev.push(doc);
									}
								});
								console.log(
									"the on snapshot is working as intended2"
								);
								setCurrent(temp_cur);
								setPrevious(temp_prev);
							},
							(err) => console.log(err.message)
						);
				},
				(err) => console.log(err.message)
			);
		}
	}, [user_present]);

	// console.log(cur_orders, "these are the current orders");
	// console.log(prev_orders, "these are the prev orders");

	let instinct4 = 0;

	useEffect(() => {
		const navbar_admin = document.querySelector(".navbar2");
		const navbar_links = document.querySelectorAll(".n2");
		navbar_admin.style.backdropFilter = `blur(0px)`;
		navbar_admin.style.backgroundColor = `transparent`;

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
	}, []);

	//=========================================================

	return (
		<div className={Style.admin}>
			<div className={Style.background_image_admin}>
				<div className={Style.header_container}>
					<h2 className={Style.welcome_admin}>Welcome to</h2>
					<h1 className={Style.order_header}>ORDERS PAGE</h1>
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
			</div>
			<Container fluid className={Style.parent_container}>
				<div className={Style.parent_row}>
					<Container fluid>
						<Row id="main-row" className={Style.main_row}>
							<h4 className={`display-5 ${Style.first_header}`}>
								Current Orders
							</h4>
							{cur_orders.length !== 0 ? (
								<>
									<CardColumns className={Style.accordion}>
										{cur_orders.map((order, index) => {
											let price_tot = 0;
											for (let i of order.data().order) {
												price_tot +=
													i.price * i.quantity;
											}
											return (
												<Card className={Style.card}>
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
																Order
																{` ${
																	index + 1
																}`}
															</span>
															<span className="text-muted">
																&#8377;
																{price_tot}
															</span>
														</Card.Title>
														<Card.Subtitle>
															<small className="text-muted">
																{`${
																	order.data()
																		.date
																}  ${
																	order.data()
																		.time
																}`}
															</small>
														</Card.Subtitle>
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
														<button
															className="btn btn-primary"
															style={{
																backgroundColor: `orangered`,
																borderColor: `orangered`,
															}}
															onClick={(e) =>
																reOrder(
																	e,
																	order.id
																)
															}
														>
															Reorder
														</button>
													</Card.Body>
												</Card>
											);
										})}
									</CardColumns>
								</>
							) : (
								<small
									className="text-muted"
									style={{
										textAlign: `center`,
									}}
								>
									You don't have any live orders at present
								</small>
							)}
						</Row>
						<Row className={`mt-4 ${Style.already_ordered}`}>
							<h4 className={`display-5 ${Style.first_header}`}>
								Previous Orders
							</h4>
							{prev_orders.length !== 0 ? (
								<>
									<CardColumns className={Style.accordion}>
										{prev_orders.map((order, index) => {
											let price_tot = 0;
											for (let i of order.data().order) {
												price_tot +=
													i.price * i.quantity;
											}
											return (
												<Card className={Style.card}>
													<Card.Body
														className={
															Style.card_body
														}
														style={{
															backgroundColor: `aquamarine`,
														}}
													>
														<Card.Title
															className={
																Style.title
															}
														>
															<span>
																Order{" "}
																{index + 1}
															</span>
															<span className="text-muted">
																&#8377;
																{price_tot}
															</span>
														</Card.Title>
														<Card.Subtitle>
															<small className="text-muted">
																{`${
																	order.data()
																		.date
																}  ${
																	order.data()
																		.time
																}`}
															</small>
														</Card.Subtitle>
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
														<button
															className="btn btn-dark"
															onClick={(e) =>
																reOrder(
																	e,
																	order.id
																)
															}
														>
															Reorder
														</button>
													</Card.Body>
												</Card>
											);
										})}
									</CardColumns>
								</>
							) : (
								<small
									className="text-muted"
									style={{
										textAlign: `center`,
									}}
								>
									No purchase history
								</small>
							)}
						</Row>
					</Container>
				</div>
			</Container>
		</div>
	);
}
export default User;
