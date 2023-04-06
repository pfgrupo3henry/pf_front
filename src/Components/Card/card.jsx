import Swal from 'sweetalert2';
import { useAuth0 } from "@auth0/auth0-react";
import { useSelector, useDispatch } from "react-redux";
import { postFavorites, addItemToChart, deleteFavorites, getUsers, deleteChart } from "../../Redux/Actions/Index";
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
  const allUsers = useSelector(state => state.allUsers);

  const [shoppingStringified, setShoppingStringified] = useState([]);
  const [favsStringified, setFavsStringified] = useState([]);

  const [idUserAUth0, setIdUserAuth0] = useState([]);
  const [idManuelUser, setIdManuelUser] = useState("");


  /*useEffect(() => {
    dispatch(getUsers)
  });*/

  if (isAuthenticated) {

    if (user) {

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

  if (!user) {

    if (idManuelUser === "") {

      const cookie = new Cookies();
      const idCoockie = cookie.get("id");
      console.log(idCoockie);

      setIdManuelUser(idCoockie);

    }

  };

  /*const cookie = new Cookies();
  const idCookie = cookie.get("id");
  console.log(idCookie);*/

  const navigate = useNavigate();


  const handleFavorites = (id) => {

    if (user) {

      const product_id = id;
      const putFavorite = {
        userId: idUserAUth0[0].id,
        products:
        {
          id: product_id,
          quantity: 1
        }

      }

      setFavorite(false);
      dispatch(postFavorites(putFavorite));
      console.log("obj", putFavorite);

    } else if (!user) {

      const product_id = id;
      const putFavorite = {
        userId: idManuelUser,
        products:
        {
          id: product_id,
          quantity: 1
        }

      }

      setFavorite(false);
      dispatch(postFavorites(putFavorite));
      console.log("obj", putFavorite)

    }

  };

  const handleFavoritesDelete = (id) => {

    if (user) {

      const product_id = id;
      const deleteFavorite = {
        userId: idUserAUth0[0].id,
        gameId: product_id
      }

      setFavorite(true);
      dispatch(deleteFavorites(deleteFavorite));
      console.log("obj", deleteFavorite);

    } else if (!user) {

      const product_id = id;
      const deleteFavorite = {
        userId: idManuelUser,
        gameId: product_id
      }

      setFavorite(true);
      dispatch(deleteFavorites(deleteFavorite));
      console.log("obj", deleteFavorite)

    }

  };

  const handleShoppingChart = (id) => {

    if (user) {

      const product_id = id;
      const put = {
        userId: idUserAUth0[0].id,
        products:
        {
          id: product_id,
          quantity: 1
        }

      }

      setCart(false);
      dispatch(addItemToChart(put));
      console.log("obj", put);

    } else if (!user) {

      const product_id = id;
      const put = {
        userId: idManuelUser,
        products:
        {
          id: product_id,
          quantity: 1
        }

      }

      setCart(false);
      dispatch(addItemToChart(put))
      console.log("obj", put)

    }

  };

  const onClickDelete = (id) => {

    if (user) {

      let payload = {
        userId: idUserAUth0[0].id,
        gameId: id
      }

      dispatch(deleteChart(payload));
      setCart(true);

    } else {

      let payload = {
        userId: idManuelUser,
        gameId: id
      }

      dispatch(deleteChart(payload));
      setCart(true);

    }

  };

  //linea inutil

  /*   React.useEffect(() => {
      const returnStringified = shoppingChart.map(el => {
        return JSON.stringify(el);
      });
      setShoppingStringified(returnStringified);
    }, [shoppingChart]) */


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
        <br></br>
        <div className='iconsCardHomeContainer'>
          {favorite === true ?
            <AiOutlineHeart
              className='favIconCardHome'
              onClick={() => {
                handleFavorites(id)
              }} />
            : <AiFillHeart
              onClick={() => handleFavoritesDelete(id)}
              className='favIconCardHome' />}
          {cart ?
            <RiShoppingCartLine
              className='favIconCardHome'
              onClick={() => handleShoppingChart(id, quantity)} />
            : <RiShoppingCartFill
              onClick={() => onClickDelete(id)}
              className='favIconCardHome' />}
        </div>
      </Card>
    </div>
  )
};
export { CardElement };


/* */