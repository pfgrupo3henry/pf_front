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
  Image,
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
      return Swal.fire({
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
          window.location.reload();
        })
        .catch((err) => console.log(err));
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
    console.log(item);
    setSelectedItem(item);
    setIsModalOpen(true);
    const mappedGames = item.videogames.map((game) => ({
      id: game.id,
      name: game.name,
      img: game.img[0],
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
      title: "img",
      dataIndex: "img",
      key: "img",
      render: (img) => {
        return <Image src={img} width={40} />;
      },
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => {
        return "$" + price;
      },
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Subtotal",
      dataIndex: "subtotal",
      key: "subtotal",
      render: (subtotal) => {
        return "$" + subtotal;
      },
    },
  ];

  const data = mappedVideogames.map((game) => ({
    key: game.id,
    name: game.name,
    price: game.price,
    img: game.img,
    quantity: game.OrdersDetail.quantity,
    subtotal: game.OrdersDetail.subtotal,
    totalAmount: game.totalAmount,
  }));

  console.log(mappedVideogames);

  return (
    <div className="menuProfileInfo">
      <div className="menuOptions">
        <Menu
          theme={theme}
          onClick={onClick}
          style={{
            width: 256,
          }}
          defaultOpenKeys={["sub1"]}
          selectedKeys={[current]}
          mode="inline"
          items={items}
        />
      </div>

      <div className="cardIndoUserInformation">
        {verFrom ? (
          <Form
            name="wrap"
            labelCol={{
              span: 6,
            }}
            labelAlign="left"
            labelWrap
            wrapperCol={{
              span: 14,
            }}
            style={{ maxWidth: 600 }}
            onChange={handelInputChange}>
            <Form.Item
              label="juan"
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
              label="Upload"
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
                    Image
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
                Submit
              </Button>
            </Form.Item>
          </Form>
        ) : null}

        {pagos.length !== 0 ? (
          <List
            itemLayout="vertical"
            size="large"
            pagination={{
              onChange: (page) => {
                console.log(page);
              },
              pageSize: 3,
            }}
            dataSource={pagos[0].orders}
            renderItem={(item) => (
              <List.Item key={item.title}>
                <List.Item.Meta
                  avatar={
                    item.status === "Completed Pay" ? (
                      <CheckCircleTwoTone twoToneColor="#52c41a" />
                    ) : item.status === "Rejected Pay" ? (
                      <CloseCircleTwoTone twoToneColor="#eb2f96" />
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
                <Button type="primary" onClick={() => showModal(item)}>
                  Order Detail
                </Button>

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
                        <strong>Total Amount:</strong> $
                        {selectedItem.totalAmount}
                      </div>
                    )}
                  />
                </Modal>
              </List.Item>
            )}
          />
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
