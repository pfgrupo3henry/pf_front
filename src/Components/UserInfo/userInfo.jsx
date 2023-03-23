import React from "react";
import { Card } from 'antd';
import "./UserInfo.css";




function UserInfo() {



  return (

    <div className="profile-body">

      <Card
        hoverable
        style={{ width: 300, height: 500 }}
        cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
      >

        <h1>Felipe Blaksley</h1>

      </Card>

      <div className="profile-text">

        <h3>Date of birth: <h5 className="text-data-profile">22/05/1992</h5></h3>
        <br></br>
        <h3>Nacionality: <h5 className="text-data-profile">Argentina</h5></h3>
        <br></br>
        <h3>Mobile: <h5 className="text-data-profile">112-458-6710</h5></h3>
        <br></br>
        <h3>Social Networks: <h5 className="text-data-profile">Linkedin, Instagram</h5></h3>
        <br></br>
        <h3>Favorites: <h5 className="text-data-profile">God of War, Age of Empires</h5></h3>
        <br></br>
        <h3>email: <h5 className="text-data-profile">felipe.blaksley@hotmail.com</h5></h3>

      </div>

    </div>

  );

};

export default UserInfo;



/*import React from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { MailOutlined, SettingOutlined, AppstoreOutlined } from '@ant-design/icons';
import { Menu, Switch } from 'antd';
import { useState } from 'react';
import Admin from "../Admin/Admin"
import { FormCreateProduct } from "../FormCreateProducts/FormCreateProduct"
import "./UserInfo.css"

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
  getItem('Dashboard', null, <MailOutlined />, [
  ]),

  getItem('Articles', 'sub2', <AppstoreOutlined />, [
    getItem('List Products', '5'),
    getItem('New Product ', '6'), */
/*  getItem('Submenu', 'sub3', null, [getItem('Option 7', '7'), getItem('Option 8', '8')]), */
  //]),

//];

/*function UserInfo() {
  const [theme, setTheme] = useState('ligth');
  const [current, setCurrent] = useState('1');

  const onClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  const changeTheme = (value) => {
    setTheme(value ? 'dark' : 'light');
  };


  return (
    <div className="userInfoContainer">
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

      <FormCreateProduct />

    </div>
  )
}


export default UserInfo;

<FaRegUserCircle />*/