import React, { useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import Style from "./styles/Comment.module.css";

const Comment = () => {
	let i = 0;

	useEffect(() => {
		window.addEventListener("DOMContentLoaded", (e) => {
			const arr = Array.from(document.querySelectorAll(".index_class"));
			const arr2 = Array.from(document.querySelectorAll(".name_class"));
			arr.forEach((ar) => {
				ar.style.height = "0";
				ar.style.opacity = "0";
			});
			arr2.forEach((ar2) => {
				ar2.style.height = "0";
				ar2.style.opacity = "0";
			});
			arr[0].style.height = "auto";
			arr[0].style.opacity = "1";
			arr2[0].style.height = "auto";
			arr2[0].style.opacity = "1";
			const buttons = document.querySelectorAll(".cbtn");
			buttons[0].style.background = `#000`;
			buttons.forEach((button) => {
				button.addEventListener("click", (event) => {
					buttons.forEach((btn) => (btn.style.background = `none`));
					button.style.background = `#000`;
					const ctext1 = document.querySelector(`#index1`);
					const cname1 = document.querySelector(`#name1`);
					const ctext2 = document.querySelector(`#index2`);
					const cname2 = document.querySelector(`#name2`);
					const ctext3 = document.querySelector(`#index3`);
					const cname3 = document.querySelector(`#name3`);
					// console.log(
					// 	"the event listener has been successfully initiated"
					// );
					if (button.id == 1) {
						ctext1.style.opacity = "1";
						ctext1.style.height = "auto";
						cname1.style.opacity = "1";
						cname1.style.height = "auto";
						ctext2.style.opacity = "0";
						ctext2.style.height = "0";
						cname2.style.opacity = "0";
						cname2.style.height = "0";
						ctext3.style.opacity = "0";
						ctext3.style.height = "0";
						cname3.style.opacity = "0";
						cname3.style.height = "0";
					} else if (button.id == 2) {
						ctext2.style.opacity = "1";
						ctext2.style.height = "auto";
						cname2.style.opacity = "1";
						cname2.style.height = "auto";
						ctext1.style.opacity = "0";
						ctext1.style.height = "0";
						cname1.style.opacity = "0";
						cname1.style.height = "0";
						ctext3.style.opacity = "0";
						ctext3.style.height = "0";
						cname3.style.opacity = "0";
						cname3.style.height = "0";
					} else if (button.id == 3) {
						ctext3.style.opacity = "1";
						ctext3.style.height = "auto";
						cname3.style.opacity = "1";
						cname3.style.height = "auto";
						ctext2.style.opacity = "0";
						ctext2.style.height = "0";
						cname2.style.opacity = "0";
						cname2.style.height = "0";
						ctext1.style.opacity = "0";
						ctext1.style.height = "0";
						cname1.style.opacity = "0";
						cname1.style.height = "0";
					}
				});
			});
		});

		setInterval(() => {
			const buttons = document.querySelectorAll(".cbtn");
			buttons[i].click();
			i++;
			i = i % 3;
		}, 5000);
	}, []);

	return (
		<Container fluid className={Style.fluid_container}>
			<div className={Style.comment_carousel_container}>
				<div className={Style.comment_carousel}>
					<div className={Style.comment}>
						<div className={`text-muted ${Style.comment_text}`}>
							<div
								id="index1"
								className={`index_class ${Style.index_class}`}
							>
								Lorem ipsum, dolor sit amet consectetur
								adipisicing elit. Vero eius suscipit nam quae
								amet harum iure labore repellat, quasi unde,
								earum accusantium assumenda possimus, ullam, ea
								repellendus quos? A, quod.
							</div>
							<div
								id="index2"
								className={`index_class ${Style.index_class}`}
							>
								Lorem, ipsum dolor sit amet consectetur
								adipisicing elit. Quae quasi nesciunt eius
								voluptatum incidunt unde eaque vero beatae
								voluptatibus minima!
							</div>
							<div
								id="index3"
								className={`index_class ${Style.index_class}`}
							>
								Lorem ipsum dolor sit, amet consectetur
								adipisicing elit. Aperiam officiis, quo
								doloribus suscipit odit, explicabo!
							</div>
						</div>
						<div id="owner_box" className={Style.owner}>
							<h5 id="owner" className={Style.owner_name}>
								<div
									id="name1"
									className={`name_class ${Style.name_class}`}
								>
									Kiran Tirunagiri
								</div>
								<div
									id="name2"
									className={`name_class ${Style.name_class}`}
								>
									Ujjawal Mittal
								</div>
								<div
									id="name3"
									className={`name_class ${Style.name_class}`}
								>
									Tushar Goyal
								</div>
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
						<div
							id="1"
							className={`cbtn ${Style.nav_button}`}
						></div>
						<div
							id="2"
							className={`cbtn ${Style.nav_button}`}
						></div>
						<div
							id="3"
							className={`cbtn ${Style.nav_button}`}
						></div>
					</div>
				</div>
			</div>
		</Container>
	);
};

export default Comment;
