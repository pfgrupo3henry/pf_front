import React from "react";
import "./nav.css";
import { Login } from "../Auth0/login";
import { Logout } from "../Auth0/logut";
import { Profile } from "../Auth0/profile";
import { useAuth0 } from "@auth0/auth0-react";
import SearchBar from "../SearchBar/SearchBar";
import { Link } from "react-router-dom";
import { RiShoppingCartLine } from "react-icons/ri";
import DropdownShoppingCart from "../DropdownShoppingCart/DropdownShoppingCart";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, message, Space } from "antd";
import Cookies from "universal-cookie";

function Nav() {

  const [shoppingCartRender, setShoppingCartRender] = React.useState(false)
  const { user, isAuthenticated, isLoading, loginWithRedirect } = useAuth0();
  const cookie = new Cookies();
  const cookieId = cookie.get("firstname");

  const handleLoginClick = () => {
    loginWithRedirect({
      height: 600,
      width: 400,
      //timeoutInSeconds: 10,
    });
  }

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
      label: <Link to="/admin" className="rutasNav">Admin</Link>,
      key: "3",
    },
    {
      label: <Logout />,
      key: "4",
    },
  ];

  return (
    <div className={`nav-component ${isAuthenticated || cookieId ? "nav" : "navAux"}`}>
      <div className="rutasNavContainer">
        <ul>
          <li className={isAuthenticated || cookieId ? "rutasNavAlternativeAux" : "rutasNav"}>
            <Link to="/home" className="rutasNav">Home</Link>
          </li>
          {
            isAuthenticated || cookieId
              ? null
              : <li className={isAuthenticated || cookieId ? "rutasNavAlternativeAux2" : "rutasNavAux"}>
                <Link to="/login" className="rutasNav">Login</Link>
              </li>
          }
          <li>
            <Dropdown className={isAuthenticated || cookieId ? "rutasNav2Aux" : "rutasNav2AuxUltimate"}
              menu={{
                items: inboxOptions,
              }}>
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  Catalogue
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>
          </li>
          <li className={isAuthenticated || cookieId ? "buscadorAux" : "buscador"}>
            <SearchBar />
          </li>
        </ul>
        <div className={isAuthenticated || cookieId ? "rutasNavAlternativeAux" : "rutasNav"}></div>
        <div className="rutasNav3">
          <div className="profileNav">
            {isAuthenticated ?
              <Dropdown
                className=""
                menu={{
                  items: profileOptions,
                }}>
                <a onClick={(e) => e.preventDefault()}>
                  <Space>
                    <Profile />
                  </Space>
                </a>
              </Dropdown> :
              null
            }
            <div>
              {cookieId ?
                <Dropdown
                  className=""
                  menu={{
                    items: profileOptions,
                  }}>
                  <a onClick={(e) => e.preventDefault()}>
                    <Space>
                      <img className="imgProfile" src="https://www.delacabeza-rivera.es/wp-content/uploads/2020/06/PERFIL-VACIO.png" alt="profile"></img>
                    </Space>
                  </a>
                </Dropdown> :
                null
              }
            </div>
            <RiShoppingCartLine onClick={() => { isAuthenticated || cookieId ? setShoppingCartRender(!shoppingCartRender) : handleLoginClick() }} className={!isAuthenticated && !cookieId ? "cartAux" : "cart"} />
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
