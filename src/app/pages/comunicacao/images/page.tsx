"use client";
import EditCarouselCard from "@/src/components/EditCarousel/EditCarouselCard";
import axiosInstance from "../../../../app/axiosInstance";
import React, { useEffect, useState } from "react";

interface CarouselItem {
    id: string;
    image: string;
    createdAt: Date;
}

const Page = () => {
    const [carouselImgs, setCarouselImgs] = useState<CarouselItem[]>([]);

    useEffect(() => {
        axiosInstance.get('/carousel')
          .then(response => {
            setCarouselImgs(response.data);
          })
          .catch(error => {
            console.error('Erro:', error);
          });
    }, []);

    const handleDelete = (id: string) => {
        axiosInstance.delete(`/carousel/${id}`)
        .then(response => {
          console.log(response)
        })
        .catch(error => {
          console.error('Erro:', error);
        });
    }

    const handleDisable = (id: string) => {
        axiosInstance.patch(`/carousel/${id}`)
        .then(response => {
          console.log(response)
        })
        .catch(error => {
          console.error('Erro:', error);
        });
    }

    return (
        <div className="pt-8">
            <div className="w-11/12 md:w-9/12 m-auto h-auto mb-10">
                <h1 className="ml-1 pb-2 pt-10 md:pt-12">Imagens do Carousel</h1>
            </div>
            <div className="gap-4 md:gap-0 w-11/12 m-auto h-auto mb-10 md:pl-28">
                {carouselImgs.map((image, index) => (
                    <EditCarouselCard
                        handleDelete={handleDelete}
                        handleDisable={handleDisable}
                        id={image.id}
                        src={image.image}
                        key={index}
                    />
                ))}
            </div>
        </div>
    );
};

export default Page;
