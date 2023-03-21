import React from "react";
import { Avatar, Card, Button, Rate } from 'antd';
import "./CardDetail.css";



function CardDetail() {

    const { Meta } = Card;


    return (

        <div className="body-card">

            <Card
                style={{ width: 1450 }}
                cover={
                    <img
                        style={{ width: 600 }}
                        alt="Among Us"
                        src="https://www.lavanguardia.com/files/og_thumbnail/uploads/2020/12/16/5fd9d501ac6eb.jpeg"
                    />
                }
            >

                <h1>Among Us</h1>

                <br></br>

                <h2>Desde $1950</h2>

                <br></br>

                <p className="descripcion-juego">
                    Among Us (traducido como entre nosotros) es un videojuego de género party y multijugador en línea desarrollado por la compañía estadounidense Innersloth y distribuido entre junio y noviembre de 2018 para las plataformas Android, iOS y Windows. El 15 de diciembre de 2020 se anunció su disponibilidad en Nintendo Switch, mientras que su adaptación a las consolas Xbox One y Xbox Series X|S se confirmó para 14 de diciembre de 2021.Posteriormente se anunció su lanzamiento para PlayStation 4 y PlayStation 5 con skins exclusivos.
                    La trama del juego consiste en un grupo de tripulantes a bordo de una nave espacial que deben supervisar el adecuado funcionamiento del vehículo, al mismo tiempo que investigan a los «impostores» que intentan sabotear la nave y asesinarlos durante cada partida.
                    Un par de años después de su aparición en el mercado, en 2020 gozó de una mayor popularidad gracias a los vídeos publicados por streamers de Twitch y Youtube en los que se comparten partidas del juego.Como resultado, el 17 de septiembre de ese año se registraron más de 85 millones de descargas en dispositivos móviles. Según la empresa Sensor Tower, solo en Estados Unidos ha acumulado 20 millones de descargas, en Brasil cerca de 16 millones, y en México casi 7 millones; que entre estos tres países americanos sumaron más de la mitad en descargas.
                    Aunque el estudio había anunciado el desarrollo de una secuela, descartaron esa opción y optaron por mejorar la existente. Durante el año 2020, inspiró memes de Internet que le ayudó a captar un mayor número de seguidores en línea, solo en el periodo de agosto de 2019 y agosto de 2020 creció un 661 % en descargas a nivel mundial.
                </p>

                <br></br>

                <h3>Rating: <Rate disabled allowHalf defaultValue={4.5} /></h3>

                <br></br>

                <Button type="primary" block>
                    Buy
                </Button>

                <Button block>Add To Cart</Button>

            </Card>

            <br></br>

            <div className="comentarios-card">

                <h1>Valoracion y Reseñas:</h1>

                <br></br>

                <h2><Avatar src="https://joesch.moe/api/v1/random" /> Julian Alvarez:</h2>

                <h3>Valoracion: <Rate disabled allowHalf defaultValue={4} /></h3>

                <p>
                    El juego siempre estuvo bien, tu manera de comunicarte hasta cierto punto definía partidas y era bastante entretenido.Yo al menos conseguí una habilidad escribiendo con el móvil gracias a Among Us. Pero hace un tiempo sacaron una maravillosa actualización donde implementavan el chat rápido cuya función era hacer más rápida la respuesta de los jugadores..
                    La magia murió paso de jugar con alguien a poder ser perfectamente un bot , ya no había interacción, ponerse nervioso absolutamente nada paso a ser frío y un juego donde si no eres impostor es mejor abandonar la partida dado que no hay nada interesante que hacer.
                    En fin sus propios creadores destruyeron el juego más popular del 2020.
                </p>

            </div>

        </div>
    );

};

export default CardDetail;