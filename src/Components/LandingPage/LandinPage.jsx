import React from "react";
import "./LandingPage.css";
import { Link } from "react-router-dom";
import { Button } from "antd";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

function LandingPage() {

    React.useEffect(() => {
        document.querySelector('.nav-component').style.display = 'none';
        document.querySelector('.footer').style.display = 'none';
        return () => {
            document.querySelector('.nav-component').style.display = '';
            document.querySelector('.footer').style.display = '';
        }
    })

    const { user, isAuthenticated, isLoading } = useAuth0();

    if (isAuthenticated) {

        const userAuth0 = {
            email: user.email
        }

        axios.post("http://localhost:3001/user/auth0", userAuth0)
            .then((res) => console.log(res))
            .catch((err) => console.log(err));

        return (
            <div className="landing-page-component container">
                <div className="row">
                    <div className="col text-col">
                        <h1>Videojuegos</h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                        <Link to="/home">
                            <Button>Ingresar</Button>
                        </Link>
                    </div>
                    <div className="col cards-col">
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

    } else if (isLoading) {

        return (<div>Loading...</div>);

    } else {

        return (
            <div className="landing-page-component container">
                <div className="row">
                    <div className="col text-col">
                        <h1>Videojuegos</h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                        <Link to="/home">
                            <Button>Ingresar</Button>
                        </Link>
                    </div>
                    <div className="col cards-col">
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

};

export default LandingPage;