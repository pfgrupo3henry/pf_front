import { useState } from 'react';
import { Profile } from "../Auth0/profile";
import { useAuth0 } from "@auth0/auth0-react";
import { Card } from 'antd';
import { useParams } from 'react-router-dom';
import { Button, Rate } from 'antd';
import { Input } from 'antd';
import axios from "axios";
import Cookies from "universal-cookie";
import { useDispatch } from "react-redux";
import { addItemToChart } from "../../Redux/Actions/Index";


import "./CardDetail.css";
const imgProvisoria = require("../Assets/a-way-out-ps5-retro.jpg")




function CardDetail() {

    const { isAuthenticated } = useAuth0();
    const [card, setCard] = useState([]);
    const [string, setString] = useState("vacio");
    const { id } = useParams();
    const dispatch = useDispatch();
    const { Meta } = Card;
    const cookie = new Cookies();
    const idCoockie = cookie.get("id");

    if (!card.length) {

        axios.get(`https://pfservidor-production.up.railway.app/videogames/${id}`)
            .then((res) => {
                console.log(res.data)
                setCard([res.data])
            })
            .catch((err) => console.log(err))

    };

    const handleShoppingChart = () => {

        const product_id = card[0].id;
        const put = {
            userId: idCoockie,
            products:
            {
                id: product_id,
                quantity: 1
            }

        }

        setString("parrafo");
        dispatch(addItemToChart(put));

    };

    const handleShoppingChart2 = () => {

        const product_id = card[0].id;
        const put = {
            userId: idCoockie,
            products:
            {
                id: product_id,
                quantity: 1
            }

        }

        setString("parrafo");
        dispatch(addItemToChart(put));
        setTimeout(() => {
            window.location.href = "/status-payment";
        }, "600");

    };

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