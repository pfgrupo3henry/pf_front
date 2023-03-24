import React from "react";
import "./LandingPage.css";




function LandingPage() {

    const onClick = () => {
        window.location.href = "http://localhost:3000/home";
    };



    return (

        <div className="container">

            <div className="row">

                <div className="col">
                    <h1>Video Juegos</h1>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                        incididunt ut labore et dolore magna aliqua.
                    </p>
                    <button type="button" onClick={onClick}>Explore</button>
                </div>

                <div className="col">

                    <div className="card card1"></div>

                    <div className="card card2"></div>

                    <div className="card card3"></div>

                    <div className="card card4"></div>

                    <div className="card card5"></div>

                    <div className="card card6"></div>

                </div>

            </div>

        </div>

    );

};

export default LandingPage;