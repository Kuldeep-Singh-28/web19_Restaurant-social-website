import React from "react";
import "./styles/HomePageCorusel.css";
function HomePageCorusel() {
    return (
        <div>
            <div className="slider">
                <div className="slide-track">
                    <div className="slide">
                        <img src="/food2.jpg" height="400" width="250" alt="" />
                    </div>
                    <div className="slide">
                        <img src="/food2.jpg" height="100" width="250" alt="" />
                    </div>
                    <div className="slide">
                        <img src="/food2.jpg" height="100" width="250" alt="" />
                    </div>
                    <div className="slide">
                        <img src="/food2.jpg" height="100" width="250" alt="" />
                    </div>
                    <div className="slide">
                        <img src="/food2.jpg" height="100" width="250" alt="" />
                    </div>
                    <div className="slide">
                        <img src="/food2.jpg" height="100" width="250" alt="" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePageCorusel;
