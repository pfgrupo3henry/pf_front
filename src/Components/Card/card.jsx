import { useSelector, useDispatch } from "react-redux";
import { postFavorites, addItemToChart, deleteFavorites, deleteChart, getFavorites, getChart } from "../../Redux/Actions/Index";
import React, { useEffect, useState } from "react";
import { Card, Tag, message } from 'antd';
import "../Card/card.css"
import { AiOutlineHeart } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";
import { RiShoppingCartLine } from "react-icons/ri";
import { RiShoppingCartFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";


const { Meta } = Card;

const imgProvisoria = require("../Assets/god-of-war-ragnarok-ps5-retro.jpg")



function CardElement({ title, imgProvisoria, description, price, descriptionComplete, id, quantity }) {

  const allFavorites = useSelector(state => state.allFavorites);
  const shoppingChart = useSelector(state => state.shoppingChart);
  const dispatch = useDispatch();
  const allUsers = useSelector(state => state.allUsers);

  const [shoppingStringified, setShoppingStringified] = useState([]);
  const [favsStringified, setFavsStringified] = useState([]);

  const [string, setString] = useState("vacio");

  const cookie = new Cookies();
  const idCoockie = cookie.get("id");
  console.log(idCoockie);

  const Swal = require('sweetalert2');

  const handleLoginClick = () => {
    Swal.fire({
      title: "Error!",
      text: 'Debes iniciar sesion',
      icon: "error",
      confirmButtonText: 'Ok'
    }).then((res) => {
      window.location.href = "/login";
    });

  };

  useEffect(() => {

    dispatch(getFavorites(idCoockie));
    dispatch(getChart(idCoockie));

  }, [dispatch]);


  const navigate = useNavigate();


  const handleFavorites = (id) => {

    if (!idCoockie) {
      Swal.fire({
        title: "Error!",
        text: 'Debes iniciar sesion',
        icon: "error",
        confirmButtonText: 'Ok'
      }).then((res) => {
        window.location.href = "/login";
      });
    } else {

      const product_id = id;
      const putFavorite = {
        userId: idCoockie,
        products:
        {
          id: product_id,
          quantity: 1
        }

      }

      dispatch(postFavorites(putFavorite));
      message.success("¡Juego agregado a Favoritos!", 5);

    }

  };

  const handleFavoritesDelete = (id) => {

    if (!idCoockie) {
      Swal.fire({
        title: "Error!",
        text: 'Debes iniciar sesion',
        icon: "error",
        confirmButtonText: 'Ok'
      }).then((res) => {
        window.location.href = "/login";
      });
    } else {
      const product_id = id;
      const deleteFavorite = {
        userId: idCoockie,
        gameId: product_id
      }

      dispatch(deleteFavorites(deleteFavorite));
      message.success("¡Juego borrado de Favoritos!", 5);
    }

  };

  const handleShoppingChart = (id, quantity) => {

    if (!idCoockie) {
      Swal.fire({
        title: "Error!",
        text: 'Debes iniciar sesion',
        icon: "error",
        confirmButtonText: 'Ok'
      }).then((res) => {
        window.location.href = "/login";
      });
    } else if (quantity > 0) {

      const product_id = id;
      const put = {
        userId: idCoockie,
        products:
        {
          id: product_id,
          quantity: 1
        }

      }

      dispatch(addItemToChart(put));
      setString("vacio");
      message.success("¡Juego agregado a Carrito!", 5);

    } else if (quantity < 1) {
      Swal.fire({
        title: "Error!",
        text: 'Juego Agotado',
        icon: "error",
        confirmButtonText: 'Ok'
      })
    }

  };

  const onClickDelete = (id) => {

    if (!idCoockie) {
      Swal.fire({
        title: "Error!",
        text: 'Debes iniciar sesion',
        icon: "error",
        confirmButtonText: 'Ok'
      }).then((res) => {
        window.location.href = "/login";
      });
    } else {

      let payload = {
        userId: idCoockie,
        gameId: id
      }

      dispatch(deleteChart(payload));
      setString("vacio");
      message.success("¡Juego borrado del Carrito!", 5);

    }

  };

  if (string === "vacio") {
    dispatch(getChart(idCoockie));
    setTimeout(function () {
      setString("completo");
    }, 500);
  };

  var precio = `$ ${price}`;

  if (shoppingChart || allFavorites) {

    console.log(shoppingChart);

    return (
      <div className="card-component">

      <div style={{ pointerEvents: quantity === 0 ? 'none' : null }}>

        <Card
          onClick={(e) => {
            e.target.tagName !== 'svg' && e.target.tagName !== 'path' && navigate(`/game/${id}`)
          }}
          hoverable
          className={quantity === 0 ? "card_disable" : null}
          style={{
            width: 180,
          }}
          cover={<img alt="example" src={imgProvisoria} className="img-card-home" />}
        >
          <Meta
            title={title}
            description={quantity === 0 ? <div className="sin_stock"><p>{precio}</p><Tag>SIN STOCK</Tag> </div>  : precio }
          />
          <br></br>

          <div className='iconsCardHomeContainer'>

            {(allFavorites.products && allFavorites.products.some(game => game.id === id)) ? (
              <AiFillHeart
                onClick={() => handleFavoritesDelete(id)}
                className='favIconCardHome' />
            ) : (
              <AiOutlineHeart
                onClick={() => handleFavorites(id)}
                className='favIconCardHome' />
            )}

            {(shoppingChart.products && shoppingChart.products.some(game => game.id === id && game.stock > 0)) ? (
              <RiShoppingCartFill
                onClick={() => onClickDelete(id)}
                className='favIconCardHome' />
            ) : (
              <RiShoppingCartLine
                onClick={() => handleShoppingChart(id, quantity)}
                className='favIconCardHome' />
            )}

          </div>

        </Card>

        </div>
        

       

      </div>
    )
  }

};

export { CardElement };