import Image from 'next/image'
import React from 'react'
import { MdDeleteForever } from 'react-icons/md';
import { GiSightDisabled } from "react-icons/gi";


interface Card {
    src: string;
    id: string;
    handleDelete: (id: string) => void;
    handleDisable: (id: string) => void;
}

const EditCarouselCard: React.FC<Card> = ({ src, id, handleDelete, handleDisable }) => {
    return (
        <section className='flex flex-row shadow-lg rounded-xl mb-5 justify-around w-11/12 md:w-8/12 m-auto'>
            <div className='w-4/12 p-1 md:p-4'>
                <Image src={src} width={1000} height={100} alt={''} className='w-full rounded-lg shadow-md' />
            </div>
            <div className='w-3/12 p-5 flex md:flex-col justify-center items-center text-2xl md:text-3xl gap-5 md:gap-10'>
                <div className='text-white bg-red-500 text-center items-center flex justify-center p-2 md:px-24 md:py-4 rounded-xl cursor-pointer'>
                    <MdDeleteForever onClick={() => handleDelete(id)} className=''/>
                </div>
                <div className='text-white bg-blue1 text-center items-center flex justify-center p-2 md:px-24 md:py-4 rounded-xl cursor-pointer'>
                    <GiSightDisabled onClick={() => handleDisable(id)} className=''/>
                </div>
            </div>
        </section>
    )
}

export default EditCarouselCard;
