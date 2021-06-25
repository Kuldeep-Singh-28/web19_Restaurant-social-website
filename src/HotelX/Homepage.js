import React from 'react'
import ReactPlayer from 'react-player'
import {Container,Row,Col} from 'react-bootstrap'
import FormatQuoteRoundedIcon from '@material-ui/icons/FormatQuoteRounded';
import StarHalfIcon from '@material-ui/icons/StarHalf';

import './styles/hotel.css'
import StarIcon from '@material-ui/icons/Star';
function Homepage() {
    //IITISoC---Restaurant-social-website
    return (
        <div>
            <Container className="navbarx" fluid={true}>
            <Row>
                <Col>
                <ReactPlayer  className='react-player' url='https://www.youtube.com/watch?v=ysz5S6PUM-U'  width='450px' height='400px' />
                </Col>
                <Col>
                    <div className='comment com-con'>
                        <FormatQuoteRoundedIcon className="quote"/>
                      <div className='py-.5 mx-5'>
                      this is awesome i like very much! 
                      <StarIcon/> 
                      <StarIcon/> 
                      <StarIcon/> 
                      <StarIcon/> 
                      <StarHalfIcon/>
                      </div> 
                      <FormatQuoteRoundedIcon className="quote2"/>
                    </div>
                    
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
                    <img src="/download.jpg"/>
                </div>
                </Row>
                
            </Row>
           </Container>
        </div>
    )
}

export default Homepage
