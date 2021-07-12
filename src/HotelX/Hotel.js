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
import Admin from "./Admin";
import Cart from "./Cart";
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
              <Route path="/admin" component={Admin}/>
              <Route path="/my-cart" component={Cart} />
            </Router>
          </Container>
        </Container>
        <Footer />
      </div>
    </div>
  );
}

export default Hotel;
