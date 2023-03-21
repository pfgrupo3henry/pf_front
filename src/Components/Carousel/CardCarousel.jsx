import React from 'react'
import { Card } from 'antd';
import './CardCarousel.css';
import { AiFillPlusCircle } from "react-icons/ai";

function CardCarousel({background, title}) {

  return (
    <div className='card-carousel-component' onClick={() => alert('Aca deberia redirigir al single del Juego')}>
      <Card
        title={title || 'Missing Title'}
        bordered={false}
        style={{
          position: 'relative',
          width: 200,
          height: 150,
          backgroundColor: 'rgba(0,0,0,0.4)',
          backgroundImage: `url('${background}')`,
          backgroundPosition: 'center 56px',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
      > 
        <AiFillPlusCircle />
      </Card>
    </div>
  )
}

export  { CardCarousel }
