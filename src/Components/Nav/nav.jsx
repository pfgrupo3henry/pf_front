import React from "react";
import "./nav.css";
import { Login } from "../Auth0/login";
import { Logout } from "../Auth0/logut";
import { Profile } from "../Auth0/profile";
import { useAuth0 } from "@auth0/auth0-react";
import SearchBar from "../SearchBar/SearchBar";

import { RiShoppingCartLine } from "react-icons/ri";

/*     import { useState } from 'react';
 */
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, message, Space } from "antd";

function Nav() {
  const { user, isAuthenticated, isLoading } = useAuth0();

  const onClick = ({ key }) => {
    /*             message.info(`Click on item ${key}`);
     */
  };
  const inboxOptions = [
    {
      label: "Example 1",
      key: "1",
    },
    {
      label: "Example 2",
      key: "2",
    },
    {
      label: "Example 3",
      key: "3",
    },
  ];

  const profileOptions = [
    {
      label: "Profile",
      key: "1",
    },
    {
      label: "Favorites",
      key: "2",
    },
    {
      label: <Logout />,
      key: "3",
    },
  ];

  return (
    <div className={isAuthenticated ? "nav" : "navAux"}>
      <div className="rutasNavContainer">
        <div className={!isAuthenticated ? "rutasNav" : "rutasNavAlternative"}>
          <Login />
        </div>
        <div className="buscador">
          <SearchBar />
        </div>

        {/* <Dropdown
          className="rutasNav2Aux"
          menu={{
            items: inboxOptions,
            onClick,
          }}>
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              Catalogue
              <DownOutlined />
            </Space>
          </a>
        </Dropdown> */}

        <div className="rutasNav3">
          {/* <Profile/> */}

          {!isAuthenticated ? null : (
            <Dropdown
              className="rutasNav"
              menu={{
                items: profileOptions,
                onClick,
              }}>
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  <Profile />
                  {/* <DownOutlined /> */}
                </Space>
              </a>
            </Dropdown>
          )}

          <RiShoppingCartLine className="cart" />
        </div>
      </div>
    </div>
  );
}

export { Nav };

/*     <div className="nav">
    <div className="rutasNavContainer">
        < div className = "rutasNav"><Login/>
        
        </div>
        < div className = "rutasNav"><Logout/>
        
        </div>
        < div className = "rutasNav"><Profile/>
        
        </div>

        
    </div>

</div> */
