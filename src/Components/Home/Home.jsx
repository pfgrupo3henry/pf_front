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
        {title:"Europe Street beat", description:"www.instagram.com", img: imgProvisoria},
        {title:"Europe Street beat", description:"www.instagram.com", img: imgProvisoria},
        {title:"Europe Street beat", description:"www.instagram.com", img: imgProvisoria},
        {title:"Europe Street beat", description:"www.instagram.com", img: imgProvisoria},
        {title:"Europe Street beat", description:"www.instagram.com", img: imgProvisoria},
        {title:"Europe Street beat", description:"www.instagram.com", img: imgProvisoria},
        {title:"Europe Street beat", description:"www.instagram.com", img: imgProvisoria},
        {title:"Europe Street beat", description:"www.instagram.com", img: imgProvisoria2},
        {title:"Europe Street beat", description:"www.instagram.com", img: imgProvisoria2},
        {title:"Europe Street beat", description:"www.instagram.com", img: imgProvisoria2},
        {title:"Europe Street beat", description:"www.instagram.com", img: imgProvisoria2},
        {title:"Europe Street beat", description:"www.instagram.com", img: imgProvisoria2},
        {title:"Europe Street beat", description:"www.instagram.com", img: imgProvisoria2},
        {title:"Europe Street beat", description:"www.instagram.com", img: imgProvisoria2},
        {title:"Europe Street beat", description:"www.instagram.com", img: imgProvisoria2},
        {title:"Europe Street beat", description:"www.instagram.com", img: imgProvisoria2},
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
                    description={e.description}

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