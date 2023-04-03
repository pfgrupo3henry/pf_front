
import { useAuth0 } from "@auth0/auth0-react";
import { useSelector, useDispatch } from "react-redux";
import { postFavorites, addItemToChart, deleteFavorites, getUsers } from "../../Redux/Actions/Index";
import React, { useEffect, useState } from "react";
import { Card } from 'antd';
import "../Card/card.css"
import { AiOutlineHeart } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";
import { RiShoppingCartLine } from "react-icons/ri";
import { RiShoppingCartFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import axios from "axios";


const { Meta } = Card;

const imgProvisoria = require("../Assets/god-of-war-ragnarok-ps5-retro.jpg")



function CardElement({ title, imgProvisoria, description, price, descriptionComplete, id, quantity }) {

  const { user, isAuthenticated } = useAuth0();


  const [favorite, setFavorite] = useState(true);
  const [cart, setCart] = useState(true);

  const allFavorites = useSelector(state => state.allFavorites);
  const shoppingChart = useSelector(state => state.shoppingChart);
  const dispatch = useDispatch();

  const [shoppingStringified, setShoppingStringified] = useState([]);
  const [favsStringified, setFavsStringified] = useState([]);


  const [idUserAUth0, setIdUserAuth0] = useState([]);
  const [idManuelUser, setIdManuelUser] = useState("");


  /*useEffect(() => {
    dispatch(getUsers)
  });*/

  if (isAuthenticated) {

    if (!user) {

      if (idManuelUser === "") {

        const cookie = new Cookies();
        const idCoockie = cookie.get("id");
        console.log(idCoockie);

        setIdManuelUser(idCoockie);

      }

    } else if (user) {

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

  if (idUserAUth0.length !== 0) {
    console.log(idUserAUth0[0].id);
  };



  /*const cookie = new Cookies();
  const idCookie = cookie.get("id");
  console.log(idCookie);*/


  const filterUser = () => {
    if (isAuthenticated) {
      const usuario = user.email
      const user_id = allUsers.filter(e => e.email === usuario)
      console.log(user_id)
      return user_id.id
    } else {
      console.log("no hay usuario autenticado")
    }

  }

  const navigate = useNavigate();


  const handleFavorites = (title, description, imgProvisoria, descriptionComplete, price, id,) => {
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

  const handleShoppingChart = (id) => {

    if (user) {

      const user_id = filterUser();
      const product_id = id;
      const product_quantity = quantity
      const products = []
      const put = {
        userId: idUserAUth0[0].id,
        products: [
          {
            id: product_id,
            quantity: 1
          }
        ]
      }

      dispatch(addItemToChart(put))
      console.log("obj", put)

    } else if (!user) {

      const user_id = filterUser();
      const product_id = id;
      const product_quantity = quantity
      const products = []
      const put = {
        userId: idManuelUser,
        products: [
          {
            id: product_id,
            quantity: 1
          }
        ]
      }

      dispatch(addItemToChart(put))
      console.log("obj", put)

    }

  };

  //linea inutil

  /*   React.useEffect(() => {
      const returnStringified = shoppingChart.map(el => {
        return JSON.stringify(el);
      });
      setShoppingStringified(returnStringified);
    }, [shoppingChart]) */

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
              onClick={() => handleShoppingChart(id, quantity)} />
            : <RiShoppingCartFill
              onClick={() => handleShoppingChart(title, description, imgProvisoria, price, id, quantity)}
              className='favIconCardHome' />}
        </div>
      </Card>
    </div>
  )
};
export { CardElement };
