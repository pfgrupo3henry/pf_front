import React, { useState } from "react";
import { CardElement } from "../Card/card";
import { Slider } from "../Slider/Slider";
import {
  Menu,
  FloatButton,
  Pagination,
  Alert,
  Divider,
  Modal,
  Icon,
} from "antd";
import "../FilterHome/filterHome.css";
import "./Home.css";
import "../Pagination/pagination.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { filterCards, setNameFilter } from "../../Redux/Actions/Index";
import OrderMenu from "../OrderMenu/OrderMenu";
import Cookies from "universal-cookie";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { MessageTwoTone, PhoneTwoTone, SmileTwoTone } from "@ant-design/icons";
import RatingWeb from "../RatingWeb/RatingWeb";
import Chatty from "../Chatbot/Chatty";

function Home(label, key, icon, children, type) {
  const { logout } = useAuth0();

  function eliminarCookies() {
    document.cookie.split(";").forEach(function (c) {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });
    logout().then((res) => {
      window.location.href = "/";
    });
  }

  const Swal = require("sweetalert2");

  const cookie = new Cookies();
  const cookieStatus = cookie.get("status");
  const cookieId = cookie.get("id");
  console.log(cookieStatus);

  if (cookieStatus === "Disabled") {
    Swal.fire({
      title: "Error!",
      text: "Usuario Bloqueado",
      icon: "error",
      confirmButtonText: "Ok",
    }).then((res) => {
      eliminarCookies();
    });
  }

  const cards = useSelector((state) => state.cards);
  const filteredVideogames = useSelector((state) => state.filteredCards);
  const filterName = useSelector((state) => state.nameFilter);
  const dispatch = useDispatch();

  const [card, setCard] = useState([]);
  const [items, setItems] = useState([]);

  const [current, setCurrent] = useState(1);
  const onChange = (page) => {
    console.log(page);
    setCurrent(page);
    updateElementsToShow(page);
  };

  const pageSize = 8; // Cantidad de elementos por página
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(pageSize);

  const updateElementsToShow = (page) => {
    const newStartIndex = (page - 1) * pageSize;
    const newEndIndex = newStartIndex + pageSize;
    setStartIndex(newStartIndex);
    setEndIndex(newEndIndex);
    setItems(
      filteredVideogames && filteredVideogames.length
        ? filteredVideogames.slice(newStartIndex, newEndIndex)
        : []
    );
  };

  axios
    .get("https://pfservidor-production.up.railway.app/user/all-users")
    .then((res) => {
      console.log(res);
      const filterUser = res.data.filter((user) => {
        return Number(user.id) === Number(cookieId);
      });
      console.log(filterUser);
      if (filterUser[0].status === "Disabled") {
        Swal.fire({
          title: "Error!",
          text: "Usuario Bloqueado",
          icon: "error",
          confirmButtonText: "Ok",
        }).then((res) => {
          eliminarCookies();
        });
      }
    })
    .catch((err) => console.log(err));

  //------------------------------Filtros----------------------------------------------------

  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }
  const items2 = [
    getItem("Ver todos", "All", null),
    getItem("PS3", "PS3", null, [
      getItem("Acción", "1"),
      getItem("Aventura", "2"),
      getItem("Combos", "3"),
      getItem("Conducción", "4"),
      getItem("Deportes", "5"),
      getItem("Estrategia", "6"),
      getItem("Infantiles", "7"),
      getItem("Multijugador", "8"),
      getItem("Rol", "9"),
    ]),
    getItem("PS4", "PS4", null, [
      getItem("Acción", "10"),
      getItem("Aventura", "11"),
      getItem("Combos", "12"),
      getItem("Conducción", "13"),
      getItem("Deportes", "14"),
      getItem("Estrategia", "15"),
      getItem("Infantiles", "16"),
      getItem("Multijugador", "17"),
      getItem("Rol", "18"),
    ]),
    getItem("PS5", "PS5", null, [
      getItem("Acción", "19"),
      getItem("Aventura", "20"),
      getItem("Combos", "21"),
      getItem("Conducción", "22"),
      getItem("Deportes", "23"),
      getItem("Estrategia", "24"),
      getItem("Infantiles", "25"),
      getItem("Multijugador", "26"),
      getItem("Rol", "27"),
    ]),
  ];

  // const rootSubmenuKeys = ["sub1", "sub2", "sub3"];
  const rootSubmenuKeys = ["PS3", "PS4", "PS5"];
  const [openKeys, setOpenKeys] = useState(["All"]);

  const onOpenChange = (keys) => {
    console.log(keys);
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  function eliminarDiacriticos(cadena) {
    return cadena.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  const onClick = (e) => {
    console.log(e);
    console.log(e.domEvent.target.innerHTML);
    console.log(e.keyPath[1]);

    if (cards && cards.length) {
      if (e.keyPath[0] === "All") {
        dispatch(setNameFilter(""));
        dispatch(filterCards(cards));
        setOpenKeys(["All"]);
        // console.log('all cards');
      } else {
        dispatch(setNameFilter(""));
        const videojuegosFiltrados = cards.filter((el) => {
          return (
            eliminarDiacriticos(el.genre.toLowerCase()) ===
            eliminarDiacriticos(e.domEvent.target.innerHTML.toLowerCase()) &&
            el.platform === e.keyPath[1]
          );
        });
        dispatch(filterCards(videojuegosFiltrados));
      }
    }
  };

  const handleWWClick = () => {
    window.open("https://wa.me/5492213164508");
  };

  React.useEffect(() => {
    setCurrent(1);
    updateElementsToShow(1);
  }, [filteredVideogames]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  if (card) {
    return (
      <div className="home-component">
        <Slider />
        <div className="homeContainerUltraMega">
          <div className="filterHome">
            <Menu
              mode="inline"
              onClick={onClick}
              openKeys={openKeys}
              onOpenChange={onOpenChange}
              style={{
                width: 256,
              }}
              items={items2}
            />
            <OrderMenu />
          </div>
          <div className="link-float-button">
            <FloatButton.Group>
              <FloatButton
                onClick={handleWWClick}
                tooltip="Consulta con nosotros!"
                icon={<PhoneTwoTone twoToneColor="#39F805" />}
              />
              <Divider type="vertical" />
              <Link to="/ratingWeb" element={<RatingWeb />}>
                <FloatButton
                  tooltip="Califica la Web!"
                  icon={<SmileTwoTone twoToneColor="#39F805" />}
                />
              </Link>
              <Divider type="vertical" />
              <FloatButton
                tooltip="Chatea con Henry!"
                onClick={showModal}
                icon={<MessageTwoTone twoToneColor="#39F805" />}></FloatButton>
              <div className="modal-container">
                <Modal
                  className="modal"
                  open={isModalVisible}
                  onCancel={handleCancel}
                  footer={null}>
                  <Chatty />
                </Modal>
              </div>
            </FloatButton.Group>
          </div>
          <div className="containerExtreme">
            {items.length === 0 ? (
              <div className="alert-home">
                <Alert
                  message="Por el momento no tenemos juegos de este genero"
                  description="Ni bien tengamos disponibilidad les estaremos comunicando"
                  type="info"
                  showIcon
                />
              </div>
            ) : (
              <div className="listCards">
                {items.map((e, i) => (
                  <CardElement
                    key={i}
                    title={e.name}
                    imgProvisoria={e.img[0]}
                    description="DIGITAL"
                    descriptionComplete={e.description}
                    price={e.price}
                    quantity={e.stock}
                    id={e.id}
                  />
                ))}
              </div>
            )}
            <div className="paginationHomeStyle">
              <Pagination
                current={current}
                onChange={onChange}
                total={filteredVideogames.length}
                pageSize={pageSize}
                showSizeChanger={false}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export { Home };
