import React from 'react';
import './DropdownShoppingCartCard.css';
import sustituteImage from '../Assets/a-way-out-ps5-retro.jpg'
import granulado from '../Assets/granulado.png';

function DropdownShoppingCartCard({image, title, description, price}) {
  return (
    <div className='dropdown-shopping-cart-card-component'>
      <div style={{backgroundImage: `url('${''}')`}} className='card-header'>
        <div style={{ backgroundImage: `url('${image || sustituteImage}')` }} className='image'></div>
        <div className='info'>
          <div className='title'>{title || 'Game Title'}</div>
          <div className='description'>{description || 'Im a game description'}</div>
        </div>
        <div className='price'>
          <span>{price || '$USD 30'}</span>
        </div>
      </div>
      <div className='card-footer'>
        <span>Eliminar</span>
      </div>
    </div>
  )
}

export { DropdownShoppingCartCard };