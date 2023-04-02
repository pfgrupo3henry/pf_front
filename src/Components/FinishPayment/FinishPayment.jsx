
import { Button } from 'antd';
import { SiMercadopago } from "react-icons/si";
import { Avatar, InputNumber, List, Radio, Space, Card} from 'antd';
import imgProvisoria2 from "../Assets/a-way-out-ps5-retro.jpg";
import { useState } from 'react';
import {AiOutlineDelete} from "react-icons/ai";
import axios from "axios"
import "./FinishPayment.css"




function FinishPayment (){

    const allProducts= [
        {title: "juego de prueba",category_id: "art",   currency_id: "ARS", unit_price: 1330.50 , description: "La edición Ultimate Evil potencia el juego base con la expansión Reaper of Souls y el nuevo modo Aventura para obtener mejores recompensas. Los jugadores podrán vivir esta experiencia como brujo, cazador de demonios, monje o mago mientras aprenden a dominar nuevas habilidades y poderes mortales.", img: imgProvisoria2, quantity: 1, id: 11},
        {title: "juego de prueba2", category_id: "art",   currency_id: "ARS", unit_price: 1999.99 , description: "La edición Ultimate Evil potencia el juego base con la expansión Reaper of Souls y el nuevo modo Aventura para obtener mejores recompensas. Los jugadores podrán vivir esta experiencia como brujo, cazador de demonios, monje o mago mientras aprenden a dominar nuevas habilidades y poderes mortales.", img: imgProvisoria2, quantity: 1, id: 12}
    ]
    const [position, setPosition] = useState('bottom');
    const [align, setAlign] = useState('center');
    const [products, setProducts] = useState(allProducts);
    const [totalPrice, settotalPrice] = useState(products.reduce((acc, product) => acc + product.unit_price * product.quantity, 0))

    const handleQuantity = (value, id) => {
        const newProducts = products.map(product => {
          if (product.id === id) {
            return {
              ...product,
              quantity: value
            };
          }
          return product;
        });
        setProducts(newProducts);
        settotalPrice()
      };
      

   
    return(
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
                dataSource={products}
                renderItem={(item, index) => (
                <List.Item>
                    <List.Item.Meta
                    avatar={<Avatar src={item.img} />} 
                    title={item.title}
                    description={
                        <div className='icons-container'>
                        {item.description}
                        <br></br>

                        <div className='quantity-delete'>
                        <InputNumber 
                            value={item.quantity}
                            onChange={(value) => handleQuantity(value, item.id)}
                            style={{height:"1.69rem", width:"4rem"}}
                        />
                        <AiOutlineDelete className='deleteIcon'/>
                        <div className='unit-price'>
                            ${item.unit_price * item.quantity}
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
                            onClick={()=>{
                                axios.post("http://localhost:3001/payment", {totalPrice})
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

export  {FinishPayment};