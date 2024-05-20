import Image from 'next/image'
import React from 'react'
import Link from 'next/link';

interface Card{
  link: string,
  src: string
  handleDelete: any
}
const CourseCard: React.FC<Card> = ({link, src, handleDelete}) => {

  return (
    <div className='max-w-48 bg-[#3B82F6]/90 rounded-lg mb-10 '>
        <div>
            <Link href={link}>
                <Image src={src} width={1000} height={100} alt={''} className='w-full rounded-lg '/>
            </Link>
        </div>
    </div>
  )
}

export default CourseCard