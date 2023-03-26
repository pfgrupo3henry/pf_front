import React from "react";
import { useState } from 'react';
import { Pagination } from 'antd';
import { PaginationHome } from "../Pagination/pagination";
import { CardElement } from "../Card/card";
//import { FilterHome } from "../FilterHome/filterHome"
import { Slider } from "../Slider/Slider";
import { Menu, Button } from "antd";
//import imgProvisoria from "../Assets/god-of-war-ragnarok-ps5-retro.jpg";
//import imgProvisoria2 from "../Assets/a-way-out-ps5-retro.jpg";
import "../FilterHome/filterHome.css";
import "./Home.css";
import "../Pagination/pagination.css";
import axios from "axios";
import { Link } from 'react-router-dom';


function Home(label, key, icon, children, type) {

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
        setItems(card.slice(newStartIndex, newEndIndex));
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
        getItem("See All", "28", null),
        getItem("PS3", "sub1", null, [
            getItem("Accion", "1"),
            getItem("Aventura", "2"),
            getItem("Combos", "3"),
            getItem("Conducción", "4"),
            getItem("Deportes", "5"),
            getItem("Estrategia", "6"),
            getItem("Infantiles", "7"),
            getItem("Multijugador", "8"),
            getItem("Rol", "9"),
        ]),
        getItem("PS4", "sub2", null, [
            getItem("Accion", "10"),
            getItem("Aventura", "11"),
            getItem("Combos", "12"),
            getItem("Conducción", "13"),
            getItem("Deportes", "14"),
            getItem("Estrategia", "15"),
            getItem("Infantiles", "16"),
            getItem("Multijugador", "17"),
            getItem("Rol", "18"),
        ]),
        getItem("PS5", "sub3", null, [
            getItem("Accion", "19"),
            getItem("Aventura", "20"),
            getItem("Combos", "21"),
            getItem("Conducción", "22"),
            getItem("Deportes", "23"),
            getItem("Estrategia", "24"),
            getItem("Infantiles", "25"),
            getItem("Multijugador", "26"),
            getItem("Rol", "27"),
        ])
    ];

    const rootSubmenuKeys = ["sub1", "sub2", "sub3"];

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
        // Filtros PS3 -----------------
        if (e.key === "1") {

            let PS3 = card.filter((card) => {
                return card.platform.includes("PS3")
            })

            setItems([...PS3].filter((card) => {
                return card.genre.includes("Acción")
            }))

            setCurrent(1);
        }
        if (e.key === "2") {

            let PS3 = card.filter((card) => {
                return card.platform.includes("PS3")
            })

            setItems([...PS3].filter((card) => {
                return card.genre.includes("Aventura")
            }))

            setCurrent(1);

        }
        if (e.key === "3") {

            let PS3 = card.filter((card) => {
                return card.platform.includes("PS3")
            })

            setItems([...PS3].filter((card) => {
                return card.genre.includes("Combos")
            }))

            setCurrent(1);

        }
        if (e.key === "4") {

            let PS3 = card.filter((card) => {
                return card.platform.includes("PS3")
            })

            setItems([...PS3].filter((card) => {
                return card.genre.includes("Conducción")
            }))

            setCurrent(1);

        }
        if (e.key === "5") {

            let PS3 = card.filter((card) => {
                return card.platform.includes("PS3")
            })

            setItems([...PS3].filter((card) => {
                return card.genre.includes("Deportes")
            }))

            setCurrent(1);

        }
        if (e.key === "6") {

            let PS3 = card.filter((card) => {
                return card.platform.includes("PS3")
            })

            setItems([...PS3].filter((card) => {
                return card.genre.includes("Estrategia")
            }))

            setCurrent(1);
        }
        if (e.key === "7") {

            let PS3 = card.filter((card) => {
                return card.platform.includes("PS3")
            })

            setItems([...PS3].filter((card) => {
                return card.genre.includes("Infantiles")
            }))

            setCurrent(1);
        }
        if (e.key === "8") {

            let PS3 = card.filter((card) => {
                return card.platform.includes("PS3")
            })

            setItems([...PS3].filter((card) => {
                return card.genre.includes("Multijugador")
            }))

            setCurrent(1);

        }
        if (e.key === "9") {

            let PS3 = card.filter((card) => {
                return card.platform.includes("PS3")
            })

            setItems([...PS3].filter((card) => {
                return card.genre.includes("Rol")
            }))

            setCurrent(1);

        }
        // Filtros PS4 -----------------
        if (e.key === "10") {

            let PS4 = card.filter((card) => {
                return card.platform.includes("PS4")
            })

            setItems([...PS4].filter((card) => {
                return card.genre.includes("Accion")
            }))

            setCurrent(1);

        }
        if (e.key === "11") {

            let PS4 = card.filter((card) => {
                return card.platform.includes("PS4")
            })

            setItems([...PS4].filter((card) => {
                return card.genre.includes("Aventura")
            }))

            setCurrent(1);

        }
        if (e.key === "12") {

            let PS4 = card.filter((card) => {
                return card.platform.includes("PS4")
            })

            setItems([...PS4].filter((card) => {
                return card.genre.includes("Combos")
            }))

            setCurrent(1);

        }
        if (e.key === "13") {

            let PS4 = card.filter((card) => {
                return card.platform.includes("PS4")
            })

            setItems([...PS4].filter((card) => {
                return card.genre.includes("Conducción")
            }))

            setCurrent(1);

        }
        if (e.key === "14") {

            let PS4 = card.filter((card) => {
                return card.platform.includes("PS4")
            })

            setItems([...PS4].filter((card) => {
                return card.genre.includes("Deportes")
            }))

            setCurrent(1);

        }
        if (e.key === "15") {

            let PS4 = card.filter((card) => {
                return card.platform.includes("PS4")
            })

            setItems([...PS4].filter((card) => {
                return card.genre.includes("Estrategia")
            }))

            setCurrent(1);

        }
        if (e.key === "16") {

            let PS4 = card.filter((card) => {
                return card.platform.includes("PS4")
            })

            setItems([...PS4].filter((card) => {
                return card.genre.includes("Infantiles")
            }))

            setCurrent(1);

        }
        if (e.key === "17") {

            let PS4 = card.filter((card) => {
                return card.platform.includes("PS4")
            })

            setItems([...PS4].filter((card) => {
                return card.genre.includes("Multijugador")
            }))

            setCurrent(1);

        }
        if (e.key === "18") {

            let PS4 = card.filter((card) => {
                return card.platform.includes("PS4")
            })

            setItems([...PS4].filter((card) => {
                return card.genre.includes("Rol")
            }))

            setCurrent(1);

        }
        // Filtros PS5 -----------------
        if (e.key === "19") {

            let PS5 = card.filter((card) => {
                return card.platform.includes("PS5")
            })

            setItems([...PS5].filter((card) => {
                return card.genre.includes("Accion")
            }))

            setCurrent(1);

        }
        if (e.key === "20") {

            let PS5 = card.filter((card) => {
                return card.platform.includes("PS5")
            })

            setItems([...PS5].filter((card) => {
                return card.genre.includes("Aventura")
            }))

            setCurrent(1);

        }
        if (e.key === "21") {

            let PS5 = card.filter((card) => {
                return card.platform.includes("PS5")
            })

            setItems([...PS5].filter((card) => {
                return card.genre.includes("Combos")
            }))

            setCurrent(1);

        }
        if (e.key === "22") {

            let PS5 = card.filter((card) => {
                return card.platform.includes("PS5")
            })

            setItems([...PS5].filter((card) => {
                return card.genre.includes("Conducción")
            }))

            setCurrent(1);

        }
        if (e.key === "23") {

            let PS5 = card.filter((card) => {
                return card.platform.includes("PS5")
            })

            setItems([...PS5].filter((card) => {
                return card.genre.includes("Deportes")
            }))

            setCurrent(1);

        }
        if (e.key === "24") {

            let PS5 = card.filter((card) => {
                return card.platform.includes("PS5")
            })

            setItems([...PS5].filter((card) => {
                return card.genre.includes("Estrategia")
            }))

            setCurrent(1);

        }
        if (e.key === "25") {

            let PS5 = card.filter((card) => {
                return card.platform.includes("PS5")
            })

            setItems([...PS5].filter((card) => {
                return card.genre.includes("Infantiles")
            }))

            setCurrent(1);

        }
        if (e.key === "26") {

            let PS5 = card.filter((card) => {
                return card.platform.includes("PS5")
            })

            setItems([...PS5].filter((card) => {
                return card.genre.includes("Multijugador")
            }))

            setCurrent(1);

        }
        if (e.key === "27") {

            let PS5 = card.filter((card) => {
                return card.platform.includes("PS5")
            })

            setItems([...PS5].filter((card) => {
                return card.genre.includes("Rol")
            }))

            setCurrent(1);

        }
        // Ver todos los juegos -----------------
        if (e.key === "28") {

            setItems([...card].slice(0, 8));

            setCurrent(1);

        }
    };


    // ------------------------------ axios ---------------------------------------

    if (items.length === 0 && card.length === 0) {

        axios.get("https://pfservidor-production.up.railway.app/videogames")
            .then((res) => {
                console.log(res.data)
                setCard([...res.data])
                setItems([...res.data].slice(0, 8))

            })
            .catch((err) => console.log(err))

    };


    if (card) {

        const total = card.length;
        return (

            <div className="home-component">
                <Slider />
                <div className="homeContainerUltraMega">
                    <div className="filterHome" >
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
                                <Link to={"/game/" + e.id}>
                                    <CardElement
                                        key={i}
                                        title={e.title}
                                        imgProvisoria={e.img[0]}
                                        description="DIGITAL"
                                        descriptionComplete={e.description}
                                        price={e.price}
                                        id={e.id}
                                    />
                                </Link>
                            ))}
                        </div>
                        <div className="paginationHomeStyle" >
                            <Pagination
                                current={current}
                                onChange={onChange}
                                total={card.length}
                                pageSize={pageSize}
                                showSizeChanger={false} />
                        </div>
                    </div>
                </div>
            </div>

        );

    }

};

export { Home }