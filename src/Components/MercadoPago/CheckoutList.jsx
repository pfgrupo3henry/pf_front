/* import { Avatar, InputNumber, List, Radio, Space } from 'antd';
import imgProvisoria2 from "../Assets/a-way-out-ps5-retro.jpg";
import { useState } from 'react';
import {AiOutlineDelete} from "react-icons/ai";

import "./CheckOutList.css"

const products= [
    {title: "juego de prueba",category_id: "art", currency_id: "ARS", unit_price: 1330.50 , description: "La edición Ultimate Evil potencia el juego base con la expansión Reaper of Souls y el nuevo modo Aventura para obtener mejores recompensas. Los jugadores podrán vivir esta experiencia como brujo, cazador de demonios, monje o mago mientras aprenden a dominar nuevas habilidades y poderes mortales.", img: imgProvisoria2, quantity: "2", id: 11},
    {title: "juego de prueba2", category_id: "art", currency_id: "ARS", unit_price: 1999.99 , description: "La edición Ultimate Evil potencia el juego base con la expansión Reaper of Souls y el nuevo modo Aventura para obtener mejores recompensas. Los jugadores podrán vivir esta experiencia como brujo, cazador de demonios, monje o mago mientras aprenden a dominar nuevas habilidades y poderes mortales.", img: imgProvisoria2, quantity: "1", id: 12}
]

const positionOptions = ['top', 'bottom', 'both'];
const alignOptions = ['start', 'center', 'end'];

function CheckOutList () {
  const [position, setPosition] = useState('bottom');
  const [align, setAlign] = useState('center');
  return (
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
                    <InputNumber style={{height:"1.69rem", width:"4rem"}}/>
                    <AiOutlineDelete
                    className='deleteIcon'/>
                    
                    <div className='unit-price'>
                        ${item.unit_price}
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
  );
};
export {CheckOutList}

        {/* <Space>
          <span>Pagination Position:</span>
          <Radio.Group
            optionType="button"
            value={position}
            onChange={(e) => {
              setPosition(e.target.value);
            }}
          >
            {positionOptions.map((item) => (
              <Radio.Button key={item} value={item}>
                {item}
              </Radio.Button>
            ))}
          </Radio.Group>
        </Space>
        <Space>
          <span>Pagination Align:</span>
          <Radio.Group
            optionType="button"
            value={align}
            onChange={(e) => {
              setAlign(e.target.value);
            }}
          >
            {alignOptions.map((item) => (
              <Radio.Button key={item} value={item}>
                {item}
              </Radio.Button>
            ))}
          </Radio.Group>
        </Space> */