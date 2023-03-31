import { AppstoreOutlined } from '@ant-design/icons';
import { Descriptions } from 'antd';
import { Menu, Button, Form, Input, Card } from 'antd';
import { useState } from 'react';
import "./UserInfo.css";
import "../CardDetail/CardDetail.css";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import Cookies from "universal-cookie";





const { Meta } = Card;

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

  const { user, isAuthenticated, isLoading, loginWithPopup } = useAuth0();
  const [email3, setEmail3] = useState("vacio");
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
    password: "22felipe05"
  });


  if (!user && email3 === "vacio") {

    const cookie = new Cookies();
    const email = cookie.get("email");

    if (newUser.length === 0) {

      if (email) {

        axios.get(`http://localhost:3001/user/${email}`)
          .then((res) => {
            console.log(res.data);
            setNewUser([res.data]);
            setEmail3(email);
            setTitulo(`${res.data.firstname} ${res.data.lastname}`);
          })
          .catch((err) => console.log(err))

      }

    }
  } else {

    const emailAuth0 = user.email;

    if (newUser.length === 0) {

      if (emailAuth0) {

        axios.get(`http://localhost:3001/user/${emailAuth0}`)
          .then((res) => {
            console.log(res.data);
            setNewUser([res.data]);
            setEmail3(emailAuth0);
            setTitulo(`${res.data.firstname} ${res.data.lastname}`);
          })
          .catch((err) => console.log(err))

      }

    };

  };

  const modifyUserSubmit = () => {

    axios.put(`http://localhost:3001/user/modify/pipe.blaksley@gmail.com`, input)
      .then((res) => {
        console.log(res.data);
        window.location.reload();
      })
      .catch((err) => console.log(err))

  };

  const handelInputChange = (e) => {

    setInput(
      {
        ...input,
        [e.target.name]: e.target.value
      }
    );
    console.log(input);
  };

  const onClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key);

    if (e.key === "1") {
      setVerForm("ver");
    };
  };


  console.log(newUser);
  console.log(email3);

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
      </div>

      <div className="cardIndoUserInformation">
        <Card
          className="cardInfoUser"
          style={{ width: 300, height: 400 }}
          cover={
            <img
              style={{ width: 300, height: 330 }}
              alt="Among Us"
              src="https://www.delacabeza-rivera.es/wp-content/uploads/2020/06/PERFIL-VACIO.png"
            />
          }
        >
          <Meta
            title={titulo ? titulo : "Incompleto"}
            description=""
          />
          <br></br>
        </Card>

        <Descriptions className="infoUserDetail" title="Informacion">
          <Descriptions.Item className="infoUserDetail" label="Nombre">{newUser[0] ? newUser[0].firstname : "Incompleto"}</Descriptions.Item>
          <Descriptions.Item className="infoUserDetail" label="Apellido">{newUser[0] ? newUser[0].lastname : "Incompleto"}</Descriptions.Item>
          <Descriptions.Item className="infoUserDetail" label="Celular">{newUser[0] ? newUser[0].mobile : "Incompleto"}</Descriptions.Item>
          <Descriptions.Item className="infoUserDetail" label="Email">{newUser[0] ? newUser[0].email : "Incompleto"}</Descriptions.Item>
          <Descriptions.Item className="infoUserDetail" label="Nacionalidad">{newUser[0] ? newUser[0].nationality : "Incompleto"}</Descriptions.Item>
        </Descriptions>
      </div>

    </div>

  );

};

export default UserInfo;
