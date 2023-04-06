import React from "react";
//import DropdownShoppingCartCard from "./DropdownShoppingCartCard";
import { Button, Typography, Image, Space, Tooltip, Input } from "antd";
import { PlusOutlined, MinusOutlined, DeleteOutlined } from "@ant-design/icons";
import "./DropdownShoppingCart.css";
import { useSelector } from "react-redux";
import axios from "axios"
import Cookies from "universal-cookie";
import { useAuth0 } from "@auth0/auth0-react";
import { useState } from 'react';
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';
import "./DropdownShoppingCartCard.css";



function DropdownShoppingCart() {
  const [color, setColor] = React.useState("rgba(9, 22, 29, 1)");
  const [products, setProducts] = useState([]);
  const { user, isAuthenticated, isLoading, loginWithPopup } = useAuth0();
  const [idUserAUth0, setIdUserAuth0] = useState([]);
  const [idManuelUser, setIdManuelUser] = useState("");
  const [string, setString] = useState("hola");

  const { Text } = Typography;

  if (isAuthenticated) {

    if (user && idUserAUth0.length === 0) {

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

  if (!user) {

    if (idManuelUser === "") {

      const cookie = new Cookies();
      const idCoockie = cookie.get("id");
      console.log(idCoockie);

      setIdManuelUser(idCoockie);

    }

  };

  const onClickDelete = (e) => {



    if (user) {

      axios.post(`https://pfservidor-production.up.railway.app/cart/delete`, { userId: idUserAUth0[0].id, gameId: e.target.value })
        .then((res) => {
          console.log(res.data);
          setProducts([res.data]);
        })
        .catch((err) => {
          console.log(err);
        })

    } else {

      axios.post(`https://pfservidor-production.up.railway.app/cart/delete`, { userId: idManuelUser, gameId: e.target.value })
        .then((res) => {
          console.log(res.data);
          setProducts([res.data]);
        })
        .catch((err) => {
          console.log(err);
        })

    }

  };


  if (idManuelUser && string === "hola") {

    axios.get(`https://pfservidor-production.up.railway.app/cart/${idManuelUser}`)
      .then((res) => {
        console.log(res.data);
        setProducts([res.data]);
        setString("chau");
      })
      .catch((err) => console.log(err))

  } else if (idUserAUth0.length !== 0 && isAuthenticated && string === "hola") {

    axios.get(`https://pfservidor-production.up.railway.app/cart/${idUserAUth0[0].id}`)
      .then((res) => {
        console.log(res.data);
        setProducts([res.data]);
        setString("chau");
      })
      .catch((err) => console.log(err))

  };

  console.log(products);

  return (
    <div
      className="dropdown-shopping-cart-component"
      style={{
        width: "fit-content",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}>
      <div className="main">
        <div className="scroll">
          {products.length
            ? products[0].products.map((el) => (
              <div className="dropdown-shopping-cart-card-component">
                <div style={{ backgroundImage: `url('${""}')` }} className="card-header">
                  <Image width={100} src={el.img} />
                  <Text type="secondary" style={{ color: "#90A4AE" }}>
                    {el.name || "Game Title"}
                  </Text>
                </div>
                <div>
                  <Text type="secondary">{`$ ${el.price}` || "$USD 30"}</Text>
                </div>
                <div className="card-footer">
                  <Space>
                    <Tooltip title="Minus">
                      <Button icon={<MinusOutlined />} />
                    </Tooltip>
                    <Tooltip title="Add">
                      <Button icon={<PlusOutlined />} />
                    </Tooltip>
                    <Tooltip title="delete">
                      <Input
                        type="submit"
                        onClick={(e) => onClickDelete(e)}
                        value={el.id}
                      >
                      </Input>
                    </Tooltip>
                  </Space>
                </div>
              </div>
            ))
            : null}
        </div>
      </div>
      <div className="continue">
        <Space wrap>
          <Button
            style={{ backgroundColor: color }}
            onMouseLeave={() => setColor("rgba(9, 22, 29, 1)")}
            onMouseEnter={() => setColor("#555")}
            type="primary">
            <Link to="/status-payment" className="rutasNav">Finalizar Compra</Link>
          </Button>
        </Space>
      </div>
    </div>
  );
}

export default DropdownShoppingCart;
