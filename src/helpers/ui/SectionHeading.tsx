import Link from 'next/link'
import React from 'react'

function SectionHeading({title } : {title :string}) {
  return (
    <div className='w-full md:text-center text-left px-10 mb-[20px] sm:mb-[30px]'>
      <h1 className='md:text-center text-left md:text-[32px] text-[14px] font-[600] text-[var(--black)] font-poppins'>{title}</h1>
  </div>
  )
}

export default SectionHeading