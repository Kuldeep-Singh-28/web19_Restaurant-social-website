import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup, NavigationControl } from "react-map-gl";
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
import "mapbox-gl/dist/mapbox-gl.css";
import Style from "./styles/Map.module.css";
import "./styles/map_universal.css";

export default function App() {
    const key =
        "pk.eyJ1IjoidWpqYXdhbG1pdHRhbCIsImEiOiJja3I2MjJveWIydzBsMnVwbGIwZTVmc3dkIn0.aDV19Ck7jY9Z670S3FfsUw";
    const [viewport, setViewport] = useState({
        latitude: 19.753925670211377,
        longitude: 90.89909860594204,
        width: "100vw",
        height: "87vh",
        zoom: 4,
    });
    const navControlStyle = {
        right: 20,
        top: 200,
    };
    const navControlStyle2 = {
        right: 10,
        top: 10,
    };
    const viewports = [];
    const setViewports = [];
    let temp_1;
    let smaller_window;
    temp_1 = useState({
        latitude: Data.features[0].geometry.coordinates[1],
        longitude: Data.features[0].geometry.coordinates[0],
        width: "100%",
        height: "40vh",
        zoom: 12,
    });
    viewports[0] = temp_1[0];
    setViewports[0] = temp_1[1];
    temp_1 = useState({
        latitude: Data.features[1].geometry.coordinates[1],
        longitude: Data.features[1].geometry.coordinates[0],
        width: "100%",
        height: "40vh",
        zoom: 12,
    });
    viewports[1] = temp_1[0];
    setViewports[1] = temp_1[1];
    temp_1 = useState({
        latitude: Data.features[2].geometry.coordinates[1],
        longitude: Data.features[2].geometry.coordinates[0],
        width: "100%",
        height: "40vh",
        zoom: 12,
    });
    viewports[2] = temp_1[0];
    setViewports[2] = temp_1[1];
    temp_1 = useState({
        latitude: Data.features[3].geometry.coordinates[1],
        longitude: Data.features[3].geometry.coordinates[0],
        width: "100%",
        height: "40vh",
        zoom: 12,
    });
    viewports[3] = temp_1[0];
    setViewports[3] = temp_1[1];
    temp_1 = useState({
        latitude: Data.features[4].geometry.coordinates[1],
        longitude: Data.features[4].geometry.coordinates[0],
        width: "100%",
        height: "40vh",
        zoom: 12,
    });
    viewports[4] = temp_1[0];
    setViewports[4] = temp_1[1];
    temp_1 = useState({
        latitude: Data.features[5].geometry.coordinates[1],
        longitude: Data.features[5].geometry.coordinates[0],
        width: "100%",
        height: "40vh",
        zoom: 12,
    });
    viewports[5] = temp_1[0];
    setViewports[5] = temp_1[1];
    temp_1 = useState({
        latitude: Data.features[6].geometry.coordinates[1],
        longitude: Data.features[6].geometry.coordinates[0],
        width: "100%",
        height: "40vh",
        zoom: 12,
    });
    viewports[6] = temp_1[0];
    setViewports[6] = temp_1[1];
    temp_1 = useState({
        latitude: Data.features[7].geometry.coordinates[1],
        longitude: Data.features[7].geometry.coordinates[0],
        width: "100%",
        height: "40vh",
        zoom: 12,
    });
    viewports[7] = temp_1[0];
    setViewports[7] = temp_1[1];
    temp_1 = useState({
        latitude: Data.features[8].geometry.coordinates[1],
        longitude: Data.features[8].geometry.coordinates[0],
        width: "100%",
        height: "40vh",
        zoom: 12,
    });
    viewports[8] = temp_1[0];
    setViewports[8] = temp_1[1];

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

    useEffect(() => {
        const locate_id = document.getElementById("locate_id");
        locate_id.style.textDecoration = `underline`;
        locate_id.style.textDecorationColor = `coral`;
        locate_id.style.textDecorationThickness = `2px`;
        locate_id.style.textUnderlineOffset = `5px`;
    }, []);

    return (
        <div className={Style.master_map_cont}>
            <ReactMapGL
                {...viewport}
                mapboxApiAccessToken={key}
                mapStyle="mapbox://styles/mapbox/dark-v10"
                onViewportChange={(viewport) => {
                    setViewport(viewport);
                }}
                className={Style.jumbo_map}
            >
                <NavigationControl style={navControlStyle} />
                {Data.features.map((Hotel) => (
                    <Marker
                        key={Hotel.properties.Hotel_ID}
                        latitude={Hotel.geometry.coordinates[1]}
                        longitude={Hotel.geometry.coordinates[0]}
                    >
                        <button
                            class="btn btn-outline-primary btn-rounded px-1"
                            onClick={(e) => {
                                e.preventDefault();
                                setSelectedHotel(Hotel);
                            }}
                            style={{ color: `transparent` }}
                        ></button>
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
                <div className={Style.svg}>
                    <svg
                        id="wave"
                        // style="transform:rotate(0deg); transition: 0.3s"
                        style={{
                            transform: `rotate(0deg)`,
                            transition: `0.3s`,
                        }}
                        viewBox="0 0 1440 190"
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
                                <stop stop-color="seashell" offset="0%"></stop>
                                <stop
                                    stop-color="seashell"
                                    offset="100%"
                                ></stop>
                            </linearGradient>
                        </defs>
                        <path
                            // style="transform:translate(0, 0px); opacity:1"
                            style={{
                                transform: `translate(0,0px)`,
                                opacity: `1`,
                            }}
                            fill="url(#sw-gradient-0)"
                            d="M0,95L80,107.7C160,120,320,146,480,129.8C640,114,800,57,960,50.7C1120,44,1280,89,1440,95C1600,101,1760,70,1920,53.8C2080,38,2240,38,2400,41.2C2560,44,2720,51,2880,50.7C3040,51,3200,44,3360,50.7C3520,57,3680,76,3840,72.8C4000,70,4160,44,4320,38C4480,32,4640,44,4800,44.3C4960,44,5120,32,5280,28.5C5440,25,5600,32,5760,34.8C5920,38,6080,38,6240,57C6400,76,6560,114,6720,129.8C6880,146,7040,139,7200,139.3C7360,139,7520,146,7680,148.8C7840,152,8000,152,8160,136.2C8320,120,8480,89,8640,63.3C8800,38,8960,19,9120,12.7C9280,6,9440,13,9600,15.8C9760,19,9920,19,10080,41.2C10240,63,10400,108,10560,114C10720,120,10880,89,11040,82.3C11200,76,11360,95,11440,104.5L11520,114L11520,190L11440,190C11360,190,11200,190,11040,190C10880,190,10720,190,10560,190C10400,190,10240,190,10080,190C9920,190,9760,190,9600,190C9440,190,9280,190,9120,190C8960,190,8800,190,8640,190C8480,190,8320,190,8160,190C8000,190,7840,190,7680,190C7520,190,7360,190,7200,190C7040,190,6880,190,6720,190C6560,190,6400,190,6240,190C6080,190,5920,190,5760,190C5600,190,5440,190,5280,190C5120,190,4960,190,4800,190C4640,190,4480,190,4320,190C4160,190,4000,190,3840,190C3680,190,3520,190,3360,190C3200,190,3040,190,2880,190C2720,190,2560,190,2400,190C2240,190,2080,190,1920,190C1760,190,1600,190,1440,190C1280,190,1120,190,960,190C800,190,640,190,480,190C320,190,160,190,80,190L0,190Z"
                        ></path>
                    </svg>
                </div>
            </ReactMapGL>

            <Container className={Style.starter_container}>
                <Row className={Style.row_top}>
                    <h1 className={Style.order_header}>Our Branches</h1>
                </Row>
                <Row className={Style.main_row}>
                    <CardColumns className={Style.accordion}>
                        {window.innerWidth < 576
                            ? Data.features.slice(0, 4).map((Hotel, index) => {
                                  return (
                                      <Card className={`mb-4 ${Style.card}`}>
                                          <ReactMapGL
                                              {...viewports[index]}
                                              mapboxApiAccessToken={key}
                                              mapStyle="mapbox://styles/mapbox/navigation-night-v1"
                                              onViewportChange={(viewport) => {
                                                  setViewports[index](viewport);
                                              }}
                                          >
                                              <NavigationControl
                                                  style={navControlStyle2}
                                              />
                                              <Marker
                                                  key={
                                                      Hotel.properties.Hotel_ID
                                                  }
                                                  latitude={
                                                      Hotel.geometry
                                                          .coordinates[1]
                                                  }
                                                  longitude={
                                                      Hotel.geometry
                                                          .coordinates[0]
                                                  }
                                              >
                                                  <button
                                                      class="btn btn-outline-primary btn-rounded px-1"
                                                      style={{
                                                          color: `transparent`,
                                                      }}
                                                  ></button>
                                              </Marker>
                                          </ReactMapGL>
                                          <Card.Body>
                                              <Card.Title
                                                  className={Style.card_title}
                                              >
                                                  <div>
                                                      {
                                                          Hotel.properties
                                                              .CITY_NAME
                                                      }
                                                  </div>
                                              </Card.Title>
                                              <Card.Text
                                                  className={Style.card_text}
                                              >
                                                  <small>
                                                      Lorem ipsum dolor sit amet
                                                      consectetur adipisicing
                                                      elit. Praesentium beatae
                                                      dolor, quia numquam Lorem,
                                                      ipsum dolor sit amet
                                                      consectetur.
                                                  </small>
                                              </Card.Text>
                                          </Card.Body>
                                      </Card>
                                  );
                              })
                            : Data.features.map((Hotel, index) => {
                                  return (
                                      <Card className={`mb-4 ${Style.card}`}>
                                          <ReactMapGL
                                              {...viewports[index]}
                                              mapboxApiAccessToken={key}
                                              mapStyle="mapbox://styles/mapbox/navigation-night-v1"
                                              onViewportChange={(viewport) => {
                                                  setViewports[index](viewport);
                                              }}
                                          >
                                              <NavigationControl
                                                  style={navControlStyle2}
                                              />
                                              <Marker
                                                  key={
                                                      Hotel.properties.Hotel_ID
                                                  }
                                                  latitude={
                                                      Hotel.geometry
                                                          .coordinates[1]
                                                  }
                                                  longitude={
                                                      Hotel.geometry
                                                          .coordinates[0]
                                                  }
                                              >
                                                  <button
                                                      class="btn btn-outline-primary btn-rounded px-1"
                                                      style={{
                                                          color: `transparent`,
                                                      }}
                                                  ></button>
                                              </Marker>
                                          </ReactMapGL>
                                          <Card.Body>
                                              <Card.Title
                                                  className={Style.card_title}
                                              >
                                                  <div>
                                                      {
                                                          Hotel.properties
                                                              .CITY_NAME
                                                      }
                                                  </div>
                                              </Card.Title>
                                              <Card.Text
                                                  className={Style.card_text}
                                              >
                                                  <small>
                                                      Lorem ipsum dolor sit amet
                                                      consectetur adipisicing
                                                      elit. Praesentium beatae
                                                      dolor, quia numquam Lorem,
                                                      ipsum dolor sit amet
                                                      consectetur.
                                                  </small>
                                              </Card.Text>
                                          </Card.Body>
                                      </Card>
                                  );
                              })}
                    </CardColumns>
                </Row>
            </Container>
        </div>
    );
}
