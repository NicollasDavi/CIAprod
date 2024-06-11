import BugsCard from '@/src/components/nicpower/bugs/bugscard'
import DiskInfo from '@/src/components/nicpower/disk/DiskInfo '
import React from 'react'

const page = () => {
  return (
       <div className='pt-14 w-screen  bg-[#3B82F6]/30 min-h-screen'>
        <div className='w-11/12 md:w-9/12 m-auto h-auto mb-10 flex'>
          <section className='w-6/12'>
            <BugsCard />
          </section>
          <section className='w-6/12'>
              <DiskInfo />
          </section>
        </div>
      </div>
  
  )
}

export default page