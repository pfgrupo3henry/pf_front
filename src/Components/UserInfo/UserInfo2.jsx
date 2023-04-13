import { AppstoreOutlined, PlusOutlined } from '@ant-design/icons';
import { Descriptions } from 'antd';
import { Menu, Button, Form, Input, Card, Upload } from 'antd';
import { useState } from 'react';
import "./UserInfo.css";
import "../CardDetail/CardDetail.css";
import axios from "axios";
import Cookies from "universal-cookie";
import { LoadingOutlined, } from '@ant-design/icons';




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
  getItem('Menu', 'sub2', <AppstoreOutlined />, [
    getItem('Cambiar Informacion', '1'),
    getItem('Ver Compras', '2'),
  ])

];

function UserInfo() {

  const [pagos, setPagos] = useState([]);
  const [verFrom, setVerForm] = useState("vacio");
  const [theme, setTheme] = useState('ligth');
  const [current, setCurrent] = useState('1');
  const [newUser, setNewUser] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [input, setInput] = useState({
    firstname: "",
    lastname: "",
    nationality: "",
    mobile: "",
    img: []
  });
  const [fileList, setFileList] = useState([]);
  const [imagenFile, setImagenFile2] = useState("vacio");
  const { Meta } = Card;
  const cookie = new Cookies();
  const email = cookie.get("email");
  const userId = cookie.get("id");
  console.log(email);

  if (newUser.length === 0) {

    axios.get(`https://pfservidor-production.up.railway.app/user/${email}`)
      .then((res) => {
        setNewUser([res.data]);
        setTitulo(`${res.data.firstname} ${res.data.lastname}`);
      })
      .catch((err) => console.log(err))

  }

  const modifyUserSubmit = () => {

    if (!input.firstname || !input.lastname || !input.nationality || !input.mobile || !input.img.length === 0) {
      return (console.log("falta enviar datos obligatorios"));
    } else {
      axios.put(`https://pfservidor-production.up.railway.app/user/modify/${newUser[0].email}`, input)
        .then((res) => {
          window.location.reload();
        })
        .catch((err) => console.log(err))

    }

  };

  const handelInputChange = (e) => {

    setInput(
      {
        ...input,
        [e.target.name]: e.target.value
      }
    );

    if (imagenFile === "enCamino") {
      setInput(
        {
          ...input,
          img: [input.img[0].thumbUrl]
        }
      );
      setImagenFile2("completo")
    };

    console.log(input);
  };

  const onClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key);

    if (e.key === "1") {
      setPagos([])
      setVerForm("ver");
    };

    if (e.key === "2") {
      verPagos();
      setVerForm("vacio");
    };
  };

  const onChangeInputImage = (e) => {
    setFileList(e.fileList);
  };

  const handleFileListChange = ({ fileList }) => {
    setFileList(fileList);
    setImagenFile2("enCamino");
    setInput(
      {
        ...input,
        img: [...fileList]
      }
    );
  };

  const verPagos = () => {

    axios.get(`https://pfservidor-production.up.railway.app/orders/${userId}`)
      .then((res) => {
        console.log(res);
        setPagos(res.data.userOrder)
      })
      .catch((err) => console.log(err))

  }

  console.log(pagos);

  return (

    <div className="menuProfileInfo">
      <div className="menuOptions">

        <Menu
          theme={theme}
          onClick={onClick}
          style={{
            width: 256,
          }}
          defaultOpenKeys={['sub1']}
          selectedKeys={[current]}
          mode="inline"
          items={items}
        />

        <div>
          {
            verFrom === "ver" ?

              <Form
                name="wrap"
                labelCol={{ flex: '110px' }}
                labelAlign="left"
                labelWrap
                wrapperCol={{ flex: 1 }}
                colon={false}
                style={{ maxWidth: 600 }}
                onChange={handelInputChange}
              >
                <Form.Item label="Nombre" name="firstname" rules={[{ required: true }]}>
                  <Input name="firstname" />
                </Form.Item>

                <Form.Item label="Apellido" name="lastname" rules={[{ required: true }]}>
                  <Input name="lastname" />
                </Form.Item>

                <Form.Item label="Upload" valuePropName="fileList"
                  initialValue={fileList[0]}
                  name="upload"
                  getValueFromEvent={handleFileListChange}
                  size={10}
                  rules={[
                    {
                      required: true,
                      message: "Cargar la imagen"
                    },
                  ]}
                >
                  <Upload
                    action="/upload.do"
                    listType="picture-card"
                    onChange={(e) => { onChangeInputImage(e) }}
                  >

                    <div>
                      <PlusOutlined />
                      <div
                        style={{
                          marginTop: 8,
                        }}
                      >
                        Image
                      </div>
                    </div>
                  </Upload>

                  {/* <input type='file' onChange={agregarFoto} /> */}


                </Form.Item>

                <Form.Item label="Nacionalidad" name="nationality" rules={[{ required: true }]}>
                  <Input name="nationality" />
                </Form.Item>

                <Form.Item label="Celular" name="mobile" rules={[{ required: true }]}>
                  <Input name="mobile" />
                </Form.Item>

                <Form.Item label=" ">
                  <Button type="primary" htmlType="submit" onClick={modifyUserSubmit}>
                    Submit
                  </Button>
                </Form.Item>
              </Form>

              :
              null
          }
        </div>

        {pagos.length !== 0 ?

          pagos[0].orders.map((p) => {
            return (
              <div>
                <br></br>
                <p>Fecha: {p.createdAt}</p>
                <p className='p-status'>Status: {p.status}</p>
                <p className='p-precio'>Precio: ${p.totalAmount}</p>
                <br></br>
              </div>
            )
          })

          :
          null}
      </div>

      <div className="cardIndoUserInformation">
        <Card
          className="cardInfoUser"
          style={{ width: 300, height: 400 }}
          cover={
            <img
              style={{ width: 300, height: 330 }}
              alt="Profile Imagen"
              src={newUser[0] ? newUser[0].img[0] : "Incompleto"}
            />
          }
        >
          <Meta
            title={titulo ? titulo : <LoadingOutlined />}
            description=""
          />
          <br></br>
        </Card>

        <Descriptions className="infoUserDetail" title="Informacion">
          <Descriptions.Item className="infoUserDetail" label="Nombre">{newUser[0] ? newUser[0].firstname : <LoadingOutlined />}</Descriptions.Item>
          <Descriptions.Item className="infoUserDetail" label="Apellido">{newUser[0] ? newUser[0].lastname : <LoadingOutlined />}</Descriptions.Item>
          <Descriptions.Item className="infoUserDetail" label="Celular">{newUser[0] ? newUser[0].mobile : <LoadingOutlined />}</Descriptions.Item>
          <Descriptions.Item className="infoUserDetail" label="Email">{newUser[0] ? newUser[0].email : <LoadingOutlined />}</Descriptions.Item>
          <Descriptions.Item className="infoUserDetail" label="Nacionalidad">{newUser[0] ? newUser[0].nationality : <LoadingOutlined />}</Descriptions.Item>
        </Descriptions>
      </div>

    </div>

  );

};

export default UserInfo;
