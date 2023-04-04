import { Button } from 'antd';
import { SiMercadopago } from "react-icons/si";
import { Avatar, InputNumber, List, Radio, Space, Card, Input } from 'antd';
import imgProvisoria2 from "../Assets/a-way-out-ps5-retro.jpg";
import { useState } from 'react';
import { AiOutlineDelete } from "react-icons/ai";
import axios from "axios"
import "./FinishPayment.css"
import Cookies from "universal-cookie";
import { useAuth0 } from "@auth0/auth0-react";
import Item from 'antd/es/list/Item';




function FinishPayment() {

    /*const allProducts = [
        { title: "juego de prueba", category_id: "art", currency_id: "ARS", unit_price: 1330.50, description: "La edición Ultimate Evil potencia el juego base con la expansión Reaper of Souls y el nuevo modo Aventura para obtener mejores recompensas. Los jugadores podrán vivir esta experiencia como brujo, cazador de demonios, monje o mago mientras aprenden a dominar nuevas habilidades y poderes mortales.", img: imgProvisoria2, quantity: 1, id: 11 },
        { title: "juego de prueba2", category_id: "art", currency_id: "ARS", unit_price: 1999.99, description: "La edición Ultimate Evil potencia el juego base con la expansión Reaper of Souls y el nuevo modo Aventura para obtener mejores recompensas. Los jugadores podrán vivir esta experiencia como brujo, cazador de demonios, monje o mago mientras aprenden a dominar nuevas habilidades y poderes mortales.", img: imgProvisoria2, quantity: 1, id: 12 }
    ]*/

    const [position, setPosition] = useState('bottom');
    const [align, setAlign] = useState('center');
    const [products, setProducts] = useState([]);
    const [totalPrice, settotalPrice] = useState(""); //(acc, product) => acc + product.unit_price * product.quantity, 0)
    const { user, isAuthenticated, isLoading, loginWithPopup } = useAuth0();
    const [idUserAUth0, setIdUserAuth0] = useState([]);
    const [idManuelUser, setIdManuelUser] = useState("");
    const [string, setString] = useState("hola");
    const [valor, setValor] = useState(0);

    const handleQuantity = (id, item) => {

        item.quantity = Number(item.quantity) + 1;
        var numero2 = totalPrice + Number(item.price);
        settotalPrice(numero2);

    };

    const handleQuantity2 = (id, item) => {

        if (item.quantity === 0) {
            return (console.log("0"));
        };

        item.quantity = Number(item.quantity) - 1;
        var numero2 = totalPrice - Number(item.price);
        settotalPrice(numero2);

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


    if (idManuelUser && string === "hola") {

        axios.get(`https://pfservidor-production.up.railway.app/cart/${idManuelUser}`)
            .then((res) => {
                console.log(res.data);
                setProducts([res.data]);
                setString("chau");
            })
            .catch((err) => console.log(err))

    } else if (idUserAUth0.length !== 0 && isAuthenticated && string === "hola") {

        axios.get(`https://pfservidor-production.up.railway.app/cart/${idUserAUth0[0].id}`)
            .then((res) => {
                console.log(res.data);
                setProducts([res.data]);
                setString("chau");
            })
            .catch((err) => console.log(err))

    };

    if (idUserAUth0.length !== 0) {
        console.log(idUserAUth0[0].id);
    };

    if (products.length !== 0) {

        console.log(products);
        var newArray = products[0].products;
        console.log(newArray);


        if (string === "chau") {
            var num = 0;
            for (let i = 0; i < newArray.length; i++) {
                num = num + Number(newArray[i].price);
            }
            settotalPrice(num)
            setString("terminado")
        };

        const onClickDelete = (id) => {

            console.log(id);

            axios.delete(`https://pfservidor-production.up.railway.app/cart/${id}`)
                .then((res) => {
                    console.log(res.data);
                })
                .catch((err) => console.log(err))

        };

        console.log(idUserAUth0);
        console.log(idManuelUser);
        console.log(totalPrice);

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
                                dataSource={products[0].products}
                                renderItem={(item, index) => (
                                    <List.Item>
                                        <List.Item.Meta
                                            avatar={<Avatar src={item.img[0]} />}
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

                                                        <Button className='button-borrar' onClick={(e) => onClickDelete(item.id)}>
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

        )

    }


}

export { FinishPayment };