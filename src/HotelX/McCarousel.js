import React, { useState, useEffect } from "react";
import { Carousel } from "react-bootstrap";
import { storage } from "./firebase";
// import menu_test from "./images/menu_test.png";
function ControlledCarousel() {
    const [index, setIndex] = useState(0);
    const [files, setFiles] = useState([]);
    useEffect(() => {
        var storageRef = storage.ref("images");
        const fetchImages = async () => {
            let result = await storageRef.child("Main-courses").listAll();
            let urlPromises = result.items.map((imageRef) =>
                imageRef.getDownloadURL()
            );

            return Promise.all(urlPromises);
        };

        const loadImages = async () => {
            const urls = await fetchImages();
            setFiles(urls);
        };
        loadImages();
    }, []);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    const w = {
        height: `500px`,
        objectFit: "cover",
        filter: `none`,
    };

    return (
        <Carousel
            fade
            indicators={false}
            controls={false}
            activeIndex={index}
            onSelect={handleSelect}
            style={{ height: `100%` }}
        >
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    style={w}
                    src={files[0]}
                    alt="First slide"
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={files[1]}
                    style={w}
                    alt="Second slide"
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={files[2]}
                    style={w}
                    alt="Third slide"
                />
            </Carousel.Item>
        </Carousel>
    );
}

export default ControlledCarousel;
