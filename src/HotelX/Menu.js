import React from "react";
import { Container, Row,Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Carousel from "./Carousel";
import Style from "./styles/Menu.module.css";
import FormatQuoteRoundedIcon from "@material-ui/icons/FormatQuoteRounded";
const Menu = () => {
    return (
        <div className={Style.menu_container}>
            <div className={Style.img_container}>
            <Container fluid className={Style._container}>
              <Row>
              <Col>
                <div className={Style.Starters}>
                    <Link to="/starters">
                        <Carousel />
                    </Link>
                    
                </div>
                </Col>
                
                <Col>
                <div className="_content">
                      qf
                      </div>
                </Col>
                  </Row>  
                  <Row>
              <Col>
              <div className="">
                      qf
                      </div>
                </Col>
                
                <Col>
            
                      <div className={Style.Starters}>
                    <Link to="/starters">
                        <Carousel />
                    </Link>
                    
                </div>
                </Col>
                  </Row>  
                <div className={Style.Main_course}>
                    <Link to="/main_course">
                        <Carousel />
                    </Link>
                </div>
                <Row>
              <Col>
              <div className="">
                      qf
                      </div>
                </Col>
                
                <Col>
            
                      <div className={Style.Starters}>
                    <Link to="/starters">
                        <Carousel />
                    </Link>
                    
                </div>
                </Col>
                  </Row>    
            </Container>
            </div>
            
        </div>
    );
};

export default Menu;
