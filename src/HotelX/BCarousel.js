import React, { useState, useEffect } from "react";
import { Carousel } from "react-bootstrap";
import { storage } from "./firebase";
import one from "./images/admin.jpg";
import two from "./images/food3.jpg";
import three from "./images/middle2.2.jpg";
function ControlledCarousel() {
    const [index, setIndex] = useState(0);
    const [files, setFiles] = useState([]);
    useEffect(() => {
        var storageRef = storage.ref("images");
        const fetchImages = async () => {
            let result = await storageRef.child("Beverages").listAll();
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
