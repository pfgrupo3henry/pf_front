import { useSelector, useDispatch} from "react-redux";
import { postFavorites, addItemToChart, deleteFavorites } from "../../Redux/Actions/Index";
import React from 'react'
import { Card } from 'antd';
import "../Card/card.css"
import {AiOutlineHeart} from "react-icons/ai";
import {AiFillHeart} from "react-icons/ai";
import {RiShoppingCartLine} from "react-icons/ri";
import {RiShoppingCartFill} from "react-icons/ri";
import { useState } from 'react';
const { Meta } = Card;

const imgProvisoria = require("../Assets/god-of-war-ragnarok-ps5-retro.jpg")

function CardElement ({title, imgProvisoria, description, price, descriptionComplete, id}) {

  const [favorite, setFavorite] = useState(true);
  const [cart, setCart] = useState(true);

  const allFavorites = useSelector(state => state.allFavorites);
  const shoppingChart = useSelector(state => state.shoppingChart);
  const dispatch = useDispatch();

  const [shoppingStringified, setShoppingStringified] = React.useState([]);



  const handleFavorites = (title, description, imgProvisoria, descriptionComplete, price, id) =>{
    console.log("valores", title, description, imgProvisoria)
    setFavorite(!favorite)
    let valores = {
      title: title,
      description: descriptionComplete,
      img: imgProvisoria,
      price: price,
      id:id
    }
    

    dispatch(postFavorites(valores));
  }

  const handleShoppingChart = (title, description, img, price, id) => {
    if (!title || !description || !img || !price || !id) {
      return null
    }

    dispatch(addItemToChart({
      title,
      description,
      img,
      price,
      id
    }))
  }

  const handleCart = () =>{
    setCart(!cart);
    handleShoppingChart(title, description, imgProvisoria, price, id)
  }



/*    const deleteFavoritesCardHome = (id)=>{
    dispatch(deleteFavorites(id))
  } */

  React.useEffect(() => {
    const returnStringified = shoppingChart.map(el => {
      return JSON.stringify(el);
    });
    setShoppingStringified(returnStringified);
  }, [shoppingChart])
 


  return (
    <div className="card-component">
    <Card
    
    hoverable
    style={{
      width: 180,
    }}
    cover={<img alt="example" src={imgProvisoria} />}
  >
    <Meta 
    title={title} 
    description={price} 
    />

    <div className='iconsCardHomeContainer'>


    {favorite ?
      <AiOutlineHeart
      className='favIconCardHome'
      onClick={() => {
        console.log('onClick fired');
        handleFavorites(title, description, imgProvisoria, descriptionComplete, price,  id)}}/> 
      : <AiFillHeart 
      onClick={handleFavorites}
      className='favIconCardHome'/>}


    {!shoppingStringified.includes(JSON.stringify({
      title,
      description,
      img: imgProvisoria,
      price,
      id
    })) ?
      <RiShoppingCartLine
      className='favIconCardHome'
      onClick={handleCart}/> 
      : <RiShoppingCartFill 
      onClick={handleCart}
      className='favIconCardHome'/>}

    </div>

  </Card>
  </div>
  )
};
export {CardElement};
