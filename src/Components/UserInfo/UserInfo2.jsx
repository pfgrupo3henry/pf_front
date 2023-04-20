import {
  AppstoreOutlined,
  PlusOutlined,
  LoadingOutlined,
  CheckCircleTwoTone,
  CloseCircleTwoTone,
} from "@ant-design/icons";
import React from "react";
import { Descriptions } from "antd";
import {
  Menu,
  Button,
  Form,
  Input,
  Card,
  Upload,
  Avatar,
  List,
  Modal,
  Space,
  Table,
} from "antd";
import { useState } from "react";
import "./UserInfo.css";
import "../CardDetail/CardDetail.css";
import axios from "axios";
import Cookies from "universal-cookie";

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const items = [
  getItem("Menu", "sub2", <AppstoreOutlined />, [
    getItem("Mi Perfil", "1"),
    getItem("Cambiar Informacion", "2"),
    getItem("Ver Compras", "3"),
  ]),
];

function UserInfo() {
  const [verPerfil, setVerFerfil] = useState(true);
  const [verFrom, setVerForm] = useState(false);
  const [pagos, setPagos] = useState([]);
  const [theme, setTheme] = useState("ligth");
  const [current, setCurrent] = useState("1");
  const [newUser, setNewUser] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [input, setInput] = useState({
    firstname: "",
    lastname: "",
    nationality: "",
    mobile: "",
    img: [],
  });
  const [fileList, setFileList] = useState([]);
  const [imagenFile, setImagenFile2] = useState("vacio");
  const { Meta } = Card;
  const cookie = new Cookies();
  const email = cookie.get("email");
  const userId = cookie.get("id");
  console.log(email);
  const Swal = require("sweetalert2");

  if (newUser.length === 0) {
    axios
      .get(`https://pfservidor-production.up.railway.app/user/${email}`)
      .then((res) => {
        setNewUser([res.data]);
        setTitulo(`${res.data.firstname} ${res.data.lastname}`);
      })
      .catch((err) => console.log(err));
  }

  const verPagos = () => {
    axios
      .get(`https://pfservidor-production.up.railway.app/orders/${userId}`)
      .then((res) => {
        console.log(res);
        setPagos(res.data.userOrder);
      })
      .catch((err) => console.log(err));
  };

  const modifyUserSubmit = () => {
    if (
      !input.firstname ||
      !input.lastname ||
      !input.nationality ||
      !input.mobile ||
      !input.img.length === 0
    ) {
      Swal.fire({
        title: "Error!",
        text: "Falta enviar datos obligatorios",
        icon: "error",
        confirmButtonText: "Ok",
      });
    } else {
      axios
        .put(
          `https://pfservidor-production.up.railway.app/user/modify/${newUser[0].email}`,
          input
        )
        .then((res) => {
          console.log(res);
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
          Swal.fire({
            title: "Error!",
            text: "El celular ya existe, utilizar otro",
            icon: "error",
            confirmButtonText: "Ok",
          });
        });
    }
  };

  const handelInputChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });

    if (imagenFile === "enCamino") {
      setInput({
        ...input,
        img: [input.img[0].thumbUrl],
      });
      setImagenFile2("completo");
    }

    console.log(input);
  };

  const onChangeInputImage = (e) => {
    setFileList(e.fileList);
  };

  const handleFileListChange = ({ fileList }) => {
    setFileList(fileList);
    setImagenFile2("enCamino");
    setInput({
      ...input,
      img: [...fileList],
    });
  };

  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);

    if (e.key === "1") {
      setPagos([]);
      setVerFerfil(true);
      setVerForm(false);
    }

    if (e.key === "2") {
      setPagos([]);
      setVerFerfil(false);
      setVerForm(true);
    }

    if (e.key === "3") {
      verPagos();
      setVerFerfil(false);
      setVerForm(false);
    }
  };

  const translations = {
    "Completed Pay": "Pago completado",
    "Rejected Pay": "Pago rechazado",
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [mappedVideogames, setMappedVideogames] = useState([]);

  const showModal = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
    const mappedGames = item.videogames.map((game) => ({
      name: game.name,
      price: game.price,
      OrdersDetail: game.OrdersDetail,
    }));
    setMappedVideogames(mappedGames);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const columns = [
    {
      title: "Nombre",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Precio",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Cantidad",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Subtotal",
      dataIndex: "subtotal",
      key: "subtotal",
    },
  ];

  const data = mappedVideogames.map((game) => ({
    key: game.id,
    name: game.name,
    price: game.price,
    quantity: game.OrdersDetail.quantity,
    subtotal: game.OrdersDetail.subtotal,
    totalAmount: game.totalAmount,
  }));

  return (
    <div className="menuProfileInfo">
      <div className="menuOptions">
        <Menu
          onClick={onClick}
          defaultOpenKeys={["sub1"]}
          selectedKeys={[current]}
          mode="inline"
          items={items}
          style={{
            width: "230px",
          }}
        />
      </div>

      <div className="cardIndoUserInformation">
        <div className="axuilar">
          {verFrom ? (
            <Form
              name="wrap"
              labelCol={{
                span: 6,
              }}
              labelWrap
              wrapperCol={{
                span: 20,
              }}
              colon={false}
              style={{
                maxWidth: 800,
              }}
              onChange={handelInputChange}>
              <Form.Item
                label="Nombre"
                name="firstname"
                rules={[{ required: true }]}>
                <Input name="firstname" />
              </Form.Item>

              <Form.Item
                label="Apellido"
                name="lastname"
                rules={[{ required: true }]}>
                <Input name="lastname" />
              </Form.Item>

              <Form.Item
                label="Imagen"
                valuePropName="fileList"
                initialValue={fileList[0]}
                name="upload"
                getValueFromEvent={handleFileListChange}
                size={10}
                rules={[
                  {
                    required: true,
                    message: "Cargar la imagen",
                  },
                ]}>
                <Upload
                  action="/upload.do"
                  listType="picture-card"
                  onChange={(e) => {
                    onChangeInputImage(e);
                  }}>
                  <div>
                    <PlusOutlined />
                    <div
                      style={{
                        marginTop: 8,
                      }}>
                      Foto
                    </div>
                  </div>
                </Upload>

                {/* <input type='file' onChange={agregarFoto} /> */}
              </Form.Item>

              <Form.Item
                label="Nacionalidad"
                name="nationality"
                rules={[{ required: true }]}>
                <Input name="nationality" />
              </Form.Item>

              <Form.Item
                label="Celular"
                name="mobile"
                rules={[{ required: true }]}>
                <Input name="mobile" />
              </Form.Item>

              <Form.Item label=" ">
                <Button
                  type="primary"
                  htmlType="submit"
                  onClick={modifyUserSubmit}>
                  Actualizar
                </Button>
              </Form.Item>
            </Form>
          ) : null}
        </div>

        {pagos.length !== 0 ? (
          <div className="pagos-estilos">
            <List
              itemLayout="horizontal"
              size="large"
              pagination={{
                onChange: (page) => {
                  console.log(page);
                },
                pageSize: 5,
              }}
              dataSource={pagos[0].orders}
              renderItem={(item) => (
                <List.Item key={item.title}>
                  <List.Item.Meta
                    avatar={
                      item.status === "Completed Pay" ? (
                        <CheckCircleTwoTone
                          className="iconoss"
                          twoToneColor="#52c41a"
                        />
                      ) : item.status === "Rejected Pay" ? (
                        <CloseCircleTwoTone
                          className="iconoss"
                          twoToneColor="#eb2f96"
                        />
                      ) : (
                        <Avatar src={item.avatar} />
                      )
                    }
                    title={<a>{translations[item.status]}</a>}
                    description={
                      <div>
                        <span style={{ color: "#1890ff" }}>Fecha: </span>
                        <span>
                          {new Date(item.updatedAt).toLocaleDateString()}
                        </span>
                      </div>
                    }
                  />
                  <div className="botonOrden">
                    <Button type="primary" onClick={() => showModal(item)}>
                      Detalle de la orden
                    </Button>
                  </div>
                  {console.log(selectedItem)}

                  <Modal
                    title={`#${selectedItem?.id}`}
                    open={isModalOpen}
                    onOk={handleOk}
                    onCancel={handleCancel}>
                    <Table
                      columns={columns}
                      dataSource={data}
                      footer={() => (
                        <div style={{ textAlign: "right" }}>
                          <strong>Monto total:</strong>{" "}
                          {selectedItem.totalAmount}
                        </div>
                      )}
                    />
                  </Modal>
                </List.Item>
              )}
            />
          </div>
        ) : null}

        {verPerfil ? (
          <>
            <Card
              className="cardInfoUser"
              style={{ width: 300, height: 400 }}
              cover={
                <img
                  style={{ width: 300, height: 330 }}
                  alt="Profile Imagen"
                  src={newUser[0] ? newUser[0].img : "Incompleto"}
                />
              }>
              <Meta
                title={titulo ? titulo : <LoadingOutlined />}
                description=""
              />
              <br />
            </Card>
            <Descriptions className="infoUserDetail" title="Informacion">
              <Descriptions.Item className="infoUserDetail" label="Nombre">
                {newUser && newUser.length !== 0 ? (
                  newUser[0].firstname
                ) : (
                  <LoadingOutlined />
                )}
              </Descriptions.Item>
              <Descriptions.Item className="infoUserDetail" label="Apellido">
                {newUser && newUser.length !== 0 ? (
                  newUser[0].lastname
                ) : (
                  <LoadingOutlined />
                )}
              </Descriptions.Item>
              <Descriptions.Item className="infoUserDetail" label="Celular">
                {newUser && newUser.length !== 0 ? (
                  newUser[0].mobile
                ) : (
                  <LoadingOutlined />
                )}
              </Descriptions.Item>
              <Descriptions.Item className="infoUserDetail" label="Email">
                {newUser && newUser.length !== 0 ? (
                  newUser[0].email
                ) : (
                  <LoadingOutlined />
                )}
              </Descriptions.Item>
              <Descriptions.Item
                className="infoUserDetail"
                label="Nacionalidad">
                {newUser && newUser.length !== 0 ? (
                  newUser[0].nationality
                ) : (
                  <LoadingOutlined />
                )}
              </Descriptions.Item>
            </Descriptions>
          </>
        ) : null}
      </div>
    </div>
  );
}

export default UserInfo;
