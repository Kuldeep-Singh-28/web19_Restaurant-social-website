import React, {useState} from 'react'
import ReactPlayer from 'react-player'
import {Container,Row,Col,Carousel} from 'react-bootstrap'
import FormatQuoteRoundedIcon from '@material-ui/icons/FormatQuoteRounded';
import StarHalfIcon from '@material-ui/icons/StarHalf';

import './styles/hotel.css'
import StarIcon from '@material-ui/icons/Star';

function ControlledCarousel() {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    const w = {
        height: "41vh",
        objectFit: "cover",
    };

    return (
        <Carousel activeIndex={index} onSelect={handleSelect}>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    style={w}
                    src="./food2.jpg"
                    alt="First slide"
                />
                <Carousel.Caption>
                    <div className='comment com-con'>
                        <FormatQuoteRoundedIcon className="quote"/>
                        <div className='mx-5 comment-text'>
                            This is awesome i like very much!<br/> 
                        <StarIcon/> 
                        <StarIcon/> 
                        <StarIcon/> 
                        <StarIcon/> 
                        <StarHalfIcon/>
                        </div> 
                        <FormatQuoteRoundedIcon className="quote2"/>
                    </div>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="./food3.jpg"
                    style={w}
                    alt="Second slide"
                />

                <Carousel.Caption>
                    <div className='comment com-con'>
                        <FormatQuoteRoundedIcon className="quote"/>
                        <div className='mx-5 comment-text'>
                            This is awesome i like very much!<br/> 
                        <StarIcon/> 
                        <StarIcon/> 
                        <StarIcon/> 
                        <StarIcon/> 
                        <StarHalfIcon/>
                        </div> 
                        <FormatQuoteRoundedIcon className="quote2"/>
                    </div>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="./statement.jpg"
                    style={w}
                    alt="Third slide"
                />

                <Carousel.Caption>
                    <div className='comment com-con'>
                        <FormatQuoteRoundedIcon className="quote"/>
                        <div className='mx-5 comment-text'>
                            This is awesome i like very much!<br/> 
                        <StarIcon/> 
                        <StarIcon/> 
                        <StarIcon/> 
                        <StarIcon/>     
                        <StarHalfIcon/>
                        </div> 
                        <FormatQuoteRoundedIcon className="quote2"/>
                    </div>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
}

function Homepage() {
    //IITISoC---Restaurant-social-website
    return (
        <div>
            <Container className="navbarx" fluid={true}>
            <Row className="mb-4" style={{minHeight:'41vh'}}>
                <Col sm={5}>
                <ReactPlayer  className='react-player' url='https://www.youtube.com/watch?v=ysz5S6PUM-U'  width='100%' height='100%' />
                </Col>
                <Col sm={7}>
                    <ControlledCarousel />                    
                </Col>
            </Row>
          
            <Row  className="navbarx"  >
                <div className='_statement mx-5'>
                    afmhelafa;nfa afjnkanfaoh
                </div>
                
            </Row>
            <Row>
                <Row >
                <div className='_circleI1'>
                    <img src="/download.jpg"/>
                </div>
                </Row>
                <Row >
                <div className='_circleI2'   >
                    <img src="/s.jpg"/>
                </div>
                </Row>
                
            </Row>
           </Container>
        </div>
    )
}

export default Homepage
