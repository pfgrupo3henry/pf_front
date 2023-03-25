import React from 'react';
import './DropdownShoppingCartCard.css';
import sustituteImage from '../Assets/a-way-out-ps5-retro.jpg'
import granulado from '../Assets/granulado.png';
import { useDispatch } from 'react-redux';
import { addItemToChart } from '../../Redux/Actions/Index';

function DropdownShoppingCartCard({ image, title, description, price, id }) {

  const dispatch = useDispatch();



  return (
    <div className='dropdown-shopping-cart-card-component'>
      <div style={{ backgroundImage: `url('${''}')` }} className='card-header'>
        <div style={{ backgroundImage: `url('${image}')` }} className='image'></div>
        <div className='info'>
          <div className='title'>{title || 'Game Title'}</div>
        </div>
        <div className='price'>
          <span>{price || '$USD 30'}</span>
        </div>
      </div>
      <div className='card-footer'>
        <span onClick={() => dispatch(addItemToChart({ title, description, img: image, price, id }))}>Eliminar</span>
      </div>
    </div>
  )
}

export default DropdownShoppingCartCard;