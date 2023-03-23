import React from 'react';
import { DropdownShoppingCartCard } from './DropdownShoppingCartCard';
import { Button, Space } from 'antd';
import './DropdownShoppingCart.css';

function DropdownShoppingCart() {

  const [color, setColor] = React.useState('rgba(9, 22, 29, 1)');
  
  return (
    <div className='dropdown-shopping-cart-component' style={{width: 'fit-content', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <div className='main'>
        <div className='scroll'>
          {
            Array.from({length: 5}).map((el,i) => (
              <DropdownShoppingCartCard key={i}/>
            ))
          }
        </div>
      </div>
      <div className='continue'>
      <Space wrap>
        <Button style={{ backgroundColor: color}} onMouseLeave={() => setColor('rgba(9, 22, 29, 1)')} onMouseEnter={() => setColor('#555')} type="primary">Finalizar Compra</Button>
      </Space>
      </div>
    </div>
  )
}

export { DropdownShoppingCart }