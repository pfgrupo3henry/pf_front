import React from "react";
import {FaRegUserCircle} from "react-icons/fa";
import { MailOutlined, SettingOutlined, AppstoreOutlined } from '@ant-design/icons';
import { Menu, Switch } from 'antd';
import { useState } from 'react';
import Admin from "../Admin/Admin"
import {FormCreateProduct} from "../FormCreateProducts/FormCreateProduct"
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
      getItem('Dashboard', null ,<MailOutlined />,  [
      ]),
    
      getItem('Articles', 'sub2', <AppstoreOutlined />, [
        getItem('List Products', '5'),
        getItem('New Product ', '6'),
       /*  getItem('Submenu', 'sub3', null, [getItem('Option 7', '7'), getItem('Option 8', '8')]), */
      ]),
     
    ];
    
function UserInfo (){
    const [theme, setTheme] = useState('ligth');
    const [current, setCurrent] = useState('1');

    const onClick = (e) => {
      console.log('click ', e);
      setCurrent(e.key);
    };

    const changeTheme = (value) => {
      setTheme(value ? 'dark' : 'light');
    };


    return(
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
          
          <FormCreateProduct/>
          
        </div>
    )
}


export {UserInfo}

{/* <FaRegUserCircle/> */}