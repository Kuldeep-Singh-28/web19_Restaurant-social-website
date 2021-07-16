import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import * as Data from "./hotel.json";

export default function App() {
  const key = process.env.REACT_APP_MAPBOX_KEY
  const [viewport, setViewport] = useState({
    latitude: 22.753925670211377,
    longitude: 75.89909860594204,
    width: "100vw",
    height: "100vh",
    zoom: 10
  });
  const [selectedHotel, setSelectedHotel] = useState(null);

  useEffect(() => {
    const listener = e => {
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
    <div>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={key}
        mapStyle="mapbox://styles/ujjawalmittal/ckr64smm422ca17nzgsekwf68"
        onViewportChange={viewport => {
          setViewport(viewport);
        }}
      >
        {Data.features.map(Hotel => (
          <Marker
            key={Hotel.properties.Hotel_ID}
            latitude={Hotel.geometry.coordinates[1]}
            longitude={Hotel.geometry.coordinates[0]}
          >
            <button
              className="marker-btn"
              onClick={e => {
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
    </div>
  );
}