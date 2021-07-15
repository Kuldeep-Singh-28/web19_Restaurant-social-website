import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Style from "./styles/Services.module.css";

const Services = () => {
	return (
		<div>
			<Container fluid className={Style.master_container}>
				<Row className={Style.row_top}>
					<h2 className={Style.welcome_admin}>Discover</h2>
					<h1 className={Style.order_header}>OUR SERVICES</h1>
				</Row>
				<Row className={Style.row}>
					<Col className={Style.col1}>
						<a className={Style.atag} href="/menu">
							CAKES
						</a>
					</Col>
					<Col className={Style.col2}>
						<a className={Style.atag} href="#">
							TEAM BUILDING
						</a>
					</Col>
					<Col className={Style.col3}>
						<a className={Style.atag} href="/menu">
							COFFEE
						</a>
					</Col>
					<Col className={Style.col4} style={{ marginRight: `0` }}>
						<a href="#" className={Style.atag}>
							BIRTHDAY PARTY
						</a>
					</Col>
				</Row>
			</Container>
		</div>
	);
};

export default Services;
