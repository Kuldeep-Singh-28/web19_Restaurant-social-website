import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import image1 from "./images/map1.jpg";
import image2 from "./images/map2.jpg";
import {
    Container,
    Row,
    Col,
    Card,
    CardColumns,
    ListGroupItem,
    ListGroup,
} from "react-bootstrap";
import { MDBRipple } from "mdb-react-ui-kit";
import * as Data from "./hotel.json";
import Style from "./styles/Map.module.css";

export default function App() {
    const key =
        "pk.eyJ1IjoidWpqYXdhbG1pdHRhbCIsImEiOiJja3I2MjJveWIydzBsMnVwbGIwZTVmc3dkIn0.aDV19Ck7jY9Z670S3FfsUw";
    const [viewport, setViewport] = useState({
        latitude: 22.753925670211377,
        longitude: 75.89909860594204,
        width: "100vw",
        height: "100vh",
        zoom: 10,
    });
    const [selectedHotel, setSelectedHotel] = useState(null);

    useEffect(() => {
        const listener = (e) => {
            if (e.key === "Escape") {
                setSelectedHotel(null);
            }
        };
        window.addEventListener("keydown", listener);

        return () => {
            window.removeEventListener("keydown", listener);
        };
    }, []);

    return (
        <div className={Style.master_map_cont}>
            <ReactMapGL
                {...viewport}
                mapboxApiAccessToken={key}
                mapStyle="mapbox://styles/ujjawalmittal/ckr64smm422ca17nzgsekwf68"
                onViewportChange={(viewport) => {
                    setViewport(viewport);
                }}
                className={Style.jumbo_map}
            >
                {Data.features.map((Hotel) => (
                    <Marker
                        key={Hotel.properties.Hotel_ID}
                        latitude={Hotel.geometry.coordinates[1]}
                        longitude={Hotel.geometry.coordinates[0]}
                    >
                        <button
                            className="marker-btn"
                            onClick={(e) => {
                                e.preventDefault();
                                setSelectedHotel(Hotel);
                            }}
                        >
                            <img src="/H.svg" alt="Skate Hotel Icon" />
                        </button>
                    </Marker>
                ))}

                {selectedHotel ? (
                    <Popup
                        latitude={selectedHotel.geometry.coordinates[1]}
                        longitude={selectedHotel.geometry.coordinates[0]}
                        onClose={() => {
                            setSelectedHotel(null);
                        }}
                    >
                        <div>
                            <h2>{selectedHotel.properties.NAME}</h2>
                            <p>{selectedHotel.properties.DESCRIPTIO}</p>
                        </div>
                    </Popup>
                ) : null}
            </ReactMapGL>
            <Container className={Style.starter_container}>
                <Row className={Style.main_row}>
                    <CardColumns className={Style.accordion}>
                        <Card className={`mb-4 ${Style.card}`}>
                            <MDBRipple
                                rippleColor="dark"
                                rippleTag="div"
                                className="bg-image hover-overlay"
                            >
                                <Card.Img
                                    variant="top"
                                    src={image1}
                                    className={Style.image_card}
                                    style={{
                                        filter: "none",
                                    }}
                                />
                                <a>
                                    <div
                                        className="mask"
                                        style={{
                                            backgroundColor:
                                                "rgba(251, 251, 251, 0.15)",
                                        }}
                                    ></div>
                                </a>
                            </MDBRipple>
                            <Card.Body>
                                <Card.Title className={Style.card_title}>
                                    <div>INDORE</div>
                                </Card.Title>
                                <Card.Text className={Style.card_text}>
                                    Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit. Praesentium beatae dolor,
                                    quia numquam nulla similique hic dolorum
                                    modi odit saepe, nemo neque, animi
                                    consectetur nostrum debitis eum voluptatum
                                    laborum, qui.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                        <Card className={`mb-4 ${Style.card}`}>
                            <MDBRipple
                                rippleColor="dark"
                                rippleTag="div"
                                className="bg-image hover-overlay"
                            >
                                <Card.Img
                                    variant="top"
                                    src={image2}
                                    className={Style.image_card}
                                    style={{
                                        filter: "none",
                                    }}
                                />
                                <a>
                                    <div
                                        className="mask"
                                        style={{
                                            backgroundColor:
                                                "rgba(251, 251, 251, 0.15)",
                                        }}
                                    ></div>
                                </a>
                            </MDBRipple>
                            <Card.Body>
                                <Card.Title className={Style.card_title}>
                                    <div>DELHI</div>
                                </Card.Title>
                                <Card.Text className={Style.card_text}>
                                    Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit. Praesentium beatae dolor,
                                    quia numquam nulla similique hic dolorum
                                    modi odit saepe, nemo neque, animi
                                    consectetur nostrum debitis eum voluptatum
                                    laborum, qui.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </CardColumns>
                </Row>
            </Container>
        </div>
    );
}
