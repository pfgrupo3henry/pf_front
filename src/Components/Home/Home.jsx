import React from "react";
import { useState, useEffect } from "react";
//import { Pagination } from 'antd';
import { CardElement } from "../Card/card";
//import { FilterHome } from "../FilterHome/filterHome"
import { Slider } from "../Slider/Slider";
import { Menu, Button } from "antd";
//import imgProvisoria from "../Assets/god-of-war-ragnarok-ps5-retro.jpg";
//import imgProvisoria2 from "../Assets/a-way-out-ps5-retro.jpg";
import arrayAux from "../../Data/Data";
import "../FilterHome/filterHome.css";
import "./Home.css";
import "../Pagination/pagination.css";

function Home(label, key, icon, children, type) {
  useEffect(() => {
    setCard([...arrayAux]);
    setItems([...elementsToShow]);
  }, []);
  const [card, setCard] = useState([]);
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  var ITEMS_PER_PAGE = 8;

  /*
    const [current, setCurrent] = useState(1);
    const onChange = (page) => {
        console.log(page);
        setCurrent(page);
    };
    const pageSize = 8; // Cantidad de elementos por página
    const startIndex = (current - 1) * pageSize;
    const endIndex = startIndex + pageSize;*/
  const elementsToShow = arrayAux.slice(0, ITEMS_PER_PAGE);

  const nextHandler = () => {
    try {
      const totalElementos = card.length;

      const nextPage = currentPage + 1;

      const firstIndex = nextPage * ITEMS_PER_PAGE;

      if (
        nextPage >= totalElementos / ITEMS_PER_PAGE ||
        items.length >= 9 ||
        items.length <= 7
      )
        return;

      setItems([...card].splice(firstIndex, ITEMS_PER_PAGE));
      setCurrentPage(nextPage);
    } catch (error) {
      console.log(error);
    }
  };

  const prevHandler = () => {
    const prevPage = currentPage - 1;

    if (items.length !== 3) {
      if (prevPage < 0 || items.length >= 9 || items.length <= 7) return;
    }

    const firstIndex = prevPage * ITEMS_PER_PAGE;

    setItems([...card].splice(firstIndex, ITEMS_PER_PAGE));
    setCurrentPage(prevPage);
  };

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
    getItem("See All", "sub4", null),
    getItem("PS3", "sub1", null, [
      getItem("Accion", "1"),
      getItem("Aventura", "2"),
      getItem("Deportes", "3"),
      getItem("Multijugador", "4"),
    ]),
    getItem("PS4", "sub2", null, [
      getItem("Accion", "5"),
      getItem("Aventura", "6"),
      getItem("Deportes", "7"),
      getItem("Multijugador", "8"),
    ]),
    getItem("PS5", "sub3", null, [
      getItem("Accion", "9"),
      getItem("Aventura", "10"),
      getItem("Deportes", "11"),
      getItem("Multijugador", "12"),
    ]),
  ];

  const rootSubmenuKeys = ["sub1", "sub2", "sub3", "sub4"];

  const [openKeys, setOpenKeys] = useState(["sub1"]);
  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  const onClick = (e) => {
    console.log("click ", e);

    if (e.key === "1") {
      let PS3 = card.filter((card) => {
        return card.platform.includes("PS3");
      });
      setItems(
        [...PS3].filter((card) => {
          return card.genre.includes("Acción");
        })
      );
      setCurrentPage(0);
    }
    if (e.key === "2") {
      let PS3 = card.filter((card) => {
        return card.platform.includes("PS3");
      });
      setItems(
        [...PS3].filter((card) => {
          return card.genre.includes("Aventura");
        })
      );
      setCurrentPage(0);
    }
    if (e.key === "3") {
      let PS3 = card.filter((card) => {
        return card.platform.includes("PS3");
      });
      setItems(
        [...PS3].filter((card) => {
          return card.genre.includes("Combos");
        })
      );
      setCurrentPage(0);
    }
    if (e.key === "4") {
      let PS3 = card.filter((card) => {
        return card.platform.includes("PS3");
      });
      setItems(
        [...PS3].filter((card) => {
          return card.genre.includes("Conducción");
        })
      );
      setCurrentPage(0);
    }
    if (e.key === "5") {
      let PS3 = card.filter((card) => {
        return card.platform.includes("PS3");
      });
      setItems(
        [...PS3].filter((card) => {
          return card.genre.includes("Deportes");
        })
      );
      setCurrentPage(0);
    }
    if (e.key === "6") {
      let PS3 = card.filter((card) => {
        return card.platform.includes("PS3");
      });
      setItems(
        [...PS3].filter((card) => {
          return card.genre.includes("Estrategia");
        })
      );
      setCurrentPage(0);
    }
    if (e.key === "7") {
      let PS3 = card.filter((card) => {
        return card.platform.includes("PS3");
      });
      setItems(
        [...PS3].filter((card) => {
          return card.genre.includes("Infantiles");
        })
      );
      setCurrentPage(0);
    }
    if (e.key === "8") {
      let PS3 = card.filter((card) => {
        return card.platform.includes("PS3");
      });
      setItems(
        [...PS3].filter((card) => {
          return card.genre.includes("Multijugador");
        })
      );
      setCurrentPage(0);
    }
    if (e.key === "9") {
      let PS3 = card.filter((card) => {
        return card.platform.includes("PS3");
      });
      setItems(
        [...PS3].filter((card) => {
          return card.genre.includes("Rol");
        })
      );
      setCurrentPage(0);
    }
    //ps4
    if (e.key === "10") {
      let PS4 = card.filter((card) => {
        return card.platform.includes("PS4");
      });
      setItems(
        [...PS4].filter((card) => {
          return card.genre.includes("Acción");
        })
      );
      setCurrentPage(0);
    }
    if (e.key === "11") {
      let PS4 = card.filter((card) => {
        return card.platform.includes("PS4");
      });
      setItems(
        [...PS4].filter((card) => {
          return card.genre.includes("Aventura");
        })
      );
      setCurrentPage(0);
    }
    if (e.key === "12") {
      let PS4 = card.filter((card) => {
        return card.platform.includes("PS4");
      });
      setItems(
        [...PS4].filter((card) => {
          return card.genre.includes("Combos");
        })
      );
      setCurrentPage(0);
    }
    if (e.key === "13") {
      let PS4 = card.filter((card) => {
        return card.platform.includes("PS4");
      });
      setItems(
        [...PS4].filter((card) => {
          return card.genre.includes("Conducción");
        })
      );
      setCurrentPage(0);
    }
    if (e.key === "14") {
      let PS4 = card.filter((card) => {
        return card.platform.includes("PS4");
      });
      setItems(
        [...PS4].filter((card) => {
          return card.genre.includes("Deportes");
        })
      );
      setCurrentPage(0);
    }
    if (e.key === "15") {
      let PS4 = card.filter((card) => {
        return card.platform.includes("PS4");
      });
      setItems(
        [...PS4].filter((card) => {
          return card.genre.includes("Estrategia");
        })
      );
      setCurrentPage(0);
    }
    if (e.key === "16") {
      let PS4 = card.filter((card) => {
        return card.platform.includes("PS4");
      });
      setItems(
        [...PS4].filter((card) => {
          return card.genre.includes("Infantiles");
        })
      );
      setCurrentPage(0);
    }
    if (e.key === "17") {
      let PS4 = card.filter((card) => {
        return card.platform.includes("PS4");
      });
      setItems(
        [...PS4].filter((card) => {
          return card.genre.includes("Multijugador");
        })
      );
      setCurrentPage(0);
    }
    if (e.key === "18") {
      let PS4 = card.filter((card) => {
        return card.platform.includes("PS4");
      });
      setItems(
        [...PS4].filter((card) => {
          return card.genre.includes("Rol");
        })
      );
      setCurrentPage(0);
    }
    //ps5
    if (e.key === "19") {
      let PS5 = card.filter((card) => {
        return card.platform.includes("PS5");
      });
      setItems(
        [...PS5].filter((card) => {
          return card.genre.includes("Acción");
        })
      );
      setCurrentPage(0);
    }
    if (e.key === "20") {
      let PS5 = card.filter((card) => {
        return card.platform.includes("PS5");
      });
      setItems(
        [...PS5].filter((card) => {
          return card.genre.includes("Aventura");
        })
      );
      setCurrentPage(0);
    }
    if (e.key === "21") {
      let PS5 = card.filter((card) => {
        return card.platform.includes("PS5");
      });
      setItems(
        [...PS5].filter((card) => {
          return card.genre.includes("Combos");
        })
      );
      setCurrentPage(0);
    }
    if (e.key === "22") {
      let PS5 = card.filter((card) => {
        return card.platform.includes("PS5");
      });
      setItems(
        [...PS5].filter((card) => {
          return card.genre.includes("Conducción");
        })
      );
      setCurrentPage(0);
    }
    if (e.key === "23") {
      let PS5 = card.filter((card) => {
        return card.platform.includes("PS5");
      });
      setItems(
        [...PS5].filter((card) => {
          return card.genre.includes("Deportes");
        })
      );
      setCurrentPage(0);
    }
    if (e.key === "24") {
      let PS5 = card.filter((card) => {
        return card.platform.includes("PS5");
      });
      setItems(
        [...PS5].filter((card) => {
          return card.genre.includes("Estrategia");
        })
      );
      setCurrentPage(0);
    }
    if (e.key === "25") {
      let PS5 = card.filter((card) => {
        return card.platform.includes("PS5");
      });
      setItems(
        [...PS5].filter((card) => {
          return card.genre.includes("Infantiles");
        })
      );
      setCurrentPage(0);
    }
    if (e.key === "26") {
      let PS5 = card.filter((card) => {
        return card.platform.includes("PS5");
      });
      setItems(
        [...PS5].filter((card) => {
          return card.genre.includes("Multijugador");
        })
      );
      setCurrentPage(0);
    }
    if (e.key === "27") {
      let PS5 = card.filter((card) => {
        return card.platform.includes("PS5");
      });
      setItems(
        [...PS5].filter((card) => {
          return card.genre.includes("Rol");
        })
      );
      setCurrentPage(0);
    }
    //mostrat todos
    if (e.key === "sub4") {
      setItems([...elementsToShow]);
      setCurrentPage(0);
    }
  };

  console.log(items);

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
          </div>
          <div className="containerExtreme">
            <div className="listCards">
              {items.map((e, i) => (
                <CardElement
                  key={i}
                  title={e.title}
                  imgProvisoria={e.img[0]}
                  description="DIGITAL"
                  descriptionComplete={e.description}
                  price={e.price}
                  id={e.id}
                />
              ))}
            </div>
            <div className="paginationHomeStyle">
              <Button onClick={prevHandler}>Prev</Button>
              <p className="current-page">{currentPage}</p>
              <Button onClick={nextHandler}>Next</Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export { Home };

//linea de codigo al pedo
