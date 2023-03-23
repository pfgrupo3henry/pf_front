import React from 'react';
import { DropdownShoppingCartCard } from './DropdownShoppingCartCard';
import './DropdownShoppingCart.css';

function DropdownShoppingCart() {
  return (
    <div className='dropdown-shopping-cart-component'>
      <div className='scroll'>
        {
          Array.from({length: 5}).map((el,i) => (
            <DropdownShoppingCartCard key={i}/>
          ))
        }
      </div>
      <div className='continue'>
        <button>Continuar Compra</button>
      </div>
    </div>
  )
}

export { DropdownShoppingCart }