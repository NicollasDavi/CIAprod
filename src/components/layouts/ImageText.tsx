import React from 'react'
import { FaImage } from "react-icons/fa6";
import { CiTextAlignLeft } from "react-icons/ci";


const ImageText = ({func} : any) => {
  return (
    <div onClick={func} className='w-full cursor-pointer bg-[#3B82F6] text-black flex flex-row p-1 justify-around text-2xl gap-1'>
        <div className='w-6/12 p-3 bg-white '>
            <FaImage />
        </div>
        <div className='w-6/12 p-3  bg-white'>
            <CiTextAlignLeft />
        </div>
    </div>
  )
}

export default ImageText