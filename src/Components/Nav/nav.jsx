import React from "react";
import "./nav.css";
import { Login } from "../Auth0/login";
import { Logout } from "../Auth0/logut";
import { Profile } from "../Auth0/profile";
import { useAuth0 } from "@auth0/auth0-react";
import SearchBar from "../SearchBar/SearchBar";
import { Link } from "react-router-dom";
import { RiShoppingCartLine } from "react-icons/ri";
import { DropdownShoppingCart } from "../DropdownShoppingCart/DropdownShoppingCart";


import { DownOutlined } from "@ant-design/icons";
import { Dropdown, message, Space } from "antd";

function Nav() {

  const [shoppingCartRender, setShoppingCartRender] = React.useState(false)

  const { user, isAuthenticated, isLoading, loginWithPopup } = useAuth0();

  React.useEffect(() => {
    if (user) {
      console.log(user.email);
    }
  }, [user])

  const handleLoginClick = () => {
      loginWithPopup({
        height: 600,
        width: 400,
        timeoutInSeconds: 10,
      });
  }

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
      label: <Link to="/profile">Profile</Link>,
      key: "1",
    },
    {
      label: <Link to="/favorites">Favorites</Link>,
      key: "2",
    },
    {
      label: <Logout />,
      key: "3",
    },
  ];

  return (
    <div className={`nav-component ${isAuthenticated ? "nav" : "navAux"}`}>
      <div className="rutasNavContainer">
        <ul>
          <li className={!isAuthenticated ? "rutasNav" : "rutasNavAlternativeAux"}>
            <Link to="/" className="rutasNav">
              Home
            </Link>
          </li>
          {
            isAuthenticated
            ? null
            : <li className={!isAuthenticated ? "rutasNavAux" : "rutasNavAlternativeAux2"}>
                <Login />
              </li>
          }
          <li>
            <Dropdown className={!isAuthenticated ? "rutasNav2AuxUltimate" : "rutasNav2Aux"}
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
            </Dropdown>
          </li>
          <li className={!isAuthenticated ? "buscador" : "buscadorAux"}>
            <SearchBar />
          </li>
        </ul>
        <div className={!isAuthenticated ? "rutasNav" : "rutasNavAlternativeAux"}></div>
        <div className="rutasNav3">
          <div className="profileNav">
            {!isAuthenticated ? null : (
              <Dropdown
                className=""
                menu={{
                  items: profileOptions,
                  onClick,
                }}>
                <a onClick={(e) => e.preventDefault()}>
                  <Space>
                    <Profile />
                  </Space>
                </a>
              </Dropdown>
            )}
            <RiShoppingCartLine onClick={() => {isAuthenticated ? setShoppingCartRender(!shoppingCartRender) : handleLoginClick()}} className={!isAuthenticated ? "cartAux" : "cart"} />
          </div>
        </div>
          {
            shoppingCartRender
            ? <DropdownShoppingCart />
            : null
          }
      </div>
    </div>
  );
}

export { Nav };
