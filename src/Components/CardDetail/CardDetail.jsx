import { useState } from 'react';
import { Profile } from "../Auth0/profile";
import { useAuth0 } from "@auth0/auth0-react";
import { Card, Col, Row } from 'antd';
import { useParams } from 'react-router-dom';
import { Avatar, Button, Rate } from 'antd';
import { Input } from 'antd';
import axios from "axios";
import Cookies from "universal-cookie";
import { useDispatch } from "react-redux";
import { addItemToChart } from "../../Redux/Actions/Index";


import "./CardDetail.css";
const imgProvisoria = require("../Assets/a-way-out-ps5-retro.jpg")




function CardDetail() {


    const [card, setCard] = useState([]);
    const { user, isAuthenticated, isLoading } = useAuth0();
    const [idUserAUth0, setIdUserAuth0] = useState([]);
    const [idManuelUser, setIdManuelUser] = useState("");
    const [string, setString] = useState("vacio");
    const { id } = useParams();
    const dispatch = useDispatch();
    const { Meta } = Card;

    if (!card.length) {

        axios.get(`https://pfservidor-production.up.railway.app/videogames/${id}`)
            .then((res) => {
                console.log(res.data)
                setCard([res.data])
            })
            .catch((err) => console.log(err))

    };

    if (isAuthenticated) {

        if (user && idUserAUth0.length === 0) {

            const emailAuth0 = user.email;

            if (idUserAUth0.length === 0) {

                axios.get(`https://pfservidor-production.up.railway.app/user/${emailAuth0}`)
                    .then((res) => {
                        console.log(res.data);
                        setIdUserAuth0([res.data]);
                    })
                    .catch((err) => console.log(err))

            }

        };

    };

    if (!user) {

        if (idManuelUser === "") {

            const cookie = new Cookies();
            const idCoockie = cookie.get("id");
            console.log(idCoockie);

            setIdManuelUser(idCoockie);

        }

    };

    const handleShoppingChart = () => {

        if (user) {

            const product_id = card[0].id;
            const put = {
                userId: idUserAUth0[0].id,
                products:
                {
                    id: product_id,
                    quantity: 1
                }

            }

            setString("parrafo");
            dispatch(addItemToChart(put));
            console.log("obj", put);

        } else if (!user) {

            const product_id = card[0].id;
            const put = {
                userId: idManuelUser,
                products:
                {
                    id: product_id,
                    quantity: 1
                }

            }

            setString("parrafo");
            dispatch(addItemToChart(put))
            console.log("obj", put)

        }

    };

    const handleShoppingChart2 = () => {

        if (user) {

            const product_id = card[0].id;
            const put = {
                userId: idUserAUth0[0].id,
                products:
                {
                    id: product_id,
                    quantity: 1
                }

            }

            setString("parrafo");
            dispatch(addItemToChart(put));
            console.log("obj", put);
            setTimeout(() => {
                window.location.href = "/status-payment";
            }, "600");

        } else if (!user) {

            const product_id = card[0].id;
            const put = {
                userId: idManuelUser,
                products:
                {
                    id: product_id,
                    quantity: 1
                }

            }

            setString("parrafo");
            dispatch(addItemToChart(put))
            console.log("obj", put)
            setTimeout(() => {
                window.location.href = "/status-payment";
            }, "2000");

        }

    };

    console.log(card);
    console.log(id);
    console.log(idUserAUth0);
    console.log(idManuelUser);

    if (card.length !== 0) {

        console.log(card[0].id);

        var precio = `$ ${card[0].price}`

        return (

            <div className='card-detail-component2'>

                <div className="body-card card-detail-component">

                    <div className="cardsDetailsRates">
                        <div className="cardsContainer">
                            <div className="cardFormReview">
                                <Card
                                    style={{ width: 360, height: 580 }}
                                    cover={
                                        <img
                                            style={{ width: 360, height: 460 }}
                                            alt="Among Us"
                                            src={card[0].image[0]}
                                        />
                                    }
                                >
                                    <Meta
                                        title={card[0].name}
                                        description="Henry Game Store, the best console games, at the best market price"
                                    />
                                    <br></br>
                                </Card>

                                <div className="rateForm">
                                    <Rate
                                        className="rateAux"
                                        allowHalf defaultValue={2.5} />

                                    <div className="inputButton">
                                        <Input
                                            className="form"
                                            placeholder="Leave your comment" bordered={false} />

                                        <Button
                                            className="buttonAux"
                                            style={{ backgroundColor: "rgba(9, 22, 29, 0.712)" }}
                                            type="primary"
                                        >
                                            Send
                                        </Button>
                                    </div>
                                </div>
                            </div>


                            <div className="detailNameInfo">
                                <div className="nameFormat">
                                    <h3 className="title">{card[0].name}</h3>
                                    <p className="title">DIGITAL</p>
                                </div>
                                <br></br>
                                <hr></hr>
                                <Card
                                    className="cardDetailDescription"
                                    title={precio}
                                    bordered={false}
                                    style={{
                                        width: 300,
                                        height: 510
                                    }}
                                >
                                    <p>
                                        {card[0].description}
                                    </p>

                                    <br></br>
                                    <br></br>
                                    <p>Platforma: {card[0].platform}</p>
                                    <p>Genero: {card[0].genre}</p>

                                    <div className="buttonsContainer">
                                        <Button
                                            className="buttonsCardDetail"
                                            style={{ backgroundColor: "rgba(9, 22, 29, 0.712)" }}
                                            type="primary"
                                            onClick={handleShoppingChart2}
                                        >
                                            Buy
                                        </Button>

                                        <Button
                                            style={{ color: "rgba(9, 22, 29, 0.712)" }}
                                            className="buttonsCardDetail"
                                            onClick={handleShoppingChart}
                                        >
                                            Add To Cart
                                        </Button>

                                        {string === "parrafo" ?
                                            <p className='p-carrito-cardD'>Carrito cargado</p>
                                            :
                                            null}
                                    </div>

                                </Card>
                            </div>

                            <div className="comentarios-card">


                                <div className="reviewsContainer">




                                    <Card title="" bordered={false}>
                                        <div className="nameComment">
                                            <div className="imgRate">
                                                {!isAuthenticated ? null : <Profile />}
                                                <Rate
                                                    className="rate"
                                                    disabled defaultValue={5} />
                                            </div>
                                            <p className="comment">
                                                ¡Great!, an incredible game, i love it
                                            </p>

                                        </div>
                                    </Card>


                                    <Card title="" bordered={false}>
                                        <div className="nameComment">
                                            <div className="imgRate">
                                                {!isAuthenticated ? null : <Profile />}
                                                <Rate
                                                    className="rate"
                                                    disabled defaultValue={2} />
                                            </div>
                                            <p className="comment">
                                                ¡Great!, an incredible game, i love it
                                            </p>

                                        </div>
                                    </Card>


                                    <Card title="" bordered={false}>
                                        <div className="nameComment">
                                            <div className="imgRate">
                                                {!isAuthenticated ? null : <Profile />}
                                                <Rate
                                                    className="rate"
                                                    disabled defaultValue={4} />
                                            </div>
                                            <p className="comment">
                                                ¡Great!, an incredible game, i love it
                                            </p>

                                        </div>
                                    </Card>

                                </div>

                            </div>
                        </div>
                    </div>








                    <br></br>



                </div>
            </div >
        );

    } else {


        return (

            <div className='loader-card-detail'>Loading...</div>

        );

    };

};

