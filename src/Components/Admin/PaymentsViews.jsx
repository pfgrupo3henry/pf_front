import {
  Avatar,
  Col,
  Divider,
  Drawer,
  List,
  Row,
  Button,
  Spin,
  Space,
} from "antd";
import { useState } from "react";
import { getOrders, getOrdersId } from "../../Redux/Actions/Index";
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect } from "react";
import "./PaymentsViews.css";

const DescriptionItem = ({ title, content }) => (
  <div className="site-description-item-profile-wrapper">
    <p className="site-description-item-profile-p-label">{title}:</p>
    {content}
  </div>
);

function PaymentsViews() {
  const [selectedUserId, setSelectedUserId] = useState(null);
  const allOrders = useSelector((state) => state.allOrders);
  const ordersId = useSelector((state) => state.ordersID);
  const [isLoading, setisLoading] = useState(true);
  const [loading, setLoading] = useState(true);
  const [ver, setVer] = useState(false);
  const [verPersonal, setVerPersonal] = useState(false);
  const [verProducts, setVerProducts] = useState(false);
  const [drawerData, setDrawerData] = useState({
    userOrder: [],
    userId: "",
    userInfo: {
      createdAt: "",
      email: "",
      firstname: "",
      id: "",
      img: null,
      lastname: "",
      mobile: "",
      nationality: "",
      password: "",
      refreshToken: "",
      role: "",
      status: "",
      updatedAt: "",
    },
  });

  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      setisLoading(false);
    }, 1000);
    dispatch(getOrders());
    console.log("estado lobal", allOrders.All_Orders);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      // Simulación de una función asincrónica con un retardo de 1 segundo
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setisLoading(false);
    };
    console.log("data para mapeo", drawerData);
    fetchData();
  }, [ordersId, drawerData]);

  if (isLoading) {
    return (
      <div style={{ textAlign: "center" }}>
      <Space
        direction="vertical"
        style={{
          width: "100%",
        }}
      >
        <Spin tip="Loading" size="large">
          <div className="content" />
        </Spin>
      </Space>
    </div>
    );
  }

  const onClose = () => {
    setOpen(false);
  };

  /*   const showDrawer = (userId) => {
    setTimeout(() => {setisLoading(false);
    }, 3000);
    console.log("ID_USER", userId)
    console.log("ORDENES DEL USUARIO" ,ordersId)
    setDrawerData(ordersId);
    dispatch(getOrdersId(userId))
    dispatch(getOrdersId(userId)).then(() => {
      setDrawerData(ordersId);
      setOpen(true);
    });
  }  */

  const showDrawer = async (userId) => {
    // Primera función: setea el estado local isLoading
    setisLoading(false);

    // Espera 2 segundos (2000 milisegundos)
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Obtén los datos de las órdenes del usuario
    const ordersData = await dispatch(getOrdersId(userId));
    setDrawerData(ordersData.payload); // Setea los datos en el estado local drawerData
    setLoading(false);

    // Segunda función: abre el componente
    setOpen(true);
  };

  function showOrders() {
    setVer(!ver);
  }
  function showPersonal() {
    setVerPersonal(!verPersonal);
  }

  return (
    <div className="body-pagos-admin">
      <List
        style={{
          marginTop: "5rem",
          marginLeft: "10rem",

          width: 700,
        }}
        dataSource={allOrders.All_Orders}
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 5,
        }}
        bordered
        renderItem={(item) => (
          <List.Item
            key={item.userId}
            actions={[
              <a
                onClick={() => showDrawer(item.userId)}
                key={`a-${item.userId}`}>
                Todas las compras
              </a>,
            ]}>
            <List.Item.Meta
              avatar={<Avatar src={item.userInfo.img[0]} />}
              title={
                <div className="aux">
                  <div>{item.userInfo.firstname}</div>
                  <div>{item.userInfo.lastname}</div>
                </div>
              }
              description={item.userInfo.email}
            />
          </List.Item>
        )}
      />
      <Drawer
        width={640}
        placement="right"
        closable={false}
        onClose={onClose}
        open={open}>
        <p
          className="site-description-item-profile-p"
          style={{
            marginBottom: 24,
          }}>
          Perfil del usuario
        </p>
        <p className="site-description-item-profile-p">Personal</p>

        {loading ? (
          <div>
            <Spin />
          </div>
        ) : (
          <div>
            <Row>
              <Col span={12}>
                <DescriptionItem
                  title={
                    <span style={{ fontWeight: "bold" }}>
                      Nombre y apellido
                    </span>
                  }
                  content={
                    <div className="aux">
                      <div>{drawerData.userOrder[0].userInfo.firstname}</div>
                      <div>{drawerData.userOrder[0].userInfo.lastname}</div>
                    </div>
                  }
                />
              </Col>
              <Col span={12}>
                <DescriptionItem
                  title={<span style={{ fontWeight: "bold" }}>Mi cuenta</span>}
                  content="Henry Games Store"
                />
              </Col>
            </Row>
          </div>
        )}

        <Divider />
        <p className="site-description-item-profile-p">Compras Realizadas</p>
        <br></br>
        {loading ? (
          <div>
            <Spin />
          </div>
        ) : (
          <div>
            {drawerData.userOrder[0]?.orders.map((order) => (
              <div key={order.userId}>
                {" "}
                {/* Asegúrate de tener una clave única para cada elemento en el bucle de mapeo */}
                <Row className="rows">
                  <Col span={12}>
                    <DescriptionItem
                      title={
                        <span style={{ fontWeight: "bold" }}>
                          ID del carrito
                        </span>
                      }
                      content={order.id}
                    />
                  </Col>
                  <Col span={12}>
                    <DescriptionItem
                      title={
                        <span style={{ fontWeight: "bold" }}>
                          Fecha de compra
                        </span>
                      }
                      content={order.createdAt}
                    />
                  </Col>
                </Row>
                <Row className="rows">
                  <Col span={12}>
                    <DescriptionItem
                      title={
                        <span style={{ fontWeight: "bold" }}>
                          Estado del pago
                        </span>
                      }
                      content={order.status}
/*                       content={order.status === "Completed Pay" ? "Pago finalizdo correctamente" : "Pago rechazado"}
 */                    />
                  </Col>
                  <Col span={12}>
                    <DescriptionItem
                      title={
                        <span style={{ fontWeight: "bold" }}>
                          Total abonado
                        </span>
                      }
                      content={`$${order.totalAmount}`}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <DescriptionItem
                      title={
                        <span style={{ fontWeight: "bold" }}>
                          Productos adquiridos
                        </span>
                      }
                      content={
                        <div className="products">
                          {order.videogames.map((videogame) => (
                            <div key={videogame.id}>
                              <div className="products-boughts">
                                <p>Nombre: {videogame.name}</p>
                                <p>Precio: ${videogame.price}</p>
                                <p>
                                  Cantidad: {videogame.OrdersDetail.quantity}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      }
                    />
                  </Col>
                  <Divider />
                </Row>
              </div>
            ))}
          </div>
        )}

        <p className="site-description-item-profile-p">Contacto</p>
        <Row className="products">
          <Col span={12}>
            <DescriptionItem
              title={<span style={{ fontWeight: "bold" }}>Email</span>}
              content={
                drawerData &&
                drawerData.userOrder &&
                drawerData.userOrder[0] &&
                drawerData.userOrder[0].userInfo &&
                drawerData.userOrder[0].userInfo.email
              }
            />
          </Col>
          <Col span={12}>
            <DescriptionItem
              title={<span style={{ fontWeight: "bold" }}>Teléfono</span>}
              content={
                drawerData &&
                drawerData.userOrder &&
                drawerData.userOrder[0] &&
                drawerData.userOrder[0].userInfo &&
                drawerData.userOrder[0].userInfo.mobile
              }
            />
          </Col>
        </Row>
      </Drawer>
    </div>
  );
}
export { PaymentsViews };

{
  /*     <Row>
          <Col span={24}>
            <DescriptionItem
              title="Github"
               content={
                <a href="http://github.com/ant-design/ant-design/">
                  github.com/ant-design/ant-design/
                </a>
              }
            /> 
            
          </Col>
        </Row> */
}
