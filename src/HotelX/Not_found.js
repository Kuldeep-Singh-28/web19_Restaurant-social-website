import React from "react";
import { Container, Row } from "react-bootstrap";
import Not_found_svg from "./Not_found_svg";
import Style from "./styles/Not_found.module.css";

const Not_found = () => {
	return (
		<>
			<Container fluid className={Style.no_user_cont}>
				<div className={Style.svg_img2}>
					<Not_found_svg />
				</div>
				<Row className={Style.no_user_row}>
					<div className={Style.no_user_div}>
						<h4 className="display-5 mb-4">
							Page
							<br /> Not{" "}
							<span style={{ color: `coral` }}>Found</span>
						</h4>
						<a
							href="/"
							type="button"
							class="btn btn-dark btn-rounded mb-4"
						>
							Back to Home
						</a>
					</div>
				</Row>
			</Container>
		</>
	);
};

export default Not_found;
