import Link from 'next/link'
import React from 'react'

const DocCard = ({ nome, id }: any) => {
  return (
    <div className='w-10/12 bg-[#3B82F6] rounded text-white mb-16'>
        <Link href={`/pages/usedoc/${id}`}>
            <section>
                <h1 className='p-3'>{nome}</h1>
                <hr className='w-full'/>
                <section className='p-1 flex justify-between px-3'>
                    <p></p>
                    <p>Data</p>
                </section>
            </section>
        </Link>
    </div>
  )
}

export default DocCard
