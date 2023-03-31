import React from "react";
import { Card } from 'antd';
import { AppstoreOutlined } from '@ant-design/icons';
import { Descriptions } from 'antd';
import { Menu } from 'antd';
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
  const [theme, setTheme] = useState('ligth');
  const [current, setCurrent] = useState('1');
  const [newUser, setNewUser] = useState([]);

  const onClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  const cookie = new Cookies();
  const email = cookie.get("email");
  const emailAuth0 = user.email;


  if (newUser.length === 0) {

    if (email) {

      axios.get(`http://localhost:3001/user/${email}`)
        .then((res) => {
          console.log(res.data);
          setNewUser([res.data]);
        })
        .catch((err) => console.log(err))

    } else if (emailAuth0) {

      axios.get(`http://localhost:3001/user/${emailAuth0}`)
        .then((res) => {
          console.log(res.data);
          setNewUser([res.data]);
        })
        .catch((err) => console.log(err))

    }

  };

  console.log(newUser);
  console.log(emailAuth0);

  return (

    <div className="menuProfileInfo">
      <div className="menuOptions">

        <br />
        <br />
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
            title={newUser[0] ? newUser[0].firstname : "Incompleto"}
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
