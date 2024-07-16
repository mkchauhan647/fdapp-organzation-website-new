import Link from 'next/link'
import React from 'react'

function Heading({title , link} : {title:string , link : string}) {
  return (
    <div className='w-full flex justify-between items-center px-10 mb-[20px] sm:mb-[30px] relative'>
      <h1 className='md:w-[110%] md:text-center md:left text-[16px] sm:text-[20px] font-[700] text-[var(--black)]  text-center'>{title}</h1>
      <Link className='link md:flex md:justify-end absolute right-10' href={'/campaign'}><span className=' text-[12px] sm:text-[14px] font-bold hover:underline transition-ease duration-200'>See All</span></Link>
  </div>
  )
}

export default Heading