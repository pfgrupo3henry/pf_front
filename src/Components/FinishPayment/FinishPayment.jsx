import { Button } from "antd";
import { Avatar, InputNumber, List, Space, Card } from "antd";
import { useState, useEffect } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { LoadingOutlined, } from '@ant-design/icons';
import axios from "axios";
import "./FinishPayment.css";
import Cookies from "universal-cookie";
import { useSelector, useDispatch } from "react-redux";
import { deleteChart, getChart, addItemToChart } from "../../Redux/Actions/Index";

function FinishPayment() {
  const [position, setPosition] = useState("bottom");
  const [align, setAlign] = useState("center");
  const [totalPrice, settotalPrice] = useState("");
  const [string, setString] = useState("cuenta");
  const [string2, setString2] = useState("vacio");
  const [string3, setString3] = useState("vacio");
  const Swal = require("sweetalert2");

  var shoppingChart = useSelector((state) => state.shoppingChart);
  const dispatch = useDispatch();

  const cookie = new Cookies();
  const idCoockie = cookie.get("id");
  console.log(idCoockie);

  if (!idCoockie) {
    Swal.fire({
      title: "Error!",
      text: "Debes inicar sesion",
      icon: "error",
      confirmButtonText: "Ok",
    }).then((res) => {
      window.location.href = "/login";
    });
  }

  useEffect(() => {
    dispatch(getChart(idCoockie));
  }, [dispatch]);

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
    setString2("vacio");
    setString("cuenta");
    setString3("cargando");

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
      setString2("vacio");
      setString("cuenta");
      setString3("cargando");

    }

  };

  const onClickDelete = (id) => {

    let payload = {
      userId: idCoockie,
      gameId: id,
    };

    dispatch(deleteChart(payload));
    setString2("vacio");
    setString("cuenta");

  };

  if (string2 === "vacio") {
    dispatch(getChart(idCoockie));
    setTimeout(function () {
      setString2("completo");
    }, 1000);
  };

  if (shoppingChart) {

    if (shoppingChart.products) {

      var newArray = shoppingChart.products;
      console.log(newArray);

      if (string === "cuenta") {
        var num = 0;
        for (let i = 0; i < newArray.length; i++) {
          num = num + Number(newArray[i].price) * Number(newArray[i].quantity);
        }

        if (string3 === "cargando") {

          setTimeout(function () {
            settotalPrice(num);
            setString("terminado");
            setString3("vacio")
          }, 1000);

        } else {
          setTimeout(function () {
            settotalPrice(num);
            setString("terminado");
          }, 1000);

        }

      }

      console.log(shoppingChart);
      console.log("coockie", idCoockie);
      return (
        <div className="finishPayment-component">
          <div className="checkout">
            <div className="checkOutList-component">
              <div className="cartItems">
                <Space
                  direction="horizontal"
                  style={{
                    marginBottom: "20px",
                  }}
                  size="middle"></Space>
                <List
                  pagination={{
                    position,
                    align,
                  }}
                  dataSource={shoppingChart.products}
                  renderItem={(item, index) => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar src={item.img ? item.img[0] : ""} />}
                        title={item.name}
                        description={
                          <div className="icons-container">
                            {item.description}
                            <br></br>

                            {string3 === "vacio" ?

                              <div className="quantity-delete">
                                <Button
                                  className="button+"
                                  onClick={() => handleShoppingChart2(item.id, item.quantity)}>
                                  -
                                </Button>
                                <p className="p-cantidad">{item.quantity}</p>
                                <Button
                                  className="button-"
                                  onClick={() => handleShoppingChart(item.id)}>
                                  +
                                </Button>

                                <Button
                                  className="button-borrar"
                                  onClick={(e) =>
                                    onClickDelete(item.id)
                                  }>
                                  <AiOutlineDelete className="deleteIcon" />
                                </Button>
                                <div className="unit-price">
                                  ${item.price * item.quantity}
                                </div>
                              </div>

                              :

                              <div className="quantity-delete">
                                <Button className="button+">
                                  <LoadingOutlined />
                                </Button>
                                <p className="p-cantidad"><LoadingOutlined /></p>
                                <Button className="button-">
                                  <LoadingOutlined />
                                </Button>
                                <Button className="button-borrar">
                                  <LoadingOutlined className="deleteIcon" />
                                </Button>
                                <div className="unit-price">
                                  <LoadingOutlined />
                                </div>
                              </div>

                            }

                          </div>
                        }
                      />
                    </List.Item>
                  )}
                />
              </div>
            </div>
          </div>
          <div className="card-payment-imgMercadoPago">
            <div className="card-payment">
              <Card
                title={string3 === "vacio" ?
                  <div className="container-aux">
                    <div>Total:</div>
                    <div>${totalPrice}</div>
                  </div>
                  :
                  <div className="container-aux">
                    <div>Total:</div>
                    <div>$<LoadingOutlined /></div>
                  </div>
                }
                bordered={true}
                style={{
                  width: 400,
                }}>
                <p className="infoAux">
                  Una vez realizado el pago, recibiras por mail el detalle del
                  mismo.
                </p>
                <br></br>
                <br></br>
                <Button
                  onClick={() => {
                    axios
                      .post(
                        "https://pfservidor-production.up.railway.app/payment/mercadopago",
                        { totalPrice: totalPrice, userId: idCoockie }
                      )
                      .then((res) => {
                        window.location.href = res.data.response.body.init_point;
                      });
                  }}
                  className="buttonsCardDetail"
                  style={{ backgroundColor: "rgba(9, 22, 29, 0.712)" }}
                  type="primary">
                  Finalizar compra
                </Button>
              </Card>
            </div>
          </div>
        </div>
      );
    } else {
      return <div className="loader-payment">Loading...</div>;
    }
  }

}

export { FinishPayment };
