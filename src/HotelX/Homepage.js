import React from 'react'
import ReactPlayer from 'react-player'
import {Container,Row,Col} from 'react-bootstrap'
import FormatQuoteRoundedIcon from '@material-ui/icons/FormatQuoteRounded';
import './styles/hotel.css'
function Homepage() {
    return (
        <div>
            <Container className="navbarx" fluid={true}>
            <Row>
                <Col>
                <ReactPlayer  className='react-player' url='https://www.youtube.com/watch?v=ysz5S6PUM-U'  width='450px' height='400px' />
                </Col>
                <Col>
                    <div className='comment'>
                        <FormatQuoteRoundedIcon className="quote"/>
                        this is awesome i like very much!
                    </div>
                </Col>
            </Row>
          
            <Row  className="navbarx"  >
                <div className='_statement'>
                    afmhelafa;nfa afjnkanfaoh
                </div>
                
                
            </Row>
          
           </Container>
        </div>
    )
}

export default Homepage
