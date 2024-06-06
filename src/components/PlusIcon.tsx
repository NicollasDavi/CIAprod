import Link from 'next/link'
import React from 'react'

const PlusIcon = ({ link }: { link: string }) => {
  return (
    <Link href={link} className=' absolute bottom-10 right-10'>
      <div className=' bg-[#3B82F6] rounded-full border-4'>
        <h1 className='py-3 text-3xl text-white px-5'>+</h1>
      </div>
    </Link>
  ) 
}

export default PlusIcon