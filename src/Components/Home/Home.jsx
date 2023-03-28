import React from "react";
import { useState } from "react";
import { Pagination, Alert, Typography } from "antd";
import OrderMenu from "../OrderMenu/OrderMenu";
import { CardElement } from "../Card/card";
import { Slider } from "../Slider/Slider";
import { Menu } from "antd";
import "../FilterHome/filterHome.css";
import "./Home.css";
import "../Pagination/pagination.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { filterCards, setNameFilter } from "../../Redux/Actions/Index";

function Home(label, key, icon, children, type) {
  const cards = useSelector((state) => state.cards);
  const filteredVideogames = useSelector((state) => state.filteredCards);
  const filterName = useSelector((state) => state.nameFilter);
  const [loading, setLoading] = useState(true);

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

  //*******************ordenamiento********************************** */
  const { Text } = Typography;

  //*******************ordenamiento********************************** */

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
    getItem("See All", "All", null),
    getItem("PS3", "PS3", null, [
      getItem("Action", "1"),
      getItem("Adventure", "2"),
      getItem("Combos", "3"),
      getItem("Driving", "4"),
      getItem("Sports", "5"),
      getItem("Strategy", "6"),
      getItem("Infantile", "7"),
      getItem("Multiplayer", "8"),
      getItem("Role", "9"),
    ]),
    getItem("PS4", "PS4", null, [
      getItem("Action", "10"),
      getItem("Adventure", "11"),
      getItem("Combos", "12"),
      getItem("Driving", "13"),
      getItem("Sports", "14"),
      getItem("Strategy", "15"),
      getItem("Infantile", "16"),
      getItem("Multiplayer", "17"),
      getItem("Role", "18"),
    ]),
    getItem("PS5", "PS5", null, [
      getItem("Acción", "19"),
      getItem("Adventure", "20"),
      getItem("Combos", "21"),
      getItem("Driving", "22"),
      getItem("Sports", "23"),
      getItem("Strategy", "24"),
      getItem("Infantile", "25"),
      getItem("Multiplayer", "26"),
      getItem("Role", "27"),
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

  React.useEffect(() => {
    setCurrent(1);
    updateElementsToShow(1);
  }, [filteredVideogames]);

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
                  <a className="link-card">
                    <CardElement
                      key={i}
                      title={e.title}
                      imgProvisoria={e.img[0]}
                      description="DIGITAL"
                      descriptionComplete={e.description}
                      price={e.price}
                      id={e.id}
                    />
                  </a>
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