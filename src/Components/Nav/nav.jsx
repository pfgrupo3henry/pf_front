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
import { Dropdown, message, Space, Badge } from "antd";
import Cookies from "universal-cookie";
import axios from "axios";
import { addItemToChart } from "../../Redux/Actions/Index";
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";




function Nav(count) {

  const [shoppingCartRender, setShoppingCartRender] = React.useState(false)
  const cookie = new Cookies();
  const cookieId = cookie.get("firstname");
  const [products, setProducts] = useState([]);
  const { user, isAuthenticated, isLoading, loginWithPopup } = useAuth0();
  const [idUserAUth0, setIdUserAuth0] = useState([]);
  const [idManuelUser, setIdManuelUser] = useState("");
  const [string, setString] = useState("hola");
  const shoppingChart = useSelector(state => state.shoppingChart);
  const dispatch = useDispatch();


  if (isAuthenticated) {

    if (user && idUserAUth0.length === 0) {

      const emailAuth0 = user.email;

      if (idUserAUth0.length === 0) {

        axios.get(`https://pfservidor-production.up.railway.app/user/${emailAuth0}`)
          .then((res) => {
            console.log(res.data);
            setIdUserAuth0([res.data]);
          })
          .catch((err) => console.log(err))

      }

    };

  };

  if (!user) {

    if (idManuelUser === "") {

      const cookie = new Cookies();
      const idCoockie = cookie.get("id");
      console.log(idCoockie);

      setIdManuelUser(idCoockie);

    }

  };


  if (idManuelUser && string === "hola") {

    axios.get(`https://pfservidor-production.up.railway.app/cart/${idManuelUser}`)
      .then((res) => {
        console.log(res.data);
        setProducts([res.data]);
        setString("chau");
      })
      .catch((err) => console.log(err))

  } else if (idUserAUth0.length !== 0 && isAuthenticated && string === "hola") {

    axios.get(`https://pfservidor-production.up.railway.app/cart/${idUserAUth0[0].id}`)
      .then((res) => {
        console.log(res.data);
        setProducts([res.data]);
        setString("chau");
      })
      .catch((err) => console.log(err))

  };

  if (isAuthenticated) {

    const userAuth0 = {
      email: user.email,
      img: ["https://www.delacabeza-rivera.es/wp-content/uploads/2020/06/PERFIL-VACIO.png"]
    }

    axios.post("https://pfservidor-production.up.railway.app/user/auth0", userAuth0)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

  };

  const handleLoginClick = () => {
    loginWithPopup({
      height: 600,
      width: 400,
      timeoutInSeconds: 10,
    }).then((res) => {
      window.location.href = "/home";
    })

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
      label: <Link to="/admin" className="rutasNav">Admin</Link>,
      key: "3",
    },
    {
      label: <Logout />,
      key: "4",
    },
  ];

  console.log(shoppingChart);
  console.log(products);

  if (shoppingChart.products) {

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
              <Badge
                count={shoppingChart.products ? shoppingChart.products.length : "0"}
                size="small"
                style={{ backgroundColor: "#1976D2" }}>
                <RiShoppingCartLine onClick={() => { isAuthenticated || cookieId ? setShoppingCartRender(!shoppingCartRender) : handleLoginClick() }} className={!isAuthenticated && !cookieId ? "cartAux" : "cart"} />
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
      </div>
    );

  } else {

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
              <Badge
                count={products.length ? products[0].products.length : "0"}
                size="small"
                style={{ backgroundColor: "#1976D2" }}>
                <RiShoppingCartLine onClick={() => { isAuthenticated || cookieId ? setShoppingCartRender(!shoppingCartRender) : handleLoginClick() }} className={!isAuthenticated && !cookieId ? "cartAux" : "cart"} />
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
      </div>
    )

  };

};

export { Nav };
