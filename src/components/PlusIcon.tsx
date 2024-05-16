import Link from 'next/link'
import React from 'react'
import { useRenderContext } from '../app/context/renderContext';


const PlusIcon = ({ link }: { link: string }) => {
  const { admin } = useRenderContext();
if(admin){
  return (
    <Link href={link}>
      <div className=' bg-[#3B82F6] rounded-full absolute bottom-10 right-10'>
        <h1 className='py-3 text-3xl text-white px-5'>+</h1>
      </div>
    </Link>
  )
}else{
  return
}
  
}

export default PlusIcon