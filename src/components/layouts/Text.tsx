import React from 'react'
import { CiTextAlignLeft } from "react-icons/ci";


const Text = ({func} : any) => {
  return (
    <div onClick={func} className='w-full cursor-pointer bg-[#3B82F6] text-black flex flex-row p-1 justify-around text-2xl gap-1'>
        <div className='w-12/12 p-3 bg-white '>
            <CiTextAlignLeft />
        </div>
    </div>
  )
}

export default Text