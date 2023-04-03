import {React, useEffect} from "react";
import {createElement} from "react";
import imgProvisoria2 from "../Assets/a-way-out-ps5-retro.jpg";
import {  List, Space } from 'antd';
import "../Favorites/Favorites.css"
import {AiFillHeart} from "react-icons/ai";
import {AiOutlineDelete} from "react-icons/ai";
import axios from "axios"

 

const IconText = ({ icon, text }) => (
    <Space>
      {createElement(icon)}
      {text}
    </Space>
  ); 


function ProductCard (){

    const products= [
        {title: "juego de prueba",category_id: "art", currency_id: "ARS", unit_price: 1330.50 , description: "descripcion a modo de ejemplo", img: imgProvisoria2, quantity: "2", id: 11},
        {title: "juego de prueba2", category_id: "art", currency_id: "ARS", unit_price: 1999.99 , description: "descripcion a modo de ejemplo", img: imgProvisoria2, quantity: "1", id: 12}
    ]
    
    return( 
        <div>
             <div className="favorites-component">
                    <List
                        
                        itemLayout="vertical"
                        size="large"
                        
                        pagination={{
                        className:"paginationFavorite",
                        onChange: (page) => {
                            console.log(page);
                        },
                        
                        pageSize: 5,
                        }}
                        dataSource={products}

                        renderItem={(item) => (

                        <div className="listFavoritesCard">
                        <List.Item
                            
                            key={item.name}
                            actions={[
                            <div className="iconsFavCard">
                              <AiFillHeart/>
                              <AiOutlineDelete
                              className="deleteFav"
                              onClick={()=>{
                                axios.post("http://localhost:3001/payment", item)
                                    .then((res) => {
                                        window.location.href = res.data.response.body.init_point;
                                    })
                            }}
                                
                              
                               />
                            
                            </div>
                            ]}  

                            
                            extra={
                            <img
                                width={250}
                                alt="logo"
                                src= {item.img}
                            />
                            }
                        >
                            <List.Item.Meta
                            title={item.title}
                            description={item.description}
                            />
                            <div className="priceFavCard">
                            {item.unit_price}
                            </div>
                        </List.Item>
                        </div>
                        
                        )}
                        />
                    </div>
        </div>
    )
}

export {ProductCard}