import React from 'react';
import './Carousel.css';
import { CardCarousel } from './CardCarousel';
import assa from '../Assets/assassins_creed.webp';
import elden from '../Assets/elden_ring.webp';
import fallen from '../Assets/fallen_order.webp';
import howarts from '../Assets/howarts_legacy.webp';
import { AiFillPlayCircle } from 'react-icons/ai';

function Carousel() {

  const cardsCarousel = [
    {
      background: assa,
      title: "Assassin's Creed Infinity",
    },
    {
      background: elden,
      title: "Elden Ring",
    },
    {
      background: fallen,
      title: "Star Wars Jedi: Fallen Order",
    },
    {
      background: howarts,
      title: "Hogwarts Legacy",
    },
    {
      background: assa,
      title: "Assassin's Creed Infinity",
    },
    {
      background: elden,
      title: "Elden Ring",
    },
    {
      background: fallen,
      title: "Star Wars Jedi: Fallen Order",
    },
    {
      background: howarts,
      title: "Hogwarts Legacy",
    },
  ]

  const scroll = React.useRef(null)

  const handleLeftSlide = () => {
    scroll.current.scrollLeft -= 200;
  }

  const handleRightSlide = () => {
    scroll.current.scrollLeft += 200;
  }

  return (
    <>
      <div className='carousel-component'>
        <div onClick={handleLeftSlide} className='left-arrow'>
          <AiFillPlayCircle />
        </div>
        <div onClick={handleRightSlide} className='right-arrow'>
          <AiFillPlayCircle />
        </div>
        <div ref={scroll} className='scroll'>
          {
            cardsCarousel.map((el, i) => (
              <CardCarousel
              key={i}
              background={el.background}
              title={el.title}
              />
            ))
          }
        </div>
      </div>
    </>
  )
}

export { Carousel }