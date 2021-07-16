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
import Map1 from "./Map1";
function Hotel() {
  return (
    <div>
      <div>
        <Container fluid={true} className="px-0">
          <Container
            className="navbarx mx-0 px-0 w-100"
            style={{ maxWidth: "100vw" }}
          >
            <Router>
              <Navbar />
              <Route path="/menu" component={Menu} />
              <Route exact path="/" component={Homepage} />
              <Route path="/login" component={Auth} />
              <Route path="/starters" component={Starters} />
              <Route path="/main_course" component={Main_courses} />
              <Route path="/beverages" component={Beverages} />
              <Route path="/desserts" component={Desserts} />
              <Route path="/admin" component={Admin} />
              <Route path="/map" component={Map1} />
            </Router>
          </Container>
        </Container>
        <Footer />
      </div>
    </div>
  );
}

export default Hotel;
