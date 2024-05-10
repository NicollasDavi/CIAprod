import Link from 'next/link'
import React from 'react'

const PlusIcon = ({ link }: { link: string }) => {
  return (
    <Link href={link}>
      <div className=' bg-[#3B82F6] rounded-full absolute bottom-10 right-10'>
        <h1 className='py-3 text-3xl text-white px-5'>+</h1>
      </div>
    </Link>
  )
}

export default PlusIcon