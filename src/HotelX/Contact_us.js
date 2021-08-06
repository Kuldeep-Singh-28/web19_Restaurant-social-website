import React, { useEffect, useState } from "react";
import { Container, Row, Form, Col, InputGroup, Button } from "react-bootstrap";
import gsap from "gsap";
import Style from "./styles/Contact_us.module.css";
import Contact_us_svg from "./Contact_us_svg";

const res_svg = React.createRef();
const res_row = React.createRef();

function FormExample({ setClick, click_animation }) {
	const [validated, setValidated] = useState(false);

	const handleSubmit = (event) => {
		const form = event.currentTarget;
		if (form.checkValidity() === false) {
			event.preventDefault();
			event.stopPropagation();
		} else {
			event.preventDefault();
			setClick(true);
			click_animation();
		}
		setValidated(true);
	};

	return (
		<Form noValidate validated={validated} onSubmit={handleSubmit}>
			<Row>
				<Form.Group as={Col} xm="6" controlId="validationCustom01">
					<Form.Label>First name</Form.Label>
					<Form.Control
						required
						type="text"
						placeholder="First name"
						defaultValue="Mark"
					/>
					<Form.Control.Feedback>Looks good!</Form.Control.Feedback>
				</Form.Group>
				<Form.Group as={Col} xm="6" controlId="validationCustom02">
					<Form.Label>Last name</Form.Label>
					<Form.Control
						required
						type="text"
						placeholder="Last name"
						defaultValue="Otto"
					/>
					<Form.Control.Feedback>Looks good!</Form.Control.Feedback>
				</Form.Group>
			</Row>
			<Row>
				<Form.Group controlId="validationCustom04">
					<Form.Label>Email</Form.Label>
					<Form.Control type="email" placeholder="Email" required />
					<Form.Control.Feedback type="invalid">
						Please provide a valid Email.
					</Form.Control.Feedback>
				</Form.Group>
			</Row>
			<Row>
				<Form.Group controlId="validationCustom05">
					<Form.Label>Enter your message</Form.Label>
					<Form.Control
						as="textarea"
						placeholder="Leave a message"
						style={{ height: "100px" }}
						required
					/>
					<Form.Control.Feedback type="invalid">
						Please provide a massage.
					</Form.Control.Feedback>
				</Form.Group>
			</Row>
			<Button
				type="submit"
				className={`btn btn-dark ${Style.form_submit}`}
			>
				Submit form
			</Button>
		</Form>
	);
}

const Contact_us = () => {
	const [click, setClick] = useState(false);
	useEffect(() => {
		const contact_id = document.getElementById("contact_id");
		contact_id.style.textDecoration = `underline`;
		contact_id.style.textDecorationColor = `coral`;
		contact_id.style.textDecorationThickness = `2px`;
		contact_id.style.textUnderlineOffset = `5px`;

		setTimeout(() => {
			window.scrollTo(0, 11);
		}, 6000);

		const tl = gsap.timeline({ delay: 6 });
		tl.fromTo(
			res_row.current,
			0.7,
			{ x: "-100%", opacity: 0 },
			{ x: "0%", opacity: 1 },
			"-=0.5"
		).fromTo(
			res_svg.current,
			0.5,
			{ y: "50", opacity: 0 },
			{ y: "0", opacity: 1 },
			"-=0.3"
		);
	}, []);

	const click_animation = () => {
		const hide_row = document.getElementById("hide_row");
		hide_row.style.opacity = `0`;
		const tl = gsap.timeline();
		tl.fromTo(
			res_row.current,
			0.7,
			{ x: "-100%", opacity: 0 },
			{ x: "0%", opacity: 1 }
		);
	};

	return (
		<>
			<Container fluid className={Style.no_user_cont}>
				<div className={Style.svg_img2} ref={res_svg}>
					<Contact_us_svg />
				</div>
				<Row className={Style.no_user_row} ref={res_row} id="hide_row">
					<div className={Style.no_user_div}>
						{!click ? (
							<>
								<h4
									className={`display-5 mb-4 ${Style.header}`}
								>
									Contact{" "}
									<span style={{ color: `coral` }}>Us</span>
								</h4>
								<FormExample
									setClick={setClick}
									click_animation={click_animation}
								/>
							</>
						) : (
							<>
								<h4 className="display-5 mb-4">
									Your Response Has
									<br /> Been{" "}
									<span style={{ color: `coral` }}>
										Recorded
									</span>{" "}
								</h4>
								<a
									href="/"
									type="button"
									class="btn btn-dark btn-rounded mb-4"
								>
									Back to Home
								</a>
							</>
						)}
					</div>
				</Row>
			</Container>
		</>
	);
};

export default Contact_us;
