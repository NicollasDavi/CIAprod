"use client"
import React, { useEffect, useRef, useState } from 'react';
import Slider, { Settings } from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

type CarouselItem = {
  image: string;
  alt: string;
  caption: string;
};

type CarouselProps = {
  items: CarouselItem[];
};

const Carousel: React.FC<CarouselProps> = ({ items }) => {
  const sliderRef = useRef<Slider>(null);
  const [number, setNumber] = useState(2)

  useEffect(() => {
    if(window.innerWidth < 600){
      setNumber(1)
    }
  })
  

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(0);
    }
  }, [items]);

  const settings: Settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: number,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000, 
    arrows: true,
  };

  return (
    <div>
      <Slider ref={sliderRef} {...settings}>
        {items.map((item, index) => (
          <div key={index}>
            <img src={item.image} alt={item.alt} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
