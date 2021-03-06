import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import {
    BrowserRouter as Router,
    Route,
    Switch,
    useParams,
} from "react-router-dom";
import Navbar from "./Navbar";
import Homepage from "./Homepage";
import Menu from "./Menu";
import Auth from "./Auth";
import Footer from "./Footer";
import Starters from "./Starters";
import Main_courses from "./Main_courses";
import Beverages from "./Beverages";
import Desserts from "./Desserts";
import Admin from "./Admin";
import Cart from "./Cart";
import Style from "./styles/Master_page.module.css";
import Map from "./Map1";
import Payment from "./Payment";
import User from "./User";
import Not_found from "./Not_found";
import Contact_us from "./Contact_us";

function Hotel() {
    const backToTop = (e) => {
        window.scrollTo(0, 0);
    };
    let instinct10;
    useEffect(() => {
        window.addEventListener("DOMContentLoaded", () => {
            let btn = document.querySelector("#back_to_top_id");
            if (window.scrollY < 600) {
                btn.style.visibility = `hidden`;
                instinct10 = 0;
            } else {
                instinct10 = 1;
            }
        });

        window.addEventListener("scroll", () => {
            let btn = document.querySelector("#back_to_top_id");
            if (window.scrollY < 600 && instinct10 !== 0) {
                btn.style.visibility = `hidden`;
                instinct10 = 0;
            } else if (window.scrollY >= 600 && instinct10 !== 1) {
                btn.style.visibility = `unset`;
                instinct10 = 1;
            }
        });
    });

    useEffect(() => {
        let blank = document.querySelector("#blank");
        let body = document.querySelector("body");
        body.style.overflowY = `hidden`;
        setTimeout(() => {
            blank.style.display = `none`;
            body.style.overflowY = `inherit`;
        }, 5000);
    });

    return (
        <div>
            <div>
                <div className={Style.back_to_top}>
                    <button
                        id="back_to_top_id"
                        class="btn btn-rounded btn-sm"
                        style={{
                            backgroundColor: `coral`,
                            zIndex: `1422`,
                            color: `white`,
                        }}
                        onClick={backToTop}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            class="bi bi-arrow-up"
                            viewBox="0 0 16 16"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z"
                            />
                        </svg>
                    </button>
                </div>
                <div className={Style.blank} id="blank">
                    <div className={Style.wrap}>
                        <div className={Style.loading}>
                            <div className={Style.bounceball}></div>
                            <div className={`display-6 ${Style.text}`}>
                                NOW LOADING
                            </div>
                        </div>
                    </div>
                </div>
                <Container fluid={true} className="px-0">
                    <Container
                        className="navbarx mx-0 px-0 w-100"
                        style={{ maxWidth: "100vw" }}
                    >
                        <Router>
                            <Navbar />
                            <Switch>
                                <Route exact path="/menu" component={Menu} />
                                <Route exact path="/" component={Homepage} />
                                <Route exact path="/login" component={Auth} />
                                <Route
                                    exact
                                    path="/starters"
                                    component={Starters}
                                />
                                <Route
                                    exact
                                    path="/main_course"
                                    component={Main_courses}
                                />
                                <Route
                                    exact
                                    path="/beverages"
                                    component={Beverages}
                                />
                                <Route
                                    exact
                                    path="/desserts"
                                    component={Desserts}
                                />
                                <Route exact path="/admin" component={Admin} />
                                <Route exact path="/locate" component={Map} />
                                <Route
                                    exact
                                    path="/payment"
                                    component={Payment}
                                />
                                <Route exact path="/user" component={User} />
                                <Route
                                    exact
                                    path="/contact_us"
                                    component={Contact_us}
                                />
                                <Route component={Not_found} />
                            </Switch>
                        </Router>
                    </Container>
                </Container>
                <Footer />
            </div>
        </div>
    );
}

export default Hotel;
