import React, { useState, useEffect } from "react";
import { Carousel } from "react-bootstrap";
import { storage } from "./firebase";
function ControlledCarousel() {
    const [index, setIndex] = useState(0);
    const [files, setFiles] = useState([]);
    useEffect(() => {
        var storageRef = storage.ref("images");
        const fetchImages = async () => {
            let result = await storageRef.child("Main-Course").listAll();
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
        height: "min(319px,71vw)",
        objectFit: "cover",
    };

    return (
        <Carousel
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
                <Carousel.Caption>
                    <h3>First slide label</h3>
                    <p>
                        Nulla vitae elit libero, a pharetra augue mollis
                        interdum.
                    </p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={files[1]}
                    style={w}
                    alt="Second slide"
                />

                <Carousel.Caption>
                    <h3>Second slide label</h3>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing
                        elite.
                    </p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={files[2]}
                    style={w}
                    alt="Third slide"
                />

                <Carousel.Caption>
                    <h3>Third slide label</h3>
                    <p>
                        Praesent commodo cursus magna, vel scelerisque nisl
                        consectetur.
                    </p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
}

export default ControlledCarousel;
