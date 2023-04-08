import { Button } from 'antd';
import { Avatar, InputNumber, List, Radio, Space, Card, Input } from 'antd';
import { useState, useEffect } from 'react';
import { AiOutlineDelete } from "react-icons/ai";
import axios from "axios"
import "./FinishPayment.css"
import Cookies from "universal-cookie";
import { useAuth0 } from "@auth0/auth0-react";
import { useSelector, useDispatch } from "react-redux";
import { deleteChart, getChart } from "../../Redux/Actions/Index";

function FinishPayment() {

    const [position, setPosition] = useState('bottom');
    const [align, setAlign] = useState('center');
    const [totalPrice, settotalPrice] = useState("");
    const { user, isAuthenticated, isLoading, loginWithPopup } = useAuth0();
    const [idUserAUth0, setIdUserAuth0] = useState([]);
    const [idManuelUser, setIdManuelUser] = useState("");
    var shoppingChart = useSelector(state => state.shoppingChart);
    const dispatch = useDispatch();

    useEffect(() => {

        if (idManuelUser) {
            dispatch(getChart(idManuelUser));
        }

    }, [dispatch]);


    const handleQuantity = (id, item) => {

        item.quantity = Number(item.quantity) + 1;
        var numero2 = totalPrice + Number(item.price);
        settotalPrice(numero2);

    };

    const handleQuantity2 = (id, item) => {

        if (item.quantity === 1) {
            return (console.log("1"));
        };

        item.quantity = Number(item.quantity) - 1;
        var numero2 = totalPrice - Number(item.price);
        settotalPrice(numero2);

    };

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

    if (!user) {

        if (idManuelUser === "") {

            const cookie = new Cookies();
            const idCoockie = cookie.get("id");
            console.log(idCoockie);

            setIdManuelUser(idCoockie);

        }

    };

    const onClickDelete = (id, price) => {

        if (user) {

            let precio = Number(totalPrice) - Number(price);
            console.log(precio);

            let payload = {
                userId: idUserAUth0[0].id,
                gameId: id
            }

            dispatch(deleteChart(payload));
            settotalPrice(precio);

        } else {

            let payload = {
                userId: idManuelUser,
                gameId: id
            }

            dispatch(deleteChart(payload));

        }

    };

    if (shoppingChart) {

        console.log(shoppingChart);

        return (
            <div className="finishPayment-component">
                <div className="checkout">
                    <div className='checkOutList-component'>
                        <div className='cartItems'>
                            <Space
                                direction="horizontal"
                                style={{
                                    marginBottom: '20px',
                                }}
                                size="middle"
                            >
                            </Space>
                            <List
                                pagination={{
                                    position,
                                    align,
                                }}
                                dataSource={shoppingChart.products}
                                renderItem={(item, index) => (
                                    <List.Item>
                                        <List.Item.Meta
                                            avatar={<Avatar src={item.img ? item.img[0] : ""} />}
                                            title={item.title}
                                            description={
                                                <div className='icons-container'>
                                                    {item.description}
                                                    <br></br>

                                                    <div className='quantity-delete'>

                                                        <Button className='button+' onClick={(e) => handleQuantity2(item.id, item)}>
                                                            -
                                                        </Button>
                                                        <p className='p-cantidad'>{item.quantity}</p>
                                                        <Button className='button-' onClick={(e) => handleQuantity(item.id, item)}>
                                                            +
                                                        </Button>

                                                        <Button className='button-borrar' onClick={(e) => onClickDelete(item.id, item.price)}>
                                                            <AiOutlineDelete className='deleteIcon' />
                                                        </Button>
                                                        <div className='unit-price'>
                                                            ${item.price}
                                                        </div>
                                                    </div>
                                                </div>
                                            }


                                        />
                                    </List.Item>

                                )}
                            />
                        </div>
                    </div>
                </div>
                <div className="card-payment-imgMercadoPago">
                    <div className="card-payment">
                        <Card
                            title={
                                <div className="container-aux">
                                    <div>
                                        Total:
                                    </div>
                                    <div>
                                        ${totalPrice}
                                    </div>
                                </div>
                            }
                            bordered={true}
                            style={{
                                width: 400,
                            }}
                        >
                            <p className="infoAux">Una vez realizado el pago, recibiras por mail
                                el detalle del mismo.
                            </p>
                            <br></br>
                            <br></br>
                            <Button
                                onClick={() => {
                                    axios.post("https://pfservidor-production.up.railway.app/payment/mercadopago", { totalPrice })
                                        .then((res) => {
                                            window.location.href = res.data.response.body.init_point;
                                        })
                                }}
                                className="buttonsCardDetail"
                                style={{ backgroundColor: "rgba(9, 22, 29, 0.712)" }}
                                type="primary"
                            >
                                Finalizar compra
                            </Button>

                        </Card>
                    </div>
                </div>

            </div>

        );

    } else {

        console.log(shoppingChart);

        return (

            <div className='loader-payment'>Loading...</div>
        )

    };

};

export { FinishPayment };