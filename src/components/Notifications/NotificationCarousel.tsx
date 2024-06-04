import React, { useRef } from 'react';
import Slider, { Settings } from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Notification from './Notification';

interface CarouselItem {
    type: string;
    title: string;
    text: string;
}

interface CarouselProps {
    items: CarouselItem[];
}

const NotificationCarousel: React.FC<CarouselProps> = ({ items }) => {
    const sliderRef = useRef<Slider>(null);
    const settings: Settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: true,
    };

    return (
        <>
            {items.length === 1 ? (
                <Notification key={0} type={items[0].type} title={items[0].title} text={items[0].text} adm={false} id=""/>
            ) : (
                <Slider ref={sliderRef} className='w-full  rounded-xl' {...settings}>
                    {items.map((item, index) => (
                        <Notification key={index} type={item.type} title={item.title} text={item.text} adm={false} id=''/>
                    ))}
                </Slider>
            )}
        </>
    );
};

export default NotificationCarousel;
