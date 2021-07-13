import React from "react";
import Style from "./styles/Homepage_jumbotron.module.css";

const Homepage_jumbotron = () => {
	return (
		<div className={Style.background_image_admin}>
			<div className={Style.header_container}>
				<h2 className={Style.welcome_admin}>Welcome</h2>
				<h1 className={Style.order_header}>
					A seasonal tasting menu
					<br />& the chef experience
				</h1>
				<small style={{ color: `white`, fontSize: `12px` }}>
					Lorem ipsum dolor sit amet consectetur adipisicing elit.
				</small>
				<a
					href="/menu"
					style={{ zIndex: `100` }}
					class="btn btn-light btn-rounded mt-5"
				>
					OUR MENU
				</a>
			</div>
			<div className={Style.admin_svg}>
				<svg
					id="wave"
					// style="transform:rotate(0deg); transition: 0.3s"
					style={{
						transform: `rotate(0deg)`,
						transition: `0.3s`,
					}}
					viewBox="0 0 1440 140"
					version="1.1"
					xmlns="http://www.w3.org/2000/svg"
				>
					<defs>
						<linearGradient
							id="sw-gradient-0"
							x1="0"
							x2="0"
							y1="1"
							y2="0"
						>
							<stop stop-color="#fff" offset="0%"></stop>
							<stop stop-color="#fff" offset="100%"></stop>
						</linearGradient>
					</defs>
					<path
						// style="transform:translate(0, 0px); opacity:1"
						style={{
							transform: `translate(0, 0px)`,
							opacity: `1`,
						}}
						fill="url(#sw-gradient-0)"
						d="M0,56L120,63C240,70,480,84,720,86.3C960,89,1200,79,1440,63C1680,47,1920,23,2160,30.3C2400,37,2640,75,2880,77C3120,79,3360,47,3600,39.7C3840,33,4080,51,4320,51.3C4560,51,4800,33,5040,35C5280,37,5520,61,5760,72.3C6000,84,6240,84,6480,84C6720,84,6960,84,7200,81.7C7440,79,7680,75,7920,81.7C8160,89,8400,107,8640,109.7C8880,112,9120,98,9360,93.3C9600,89,9840,93,10080,95.7C10320,98,10560,98,10800,88.7C11040,79,11280,61,11520,65.3C11760,70,12000,98,12240,91C12480,84,12720,42,12960,28C13200,14,13440,28,13680,30.3C13920,33,14160,23,14400,18.7C14640,14,14880,14,15120,18.7C15360,23,15600,33,15840,30.3C16080,28,16320,14,16560,28C16800,42,17040,84,17160,105L17280,126L17280,140L17160,140C17040,140,16800,140,16560,140C16320,140,16080,140,15840,140C15600,140,15360,140,15120,140C14880,140,14640,140,14400,140C14160,140,13920,140,13680,140C13440,140,13200,140,12960,140C12720,140,12480,140,12240,140C12000,140,11760,140,11520,140C11280,140,11040,140,10800,140C10560,140,10320,140,10080,140C9840,140,9600,140,9360,140C9120,140,8880,140,8640,140C8400,140,8160,140,7920,140C7680,140,7440,140,7200,140C6960,140,6720,140,6480,140C6240,140,6000,140,5760,140C5520,140,5280,140,5040,140C4800,140,4560,140,4320,140C4080,140,3840,140,3600,140C3360,140,3120,140,2880,140C2640,140,2400,140,2160,140C1920,140,1680,140,1440,140C1200,140,960,140,720,140C480,140,240,140,120,140L0,140Z"
					></path>
				</svg>
			</div>
		</div>
	);
};

export default Homepage_jumbotron;
