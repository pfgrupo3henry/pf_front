import React from "react";
import "./nav.css";
import { Logout } from "../Auth0/logut";
import { Profile } from "../Auth0/profile";
import { useAuth0 } from "@auth0/auth0-react";
import SearchBar from "../SearchBar/SearchBar";
import { Link } from "react-router-dom";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, message, Space } from "antd";
import Cookies from "universal-cookie";
import { useSelector, useDispatch } from "react-redux";
import ShoppingCart from "../DropdownShoppingCart/ShoppingCart";

function Nav(count) {
  const Swal = require("sweetalert2");
  const [shoppingCartRender, setShoppingCartRender] = React.useState(false);
  const { isAuthenticated, loginWithPopup } = useAuth0();
  const shoppingChart = useSelector((state) => state.shoppingChart);
  const dispatch = useDispatch();
  const cookie = new Cookies();
  const cookieId = cookie.get("id");
  const cookieRole = cookie.get("role");
  const cookieImg = cookie.get("img");

  console.log(cookieRole);
  console.log(cookieId);

  const inboxOptions = [
    {
      label: (
        <Link to="/contact" className="rutasNav">
          Contacto
        </Link>
      ),
      key: "1",
    },
    {
      label: (
        <Link to="/equipo" className="rutasNav">
          Equipo de desarrollo
        </Link>
      ),
      key: "2",
    },
    {
      label: (
        <Link to="/nosotros" className="rutasNav">
          Nosotros
        </Link>
      ),
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
  const profileOptionsAdmin = [
    {
      label: <Link to="/profile">Profile</Link>,
      key: "1",
    },
    {
      label: <Link to="/favorites">Favorites</Link>,
      key: "2",
    },
    {
      label: <Link to="admin">Admin</Link>,
      key: "3",
    },
    {
      label: <Logout />,
      key: "4",
    },
  ];

  if (shoppingChart) {
    return (
      <div
        className={`nav-component ${isAuthenticated || cookieId ? "nav" : "navAux"
          }`}>
        <div className="rutasNavContainer">
          <ul>
            <li
              className={
                isAuthenticated || cookieId
                  ? "rutasNavAlternativeAux"
                  : "rutasNav"
              }>
              <Link to="/home" className="rutasNav">
                Home
              </Link>
            </li>
            {isAuthenticated || cookieId ? null : (
              <li
                className={
                  isAuthenticated || cookieId
                    ? "rutasNavAlternativeAux2"
                    : "rutasNavAux"
                }>
                <Link to="/login" className="rutasNav">
                  Login
                </Link>
              </li>
            )}
            <li>
              <Dropdown
                className={
                  isAuthenticated || cookieId
                    ? "rutasNav2Aux"
                    : "rutasNav2AuxUltimate"
                }
                menu={{
                  items: inboxOptions,
                }}>
                <a onClick={(e) => e.preventDefault()}>
                  <Space>
                    Conozcanos
                    <DownOutlined />
                  </Space>
                </a>
              </Dropdown>
            </li>
            <li
              className={
                isAuthenticated || cookieId ? "buscadorAux" : "buscador"
              }>
              <SearchBar />
            </li>
          </ul>
          <div
            className={
              isAuthenticated || cookieId
                ? "rutasNavAlternativeAux"
                : "rutasNav"
            }></div>
          <div className="rutasNav3">
            <div className="profileNav">
              <div>

                {cookieRole === "Admin" && !isAuthenticated ? (
                  <Dropdown
                    className=""
                    menu={{
                      items: profileOptionsAdmin,
                    }}>
                    <a onClick={(e) => e.preventDefault()}>
                      <Space>
                        <img
                          className="imgProfile"
                          src={cookieImg ? cookieImg : "https://www.delacabeza-rivera.es/wp-content/uploads/2020/06/PERFIL-VACIO.png"}
                          alt="profile"></img>
                      </Space>
                    </a>
                  </Dropdown>
                ) :
                  null}

                {cookieRole === "Admin" && isAuthenticated ? (
                  <Dropdown
                    className=""
                    menu={{
                      items: profileOptionsAdmin,
                    }}>
                    <a onClick={(e) => e.preventDefault()}>
                      <Space>
                        <Profile />
                      </Space>
                    </a>
                  </Dropdown>
                ) :
                  null}

                {!isAuthenticated && cookieId && cookieRole !== "Admin" ?
                  <Dropdown
                    className=""
                    menu={{
                      items: profileOptions,
                    }}>
                    <a onClick={(e) => e.preventDefault()}>
                      <Space>
                        <img
                          className="imgProfile"
                          src={cookieImg ? cookieImg : "https://www.delacabeza-rivera.es/wp-content/uploads/2020/06/PERFIL-VACIO.png"}
                          alt="profile"></img>
                      </Space>
                    </a>
                  </Dropdown>
                  :
                  null}

                {cookieRole !== "Admin" && isAuthenticated ?
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
                  </Dropdown>
                  :
                  null}

              </div>
              <ShoppingCart />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export { Nav };
