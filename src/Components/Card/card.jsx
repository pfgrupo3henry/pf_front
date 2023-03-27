import { useSelector, useDispatch } from "react-redux";
import { postFavorites, addItemToChart, deleteFavorites } from "../../Redux/Actions/Index";
import React from 'react'
import { Card } from 'antd';
import "../Card/card.css"
import { AiOutlineHeart } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";
import { RiShoppingCartLine } from "react-icons/ri";
import { RiShoppingCartFill } from "react-icons/ri";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
const { Meta } = Card;

const imgProvisoria = require("../Assets/god-of-war-ragnarok-ps5-retro.jpg")

function CardElement({ title, imgProvisoria, description, price, descriptionComplete, id }) {

  const [favorite, setFavorite] = useState(true);
  const [cart, setCart] = useState(true);

  const allFavorites = useSelector(state => state.allFavorites);
  const shoppingChart = useSelector(state => state.shoppingChart);
  const dispatch = useDispatch();

  const [shoppingStringified, setShoppingStringified] = React.useState([]);
  const [favsStringified, setFavsStringified] = React.useState([]);
  const navigate = useNavigate();


  const handleFavorites = (title, description, imgProvisoria, descriptionComplete, price, id) => {
    console.log("valores", title, description, imgProvisoria)
    setFavorite(!favorite)
    let valores = {
      title: title,
      description: descriptionComplete,
      img: imgProvisoria,
      price: price,
      id: id
    }
    dispatch(postFavorites(valores));
  }

  const handleShoppingChart = (title, description, imgProvisoria, price, id) => {

    if (!title || !description || !imgProvisoria || !price || !id) {
      return null
    }

    dispatch(addItemToChart({
      title,
      description,
      img: imgProvisoria,
      price,
      id
    }))
  }

  React.useEffect(() => {
    const returnStringified = shoppingChart.map(el => {
      return JSON.stringify(el);
    });
    setShoppingStringified(returnStringified);
  }, [shoppingChart])

  React.useEffect(() => {
    const returnStringified = allFavorites.map(el => {
      return JSON.stringify(el);
    });
    setFavsStringified(returnStringified);
  }, [allFavorites])


  var precio = `$ ${price}`;

  return (
    <div className="card-component">
      <Card
        onClick={(e) => {
          e.target.tagName !== 'svg' && e.target.tagName !== 'path' && navigate(`/game/${id}`)
        }}
        hoverable
        style={{
          width: 180,
        }}
        cover={<img alt="example" src={imgProvisoria} className="img-card-home" />}
      >
        <Meta
          title={title}
          description={precio}
        />
        <div className='iconsCardHomeContainer'>
          {!favsStringified.includes(JSON.stringify({
            title,
            description: descriptionComplete,
            img: imgProvisoria,
            price,
            id
          })) ?
            <AiOutlineHeart
              className='favIconCardHome'
              onClick={() => {
                console.log('onClick fired');
                handleFavorites(title, description, imgProvisoria, descriptionComplete, price, id)
              }} />
            : <AiFillHeart
              onClick={() => dispatch(deleteFavorites(id))}
              className='favIconCardHome' />}
          {!shoppingStringified.includes(JSON.stringify({
            title,
            description,
            img: imgProvisoria,
            price,
            id
          })) ?
            <RiShoppingCartLine
              className='favIconCardHome'
              onClick={() => handleShoppingChart(title, description, imgProvisoria, price, id)} />
            : <RiShoppingCartFill
              onClick={() => handleShoppingChart(title, description, imgProvisoria, price, id)}
              className='favIconCardHome' />}
        </div>
      </Card>
    </div>
  )
};
export { CardElement };
