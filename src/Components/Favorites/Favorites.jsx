import { React, useEffect, useState } from "react";
import { useSelector, useDispatch, } from "react-redux";
import { deleteFavorites } from "../../Redux/Actions/Index";
import { createElement } from "react";
import { Avatar, List, Space } from 'antd';
import "./Favorites.css"
import { AiFillHeart } from "react-icons/ai";
import { AiOutlineDelete } from "react-icons/ai";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import Cookies from "universal-cookie";


const IconText = ({ icon, text }) => (
  <Space>
    {createElement(icon)}
    {text}
  </Space>
);


function Favorites() {

  /*const allFavorites = useSelector(state => state.allFavorites);
  const dispatch = useDispatch();*/

  const { user, isAuthenticated } = useAuth0();
  const [favorite, setFavorite] = useState([]);
  const [string, setString] = useState("hola");
  const [idUserAUth0, setIdUserAuth0] = useState([]);
  const [idManuelUser, setIdManuelUser] = useState("");
  const dispatch = useDispatch();

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


  if (user) {

    if (idUserAUth0.length && string === "hola") {

      axios.get(`https://pfservidor-production.up.railway.app/favorites/${idUserAUth0[0].id}`)
        .then((res) => {
          console.log(res);
          setFavorite(res.data);
          setString("chau");
        })
        .catch((err) => console.log(err));

    }

  } else if (idManuelUser && string === "hola") {

    axios.get(`https://pfservidor-production.up.railway.app/favorites/${idUserAUth0[0].id}`)
      .then((res) => {
        console.log(res);
        setFavorite(res.data);
        setString("chau");
      })
      .catch((err) => console.log(err));

  };

  const handleFavoritesDelete = (id) => {

    if (user) {

      const product_id = id;
      const deleteFavorite = {
        userId: idUserAUth0[0].id,
        gameId: product_id
      }

      dispatch(deleteFavorites(deleteFavorite));

      axios.post("https://pfservidor-production.up.railway.app/favorites/restFavorite", deleteFavorite)
        .then((res) => {
          console.log(res.data);
          setFavorite(res.data)
        });

    } else if (!user) {

      const product_id = id;
      const deleteFavorite = {
        userId: idManuelUser,
        gameId: product_id
      }

      dispatch(deleteFavorites(deleteFavorite));

      axios.post("https://pfservidor-production.up.railway.app/favorites/restFavorite", deleteFavorite)
        .then((res) => {
          console.log(res.data);
          setFavorite(res.data)
        });

    }

  };

  console.log(idUserAUth0);
  console.log(idManuelUser);
  console.log(favorite);

  return (

    <div className="favorites-component">
      <List

        itemLayout="vertical"
        size="large"

        pagination={{
          className: "paginationFavorite",
          onChange: (page) => {
            console.log(page);
          },

          pageSize: 5,
        }}
        dataSource={favorite.products}

        renderItem={(item) => (

          <div className="listFavoritesCard">
            <List.Item

              key={item.title}
              actions={[
                <div className="iconsFavCard">
                  <AiFillHeart />
                  <AiOutlineDelete
                    className="deleteFav"
                    onClick={() => handleFavoritesDelete(item.id)}
                  />
                </div>
              ]}


              extra={
                <img
                  width={250}
                  alt="logo"
                  src={item.img[0]}
                />
              }
            >
              <List.Item.Meta
                title={item.title}
                description={item.description}
              />
              <div className="priceFavCard">
                {item.price}
              </div>
            </List.Item>
          </div>

        )}
      />
    </div>

  )
}

export { Favorites }

