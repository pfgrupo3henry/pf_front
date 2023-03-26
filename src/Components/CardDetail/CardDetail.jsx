import { useState } from 'react';
import { Profile } from "../Auth0/profile";
import { useAuth0 } from "@auth0/auth0-react";
import { Card, Col, Row } from 'antd';
import { useParams } from 'react-router-dom';
import { Avatar, Button, Rate } from 'antd';
import { Input } from 'antd';
import axios from "axios";



import "./CardDetail.css";
const imgProvisoria = require("../Assets/a-way-out-ps5-retro.jpg")




function CardDetail() {


    const [card, setCard] = useState([]);
    const { user, isAuthenticated, isLoading } = useAuth0();
    const { id } = useParams();

    const { Meta } = Card;

    if (!card.length) {

        axios.get(`https://pfservidor-production.up.railway.app/videogames/${id}`)
            .then((res) => {
                console.log(res.data)
                setCard([res.data])
            })
            .catch((err) => console.log(err))

    };

    console.log(card);
    console.log(id);

    if (card.length !== 0) {

        var precio = `$ ${card[0].price}`

        return (

            <div className="body-card card-detail-component">

                <div className="cardsDetailsRates">
                    <div className="cardsContainer">
                        <div className="cardFormReview">
                            <Card
                                style={{ width: 350, height: 525 }}
                                cover={
                                    <img
                                        style={{ width: 350, height: 400 }}
                                        alt="Among Us"
                                        src={card[0].image[0]}
                                    />
                                }
                            >
                                <Meta
                                    title={card[0].name}
                                    description=""
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
                                    height: 450
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
                                    >
                                        Buy
                                    </Button>

                                    <Button
                                        style={{ color: "rgba(9, 22, 29, 0.712)" }}
                                        className="buttonsCardDetail"
                                    >
                                        Add To Cart
                                    </Button>
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
        );

    } else {


        return (

            <div>Loading...</div>

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