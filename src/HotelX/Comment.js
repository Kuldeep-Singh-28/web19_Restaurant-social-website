import React from "react";
import { Container, Row } from "react-bootstrap";
import Style from "./styles/Comment.module.css";

const Comment = () => {
	return (
		<Container fluid className={Style.fluid_container}>
			<div className={Style.comment_carousel_container}>
				<div className={Style.comment_carousel}>
					<div className={Style.comment}>
						<div className={`text-muted ${Style.comment_text}`}>
							Lorem ipsum, dolor sit amet consectetur adipisicing
							elit. Vero eius suscipit nam quae amet harum iure
							labore repellat, quasi unde, earum accusantium
							assumenda possimus, ullam, ea repellendus quos? A,
							quod.
						</div>
						<div className={Style.owner}>
							<h5 className={Style.owner_name}>
								Kiran Tirunagiri
							</h5>
							<div
								style={{
									color: `#d0c194`,
									fontSize: `14px`,
									letterSpacing: `0.5px`,
								}}
							>
								CEO -HeadPassion
							</div>
						</div>
					</div>
					<div className={Style.comment}>
						<div className={`text-muted ${Style.comment_text}`}>
							Lorem ipsum, dolor sit amet consectetur adipisicing
							elit. Vero eius suscipit nam quae amet harum iure
							labore repellat, quasi unde, earum accusantium
							assumenda possimus, ullam, ea repellendus quos? A,
							quod.
						</div>
						<div className={Style.owner}>
							<h5 className={Style.owner_name}>
								Kiran Tirunagiri
							</h5>
							<div
								style={{
									color: `#d0c194`,
									fontSize: `14px`,
									letterSpacing: `0.5px`,
								}}
							>
								CEO -HeadPassion
							</div>
						</div>
					</div>
					<div className={Style.comment}>
						<div className={`text-muted ${Style.comment_text}`}>
							Lorem ipsum, dolor sit amet consectetur adipisicing
							elit. Vero eius suscipit nam quae amet harum iure
							labore repellat, quasi unde, earum accusantium
							assumenda possimus, ullam, ea repellendus quos? A,
							quod.
						</div>
						<div className={Style.owner}>
							<h5 className={Style.owner_name}>
								Kiran Tirunagiri
							</h5>
							<div
								style={{
									color: `#d0c194`,
									fontSize: `14px`,
									letterSpacing: `0.5px`,
								}}
							>
								CEO -HeadPassion
							</div>
						</div>
					</div>
					<div className={Style.button_container}>
						<div id="btn1" className={Style.nav_button}></div>
						<div id="btn2" className={Style.nav_button}></div>
						<div id="btn3" className={Style.nav_button}></div>
					</div>
				</div>
			</div>
		</Container>
	);
};

export default Comment;
