import React from "react";
import { Container, Row,Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Carousel from "./Carousel";
import Carousel1 from "./McCarousel";
import Carousel2 from "./Dcarousel";
import Carousel3 from "./BCarousel";
import Style from "./styles/Menu.module.css";
const Menu = () => {
    return (
        <div className={Style.menu_container}>
            <div className={Style.img_container}>
            <Container fluid className={Style._container} style={{padding:`3px`}}>
              <Row style={{marginTop:`16vh`}} className={Style.row}>
              <Col sm={7}>
                <div className={Style.Starters}>
                    <Link to="/starters">
                        <Carousel />
                    </Link>
                    
                </div>
                </Col>
                
                <Col sm={5}>
                <div className={Style.content}>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae perferendis, harum voluptas nam tempora earum mollitia doloremque. Inventore corporis nisi aut voluptatem placeat, ex itaque asperiores, sit, nihil culpa odio.
                      </div>
                </Col>
                  </Row>  
                  <Row className={Style.row}>
              <Col sm={5}>
              <div className={Style.content}>
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Obcaecati accusamus dolorem distinctio quibusdam optio deserunt ducimus est quos provident maiores, modi natus quo quasi tenetur sit laborum vitae quisquam incidunt!
                      </div>
                </Col>
                
                <Col sm={7}>
            
                      <div className={Style.Main_course}>
                    <Link to="/main-course">
                        <Carousel1/>
                    </Link>
                    
                </div>
                </Col>
                  </Row>  
                <Row className={Style.row}>
                    <Col sm={7}>
                        <div className={Style.Desserts}>
                            <Link to="/dessert">
                                <Carousel2 />
                            </Link>
                        </div>
                    </Col>
                    <Col sm={5}>
                        <div className={Style.content}>
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellat voluptatem velit laudantium ullam labore, fugit ipsum id? Optio corrupti harum corporis adipisci, quia eaque perspiciatis voluptas veniam, commodi rem ut?
                        </div>
                    </Col>
                </Row>    
                <Row className={Style.row}>
                <Col sm={5}>
              <div className={Style.content}>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum ad voluptatem non temporibus eius perferendis tempore laboriosam necessitatibus ipsa ut, deleniti dignissimos qui impedit quis dicta tempora eligendi provident. Nam?
                      </div>
                </Col>
                
                <Col sm={7}>
            
                      <div className={Style.bevrages}>
                    <Link to="/bevrages">
                        <Carousel3 />
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
