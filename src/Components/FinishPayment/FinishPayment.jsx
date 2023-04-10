import { Button } from 'antd';
import { Avatar, InputNumber, List, Space, Card } from 'antd';
import { useState, useEffect } from 'react';
import { AiOutlineDelete } from "react-icons/ai";
import axios from "axios"
import "./FinishPayment.css"
import Cookies from "universal-cookie";
import { useSelector, useDispatch } from "react-redux";
import { deleteChart, getChart } from "../../Redux/Actions/Index";

function FinishPayment() {

    const [position, setPosition] = useState('bottom');
    const [align, setAlign] = useState('center');
    const [totalPrice, settotalPrice] = useState("");
    const [string, setString] = useState("cuenta");
    const [precioFinal, setPrecioFinal] = useState([]);
    const Swal = require('sweetalert2');

    var shoppingChart = useSelector(state => state.shoppingChart);
    const dispatch = useDispatch();

    const cookie = new Cookies();
    const idCoockie = cookie.get("id");
    console.log(idCoockie);

    if (!idCoockie) {
        Swal.fire({
            title: "Error!",
            text: 'Debes inicar sesion',
            icon: "error",
            confirmButtonText: 'Ok'
        }).then((res) => {
            window.location.href = "/login"
        });
    }

    useEffect(() => {

        dispatch(getChart(idCoockie));

    }, [dispatch]);


    const handleQuantity = (id, item) => {

        var precioFinal4 = 0;

        for (let i = 0; i < precioFinal.length; i++) {
            if (item.id === precioFinal[i].id) {
                precioFinal4 = precioFinal4 + Number(precioFinal[i].price)
            }
        };

        console.log(precioFinal4);

        item.quantity = Number(item.quantity) + 1;
        var numero2 = totalPrice + Number(precioFinal4);
        item.price = Number(item.price) + Number(precioFinal4)
        settotalPrice(numero2);

    };

    const handleQuantity2 = (id, item) => {

        if (item.quantity === 1) {
            return (console.log("1"));
        };

        var precioFinal4 = 0;

        for (let i = 0; i < precioFinal.length; i++) {
            if (item.id === precioFinal[i].id) {
                precioFinal4 = precioFinal4 + Number(precioFinal[i].price)
            }
        };

        console.log(precioFinal4);

        item.quantity = Number(item.quantity) - 1;
        var numero2 = totalPrice - Number(precioFinal4);
        item.price = Number(item.price) - Number(precioFinal4)
        settotalPrice(numero2);

    };

    const onClickDelete = (id, price) => {

        let precio = Number(totalPrice) - Number(price);
        console.log(precio);

        let payload = {
            userId: idCoockie,
            gameId: id
        }

        dispatch(deleteChart(payload));
        settotalPrice(precio);

    };

    if (shoppingChart) {

        if (shoppingChart.products) {

            var newArray = shoppingChart.products;
            console.log(newArray)

            if (string === "cuenta") {
                var num = 0;
                var precioFinal2 = [];
                for (let i = 0; i < newArray.length; i++) {
                    precioFinal2.push({
                        price: newArray[i].price,
                        id: newArray[i].id
                    });
                    num = num + Number(newArray[i].price);
                }
                settotalPrice(num)
                setPrecioFinal(precioFinal2)
                setString("terminado")
            };

        };

        console.log(precioFinal);

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

        return (

            <div className='loader-payment'>Loading...</div>
        )

    };

};

export { FinishPayment };