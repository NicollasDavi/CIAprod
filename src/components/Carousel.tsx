"use client"
import React, { useEffect, useRef, useState } from 'react';
import Slider, { Settings } from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

type CarouselItem = {
  image: string;
};

type CarouselProps = {
  items: CarouselItem[];
};

const Carousel: React.FC<CarouselProps> = ({ items }) => {
  const sliderRef = useRef<Slider>(null);
  const [slidesToShow, setSlidesToShow] = useState(window.innerWidth < 600 ? 1 : 2);

  const updateSlidesToShow = () => {
    if (window.innerWidth < 600) {
      setSlidesToShow(1);
    } else {
      setSlidesToShow(2);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', updateSlidesToShow);
    return () => {
      window.removeEventListener('resize', updateSlidesToShow);
    };
  }, []);

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(0);
    }
  }, [items]);

  const settings: Settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
  };

  return (
    <div>
      <Slider ref={sliderRef} {...settings}>
        {items.map((item, index) => (
          <div key={index} className="max-h-[50vh]">
            <img src={item.image} alt={`Carousel item ${index + 1}`} className="max-h-[50vh] object-cover w-full" />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
