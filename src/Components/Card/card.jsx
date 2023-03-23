import { useSelector, useDispatch} from "react-redux";
import { postFavorites } from "../../Redux/Actions/Index";
import { Card } from 'antd';
import "../Card/card.css"
import {AiOutlineHeart} from "react-icons/ai";
import {AiFillHeart} from "react-icons/ai";
import {RiShoppingCartLine} from "react-icons/ri";
import {RiShoppingCartFill} from "react-icons/ri";
import { useState } from 'react';
const { Meta } = Card;



const imgProvisoria = require("../Assets/god-of-war-ragnarok-ps5-retro.jpg")





function CardElement ({title, imgProvisoria, description, price, descriptionComplete}) {

  const [favorite, setFavorite] = useState(true);
  const [cart, setCart] = useState(true);

  const allFavorites = useSelector(state => state.allFavorites);
  const dispatch = useDispatch();



  const handleFavorites = (title, description, imgProvisoria, descriptionComplete, price) =>{
    console.log("valores", title, description, imgProvisoria)
    setFavorite(!favorite)
    let valores = {
      title: title,
      description: descriptionComplete,
      img: imgProvisoria,
      price: price
    }
    
    dispatch(postFavorites(valores));
  }


  const handleCart = () =>{
    setCart(!cart)
  }

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
        handleFavorites(title, description, imgProvisoria, descriptionComplete, price)}}/> 
      : <AiFillHeart 
      onClick={handleFavorites}
      className='favIconCardHome'/>}


    {cart ?
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

