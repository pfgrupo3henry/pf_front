/* import { Pagination } from 'antd';
import { useState } from 'react';
import "./pagination.css"
import "../CardList/cardList.css"


function PaginationHome () {
    const [current, setCurrent] = useState(1);
    const onChange = (page) => {
        console.log(page);
        setCurrent(page);
      };


    const pageSize = 8; // Cantidad de elementos por página
    const startIndex = (current - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const elementsToShow = datos.slice(startIndex, endIndex);
    
    return(
        
        <div className="paginationHomeStyle" >
            <Pagination current={current} onChange={onChange} total={16} />
        </div>
       
  )};
 

export {PaginationHome}; */