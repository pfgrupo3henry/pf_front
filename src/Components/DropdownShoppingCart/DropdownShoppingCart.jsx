import React from "react";
//import DropdownShoppingCartCard from "./DropdownShoppingCartCard";
import { Button, Typography, Image, Space, Tooltip, Input } from "antd";
import { PlusOutlined, MinusOutlined, DeleteOutlined } from "@ant-design/icons";
import "./DropdownShoppingCart.css";
import axios from "axios"
import Cookies from "universal-cookie";
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import "./DropdownShoppingCartCard.css";
import { useSelector, useDispatch } from "react-redux";
import { deleteChart, getChart, addItemToChart } from "../../Redux/Actions/Index";



function DropdownShoppingCart() {
  const [color, setColor] = React.useState("rgba(9, 22, 29, 1)");
  var shoppingChart = useSelector(state => state.shoppingChart);
  const [string, setString] = useState("vacio");
  const dispatch = useDispatch();
  const { Text } = Typography;
  const cookie = new Cookies();
  const idCoockie = cookie.get("id");
  console.log(idCoockie);

  useEffect(() => {

    dispatch(getChart(idCoockie));

  }, [dispatch]);


  const onClickDelete = (id) => {

    let payload = {
      userId: idCoockie,
      gameId: id
    }

    dispatch(deleteChart(payload));

  };

  const handleShoppingChart = (id) => {

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

  };

  const handleShoppingChart2 = (id, quantity) => {

    if (quantity === 1) {
      return (console.log("no"))
    } else {

      const product_id = id;
      const put = {
        userId: idCoockie,
        products:
        {
          id: product_id,
          quantity: - 1
        }

      }

      dispatch(addItemToChart(put));
      setString("vacio");

    }

  };

  if (string === "vacio") {
    dispatch(getChart(idCoockie));
    setTimeout(function () {
      setString("completo");
    }, 1000);
  };

  console.log(shoppingChart);

  if (shoppingChart.products) {

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
            {shoppingChart
              ? shoppingChart.products.map((el) => (
                <div className="dropdown-shopping-cart-card-component">
                  <div style={{ backgroundImage: `url('${""}')` }} className="card-header">
                    <Image width={100} src={el.img ? el.img[0] : ""} />
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
                        <Button
                          onClick={() => handleShoppingChart2(el.id, el.quantity)}
                          icon={<MinusOutlined />}
                        />
                      </Tooltip>

                      <p>{el.quantity}</p>

                      <Tooltip title="Add">
                        <Button
                          onClick={() => handleShoppingChart(el.id)}
                          icon={<PlusOutlined />}
                        />
                      </Tooltip>

                      <Tooltip title="delete">
                        <Button
                          onClick={() => onClickDelete(el.id)}
                          icon={<DeleteOutlined />}
                        >
                        </Button>
                      </Tooltip>

                    </Space>
                  </div>
                </div>
              ))
              : null}
          </div>
        </div>
        <div className="continue">
          <Button
            className="botton"
            style={{ backgroundColor: "rgba(9, 22, 29, 0.712)" }}
            onMouseLeave={() => setColor("rgba(27, 37, 43, 0.63)")}
            onMouseEnter={() => setColor("rgba(27, 37, 43, 0.63)")}
            type="primary">
            <Link to="/status-payment" className="rutasNav">Continuar compra</Link>
          </Button>
        </div>
      </div>
    );

  };

};

export default DropdownShoppingCart;