import { React, useEffect } from "react";
import { useSelector, useDispatch, } from "react-redux";
import { deleteFavorites, getFavorites } from "../../Redux/Actions/Index";
import { createElement } from "react";
import { Avatar, List, Space } from 'antd';
import "./Favorites.css"
import { AiFillHeart } from "react-icons/ai";
import { AiOutlineDelete } from "react-icons/ai";
import axios from "axios";
import Cookies from "universal-cookie";


const IconText = ({ icon, text }) => (
  <Space>
    {createElement(icon)}
    {text}
  </Space>
);


function Favorites() {

  const allFavorites = useSelector(state => state.allFavorites);
  const cookie = new Cookies();
  const idCoockie = cookie.get("id");
  console.log(idCoockie);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFavorites(idCoockie));
  }, [dispatch]);

  const handleFavoritesDelete = (id) => {

    const product_id = id;
    const deleteFavorite = {
      userId: idCoockie,
      gameId: product_id
    }

    dispatch(deleteFavorites(deleteFavorite));

  };

  if (allFavorites.products) {

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
          dataSource={allFavorites.products}

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
                    src={item.img ? item.img[0] : ""}
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

    );

  };

};

export { Favorites }

