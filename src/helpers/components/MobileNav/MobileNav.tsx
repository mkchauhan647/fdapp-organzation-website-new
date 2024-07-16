"use client"
import Link from 'next/link';
import React  from 'react';
import { FaFacebook, FaGoogle, FaInstagram } from "react-icons/fa";
import { FaLocationDot } from 'react-icons/fa6';
import { IoMdMail } from "react-icons/io";



const Topbar :React.FC = () => {
    return (
        <>
            <div>
                <div className='py-2 bg-[var(--c-primary)] text-[var(--c-grey)]'>
                <div className='container mx-auto flex items-center justify-between'>
                        <div className='flex gap-[0.5rem] md:items-center items-start'>
                            <FaFacebook className='w-[15px] h-[15px] sm:w-[15px] sm:h-[15px] hover:opacity-[0.8] transition-ease duration-300 cursor-pointer fill-[var(--c-grey)]' />
                            <FaGoogle className='w-[15px] h-[15px] sm:w-[15px] sm:h-[15px] hover:opacity-[0.8] transition-ease duration-300 cursor-pointer fill-[var(--c-grey)]' />
                            <FaInstagram className='w-[15px] h-[15px] sm:w-[18px] sm:h-[18px] hover:opacity-[0.8] transition-ease duration-300 cursor-pointer fill-[var(--c-grey)]' />
                        </div>
                        <div className='flex flex-col md:flex-row gap-2 md:gap-[30px] items-end'>
                            <Link 
                                href='https://www.google.com/maps/place/Wise+House,+38+Pinewood+Dr,
                                +Potters+Bar+EN6+2BD,+UK/@51.7011527,-0.1975736,17z/data=!3m1!4b1!4m6!3m5!1s0x48763d490510c6b1:
                                0xf06768e86d0d6172!8m2!3d51.
                                7011527!4d-0.1975736!16s%2Fg%2F11b8zhlv8d?entry=ttu'
                                target='_blank' 
                                className='flex gap-[0.2em] items-center'>

                                    <span><FaLocationDot className='w-[15px] h-[15px] sm:w-[15px] sm:h-[15px] fill-[var(--c-grey)]' /></span>
                                    <span 
                                        className='text-[10px] sm:text-[12px] line-clamp-1 md:prose text-[var(--c-grey)]'>
                                             Hertfordshire, United Kingdom
                                    </span>
                            </Link>
                            <a href='mailto:contact@fdapp.co.uk' className='flex gap-[0.2em] items-center'>
                                <span><IoMdMail className='w-[15px] h-[15px] sm:w-[15px] sm:h-[15px] fill-[var(--c-grey)]' /></span>
                                <span className='text-[10px] sm:text-[12px] text-[var(--c-grey)]'>contact@fdapp.co.uk</span>
                            </a>
                        </div>
                    </div>
                </div>   
            </div>
        </>
    );
}

export default Topbar;