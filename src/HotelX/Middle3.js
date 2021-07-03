import React from "react";
import { Col, Row, Container } from "react-bootstrap";
import Style from "./styles/Middle3.module.css";

const Middle3 = () => {
	return (
		<div>
			<Container fluid>
				<Row>
					<div className={Style.main_cont}>
						<h1 className={Style.header}>
							Order in a click <br /> The delivery is on Us
						</h1>
						<a href="/menu" className="btn btn-secondary">
							Order Online
						</a>
					</div>
				</Row>
			</Container>
		</div>
	);
};

export default Middle3;
