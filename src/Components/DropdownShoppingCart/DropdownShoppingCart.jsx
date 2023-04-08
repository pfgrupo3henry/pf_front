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
import { deleteChart, getChart } from "../../Redux/Actions/Index";



function DropdownShoppingCart() {
  const [color, setColor] = React.useState("rgba(9, 22, 29, 1)");
  var shoppingChart = useSelector(state => state.shoppingChart);
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
                        <Button icon={<MinusOutlined />} />
                      </Tooltip>
                      <Tooltip title="Add">
                        <Button icon={<PlusOutlined />} />
                      </Tooltip>
                      <Tooltip title="delete">
                        <Button
                          type="submit"
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

  };

};

export default DropdownShoppingCart;
