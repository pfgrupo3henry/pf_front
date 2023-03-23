import React from "react"
import { useState } from 'react';
import { Pagination } from 'antd';
import {CardElement} from "../Card/card";
import {FilterHome} from "../FilterHome/filterHome"
import {Slider} from "../Slider/Slider"

import imgProvisoria from "../Assets/god-of-war-ragnarok-ps5-retro.jpg";
import imgProvisoria2 from "../Assets/a-way-out-ps5-retro.jpg";


import "./Home.css"
import "../Pagination/pagination.css"


function Home (){
    const arrayAux = [
        {title:"God of War Ragnarok ", description:"En esta secuela, Kratos y Atreus iniciarán un viaje mítico en busca de respuestas antes de que llegue Ragnarök. Padre e hijo deberán arriesgarlo todo en cada uno de los Nueve Reinos. A lo largo de impresionantes paisajes mitológicos, se enfrentarán a temibles enemigos, desde dioses nórdicos hasta bestias salvajes", img: imgProvisoria, price: "$2000"},
        {title:"God of War Ragnarok ", description:"En esta secuela, Kratos y Atreus iniciarán un viaje mítico en busca de respuestas antes de que llegue Ragnarök. Padre e hijo deberán arriesgarlo todo en cada uno de los Nueve Reinos. A lo largo de impresionantes paisajes mitológicos, se enfrentarán a temibles enemigos, desde dioses nórdicos hasta bestias salvajes", img: imgProvisoria, price: "$2000"},
        {title:"God of War Ragnarok ", description:"En esta secuela, Kratos y Atreus iniciarán un viaje mítico en busca de respuestas antes de que llegue Ragnarök. Padre e hijo deberán arriesgarlo todo en cada uno de los Nueve Reinos. A lo largo de impresionantes paisajes mitológicos, se enfrentarán a temibles enemigos, desde dioses nórdicos hasta bestias salvajes", img: imgProvisoria, price: "$2000"},
        {title:"God of War Ragnarok ", description:"En esta secuela, Kratos y Atreus iniciarán un viaje mítico en busca de respuestas antes de que llegue Ragnarök. Padre e hijo deberán arriesgarlo todo en cada uno de los Nueve Reinos. A lo largo de impresionantes paisajes mitológicos, se enfrentarán a temibles enemigos, desde dioses nórdicos hasta bestias salvajes", img: imgProvisoria, price: "$2000"},
        {title:"God of War Ragnarok ", description:"En esta secuela, Kratos y Atreus iniciarán un viaje mítico en busca de respuestas antes de que llegue Ragnarök. Padre e hijo deberán arriesgarlo todo en cada uno de los Nueve Reinos. A lo largo de impresionantes paisajes mitológicos, se enfrentarán a temibles enemigos, desde dioses nórdicos hasta bestias salvajes", img: imgProvisoria, price: "$2000"},
        {title:"God of War Ragnarok ", description:"En esta secuela, Kratos y Atreus iniciarán un viaje mítico en busca de respuestas antes de que llegue Ragnarök. Padre e hijo deberán arriesgarlo todo en cada uno de los Nueve Reinos. A lo largo de impresionantes paisajes mitológicos, se enfrentarán a temibles enemigos, desde dioses nórdicos hasta bestias salvajes", img: imgProvisoria, price: "$2000"},
        {title:"God of War Ragnarok ", description:"En esta secuela, Kratos y Atreus iniciarán un viaje mítico en busca de respuestas antes de que llegue Ragnarök. Padre e hijo deberán arriesgarlo todo en cada uno de los Nueve Reinos. A lo largo de impresionantes paisajes mitológicos, se enfrentarán a temibles enemigos, desde dioses nórdicos hasta bestias salvajes", img: imgProvisoria, price: "$2000"},
        {title:"God of War Ragnarok ", description:"En esta secuela, Kratos y Atreus iniciarán un viaje mítico en busca de respuestas antes de que llegue Ragnarök. Padre e hijo deberán arriesgarlo todo en cada uno de los Nueve Reinos. A lo largo de impresionantes paisajes mitológicos, se enfrentarán a temibles enemigos, desde dioses nórdicos hasta bestias salvajes", img: imgProvisoria2, price: "$2000"},
        {title:"God of War Ragnarok ", description:"En esta secuela, Kratos y Atreus iniciarán un viaje mítico en busca de respuestas antes de que llegue Ragnarök. Padre e hijo deberán arriesgarlo todo en cada uno de los Nueve Reinos. A lo largo de impresionantes paisajes mitológicos, se enfrentarán a temibles enemigos, desde dioses nórdicos hasta bestias salvajes", img: imgProvisoria2, price: "$2000"},
        {title:"God of War Ragnarok ", description:"En esta secuela, Kratos y Atreus iniciarán un viaje mítico en busca de respuestas antes de que llegue Ragnarök. Padre e hijo deberán arriesgarlo todo en cada uno de los Nueve Reinos. A lo largo de impresionantes paisajes mitológicos, se enfrentarán a temibles enemigos, desde dioses nórdicos hasta bestias salvajes", img: imgProvisoria2, price: "$2000"},
        {title:"God of War Ragnarok ", description:"En esta secuela, Kratos y Atreus iniciarán un viaje mítico en busca de respuestas antes de que llegue Ragnarök. Padre e hijo deberán arriesgarlo todo en cada uno de los Nueve Reinos. A lo largo de impresionantes paisajes mitológicos, se enfrentarán a temibles enemigos, desde dioses nórdicos hasta bestias salvajes", img: imgProvisoria2, price: "$2000"},
        {title:"God of War Ragnarok ", description:"En esta secuela, Kratos y Atreus iniciarán un viaje mítico en busca de respuestas antes de que llegue Ragnarök. Padre e hijo deberán arriesgarlo todo en cada uno de los Nueve Reinos. A lo largo de impresionantes paisajes mitológicos, se enfrentarán a temibles enemigos, desde dioses nórdicos hasta bestias salvajes", img: imgProvisoria2, price: "$2000"},
        {title:"God of War Ragnarok ", description:"En esta secuela, Kratos y Atreus iniciarán un viaje mítico en busca de respuestas antes de que llegue Ragnarök. Padre e hijo deberán arriesgarlo todo en cada uno de los Nueve Reinos. A lo largo de impresionantes paisajes mitológicos, se enfrentarán a temibles enemigos, desde dioses nórdicos hasta bestias salvajes", img: imgProvisoria2, price: "$2000"},
        {title:"God of War Ragnarok ", description:"En esta secuela, Kratos y Atreus iniciarán un viaje mítico en busca de respuestas antes de que llegue Ragnarök. Padre e hijo deberán arriesgarlo todo en cada uno de los Nueve Reinos. A lo largo de impresionantes paisajes mitológicos, se enfrentarán a temibles enemigos, desde dioses nórdicos hasta bestias salvajes", img: imgProvisoria2, price: "$2000"},
        {title:"God of War Ragnarok ", description:"En esta secuela, Kratos y Atreus iniciarán un viaje mítico en busca de respuestas antes de que llegue Ragnarök. Padre e hijo deberán arriesgarlo todo en cada uno de los Nueve Reinos. A lo largo de impresionantes paisajes mitológicos, se enfrentarán a temibles enemigos, desde dioses nórdicos hasta bestias salvajes", img: imgProvisoria2, price: "$2000"},
        {title:"God of War Ragnarok ", description:"En esta secuela, Kratos y Atreus iniciarán un viaje mítico en busca de respuestas antes de que llegue Ragnarök. Padre e hijo deberán arriesgarlo todo en cada uno de los Nueve Reinos. A lo largo de impresionantes paisajes mitológicos, se enfrentarán a temibles enemigos, desde dioses nórdicos hasta bestias salvajes", img: imgProvisoria2, price: "$2000"},
    ]





    const [current, setCurrent] = useState(1);
    const onChange = (page) => {
        console.log(page);
        setCurrent(page);
      };

    const pageSize = 8; // Cantidad de elementos por página
    const startIndex = (current - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const elementsToShow = arrayAux.slice(startIndex, endIndex);


    return(
        <div>
        <Slider />
        <div className="homeContainerUltraMega">
        <div className="filterHome" >
        <FilterHome/>
        </div>

        <div className="containerExtreme">
            <div className="listCards"> 
                {elementsToShow.map((e) => (
                    <CardElement 
                    title={e.title} 
                    imgProvisoria={e.img} 
                    description="DIGITAL"
                    descriptionComplete={e.description}
                    price={e.price}

                    />

                ))}
                
            </div>

            <div className="paginationHomeStyle" >
                <Pagination current={current} onChange={onChange} total={16} />
            </div>

        </div>
        </div>
        </div>
    )
}

export {Home}