import React, { useState } from "react";
import "./LandingPage.css";
import { Link } from "react-router-dom";
import { Button } from "antd";
import { useAuth0 } from "@auth0/auth0-react";
import Cookies from "universal-cookie";
import axios from "axios";
import { LoadingOutlined, } from '@ant-design/icons';


function LandingPage() {

    const { user, isAuthenticated, isLoading, loginWithPopup } = useAuth0();
    const [state, setState] = useState(false);
    const cookie = new Cookies();

    React.useEffect(() => {
        document.querySelector('.nav-component').style.display = 'none';
        document.querySelector('.footer').style.display = 'none';
        return () => {
            document.querySelector('.nav-component').style.display = '';
            document.querySelector('.footer').style.display = '';
        }
    })

    if (isAuthenticated) {

        console.log(user);

        const emailAuth0 = user.email;

        const userAuth0 = {
            email: user.email,
            img: [user.picture],
            firstname: user.nickname
        }

        axios.post("https://pfservidor-production.up.railway.app/user/auth0", userAuth0)
            .then((res) => {
                console.log(res);
                cookie.set("id", res.data._id);
                cookie.set("email", res.data.email);
            })
            .catch((err) => console.log(err));

        axios.get(`https://pfservidor-production.up.railway.app/user/${emailAuth0}`)
            .then((res) => {
                console.log(res);
                cookie.set("id", res.data.id);
                cookie.set("email", res.data.email);
                cookie.set("status", res.data.status);
                cookie.set("role", res.data.role);
            })
            .catch((err) => console.log(err))

    };

    const onClick = () => {
        setState(true)
        setTimeout(function () {
            window.location.href = "/home"
        }, 2000);
    }

    return (
        <div className="landing-page-component container">
            <div className="row">
                <div className="col text-col">
                    <h1>Henry Games Store</h1>
                    <p>Jugar es una nueva habilidad , adorna tu tiempo con Video Juegos y añade diversión a tu vida</p>
                    <Button onClick={onClick}>Ingresar</Button>
                    {state === true ?
                        <LoadingOutlined />
                        :
                        null}
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

export default LandingPage;