export default CardDetail;






{/*                 <h1>Among Us</h1>
                <br></br>
                <h2>Desde $1950</h2>
                <br></br>
                <p className="descripcion-juego">
                    Among Us (traducido como entre nosotros) es un videojuego de género party y multijugador en línea desarrollado por la compañía estadounidense Innersloth y distribuido entre junio y noviembre de 2018 para las plataformas Android, iOS y Windows. El 15 de diciembre de 2020 se anunció su disponibilidad en Nintendo Switch, mientras que su adaptación a las consolas Xbox One y Xbox Series X|S se confirmó para 14 de diciembre de 2021.Posteriormente se anunció su lanzamiento para PlayStation 4 y PlayStation 5 con skins exclusivos.
                    La trama del juego consiste en un grupo de tripulantes a bordo de una nave espacial que deben supervisar el adecuado funcionamiento del vehículo, al mismo tiempo que investigan a los «impostores» que intentan sabotear la nave y asesinarlos durante cada partida.
                    Un par de años después de su aparición en el mercado, en 2020 gozó de una mayor popularidad gracias a los vídeos publicados por streamers de Twitch y Youtube en los que se comparten partidas del juego.Como resultado, el 17 de septiembre de ese año se registraron más de 85 millones de descargas en dispositivos móviles. Según la empresa Sensor Tower, solo en Estados Unidos ha acumulado 20 millones de descargas, en Brasil cerca de 16 millones, y en México casi 7 millones; que entre estos tres países americanos sumaron más de la mitad en descargas.
                    Aunque el estudio había anunciado el desarrollo de una secuela, descartaron esa opción y optaron por mejorar la existente. Durante el año 2020, inspiró memes de Internet que le ayudó a captar un mayor número de seguidores en línea, solo en el periodo de agosto de 2019 y agosto de 2020 creció un 661 % en descargas a nivel mundial.
                </p>
                <br></br> */}

{/* <h3>Rating: <Rate disabled allowHalf defaultValue={4.5} /></h3> */ }