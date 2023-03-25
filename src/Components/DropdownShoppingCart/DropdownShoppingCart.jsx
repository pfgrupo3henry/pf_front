import React from 'react';
import DropdownShoppingCartCard from './DropdownShoppingCartCard';
import { Button, Space } from 'antd';
import './DropdownShoppingCart.css';
import { useSelector } from 'react-redux';

function DropdownShoppingCart() {

  const [color, setColor] = React.useState('rgba(9, 22, 29, 1)');
  const cards = useSelector(state => state.shoppingChart)

  return (
    <div className='dropdown-shopping-cart-component' style={{ width: 'fit-content', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div className='main'>
        <div className='scroll'>
          {
            cards.length
              ? cards.map((el, i) => (
                <DropdownShoppingCartCard key={i} title={el.title} image={el.img} price={el.price} description={el.description} id={el.id} />
              ))
              : null
          }
        </div>
      </div>
      <div className='continue'>
        <Space wrap>
          <Button style={{ backgroundColor: color }} onMouseLeave={() => setColor('rgba(9, 22, 29, 1)')} onMouseEnter={() => setColor('#555')} type="primary">Finalizar Compra</Button>
        </Space>
      </div>
    </div>
  )
}

export default DropdownShoppingCart