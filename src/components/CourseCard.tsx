import Image from 'next/image'
import React from 'react'
import { MdDeleteForever } from "react-icons/md";
import { BiSolidEdit } from "react-icons/bi";
import Link from 'next/link';

interface Card{
  link: string,
  src: string
  handleDelete: any
}
const CourseCard: React.FC<Card> = ({link, src, handleDelete}) => {
  return (
    <div className='max-w-48 bg-[#3B82F6]/90 rounded-lg mb-10'>
        <div>
            <Link href={link}>
                <img src={src} width={1000} height={100} alt={''} className='w-full rounded-lg'/>
            </Link>
        </div>
        <div className='p-1 items-end justify-end flex'>
            <button className='p-1 rounded-lg  text-white mr-5 text-lg'><BiSolidEdit /></button>
            <button className='p-1 rounded-lg bg-red-500 text-white mr-3' onClick={handleDelete}><MdDeleteForever /></button>
        </div>
    </div>
  )
}

export default CourseCard