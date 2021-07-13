import React from "react";
import { Col, Row, Container } from "react-bootstrap";
import Style from "./styles/Middle3.module.css";

const Middle3 = () => {
	return (
		<div>
			<Container fluid>
				<Row
					style={{ marginLeft: `-1.75rem`, marginRight: `-1.75rem` }}
				>
					<div className={Style.main_cont}>
						<h1 className={Style.header}>
							Order in a <br className={Style.small_middle3} />
							click <br /> The delivery is on{" "}
							<br className={Style.small_middle3} />
							Us
						</h1>
						<a
							href="/menu"
							className="btn btn-lg btn-outline-dark"
							style={{
								color: `white`,
								marginLeft: `15px`,
								marginTop: `20px`,
							}}
						>
							Order Online
						</a>
					</div>
				</Row>
			</Container>
		</div>
	);
};

export default Middle3;
