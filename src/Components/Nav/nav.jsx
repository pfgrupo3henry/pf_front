import React from "react";
import "./nav.css";
import { Logout } from "../Auth0/logut";
import { Profile } from "../Auth0/profile";
import { useAuth0 } from "@auth0/auth0-react";
import SearchBar from "../SearchBar/SearchBar";
import { Link } from "react-router-dom";
import { RiShoppingCartLine } from "react-icons/ri";
import DropdownShoppingCart from "../DropdownShoppingCart/DropdownShoppingCart";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, message, Space, Badge } from "antd";
import Cookies from "universal-cookie";
import { useSelector, useDispatch } from "react-redux";




function Nav(count) {

  const Swal = require('sweetalert2');
  const [shoppingCartRender, setShoppingCartRender] = React.useState(false)
  const { isAuthenticated, loginWithPopup } = useAuth0();
  const shoppingChart = useSelector(state => state.shoppingChart);
  const dispatch = useDispatch();
  const cookie = new Cookies();
  const cookieId = cookie.get("firstname");
  const cookieRole = cookie.get("role");

  console.log(cookieRole);

  const handleLoginClick = () => {
    Swal.fire({
      title: "Error!",
      text: 'Debes iniciar sesion',
      icon: "error",
      confirmButtonText: 'Ok'
    }).then((res) => {
      window.location.href = "/login";
    });

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

  if (shoppingChart) {

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
            {cookieRole === "Admin" ?
              < li className={isAuthenticated || cookieId ? "rutasNavAlternativeAux" : "rutasNav"}>
                <Link to="/admin" className="rutasNav">Admin</Link>
              </li>
              :
              null
            }
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
                {cookieId && !isAuthenticated ?
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
              <Badge
                count={shoppingChart.products ? shoppingChart.products.length : "0"}
                size="small"
                style={{ backgroundColor: "#1976D2" }}>
                  <div className="carritoAuxiliar77">
                <RiShoppingCartLine
                
                 onClick={() => { isAuthenticated || cookieId ? setShoppingCartRender(!shoppingCartRender) : handleLoginClick() }} className={!isAuthenticated && !cookieId ? "cartAux" : "cart"} />
                 </div>
              </Badge>
            </div>

          </div>
          {
            shoppingCartRender
              ?
              <DropdownShoppingCart />
              : null
          }
        </div>
      </div >
    );

  }

};

export { Nav };
