import CommonSection from '@/helpers/ui/CommonSection';
import { GTKBanner } from '@/utils/image/image';
import Image from 'next/image';
import * as React from 'react';

const GetToKnow  : React.FC = () => {
    return (
        <>
            <section className='gettoknow pb-8 sm:pb-12'>
                <div className="container mx-auto">
                    <div className='flex md:flex-row flex-col gap-[4rem] md:gap-[1rem] w-full py-[3rem] border-t-2'>
                        <div className='md:w-[50%] w-full relative'>
                            <div className='w-[90%] h-[15rem] md:h-[20rem] bg-[var(--c-secondary)] rounded-md '>
                            </div>

                            {/* <video autoPlay className='w-[90%] h-[15rem] md:h-[20rem] rounded-md absolute top-[2rem] left-[2rem] z-10 shadow-md bg-[white]'>
                                <source src="/video/video1.mp4" type="video/mp4" className='rounded-md'/>
                            </video> */}
                            <Image src={GTKBanner} width={800} height={800} alt='gtk-banner'
                            className='w-[90%] h-[15rem] md:h-[20rem] rounded-md absolute top-[2rem] left-[2rem] z-10 shadow-md bg-[white]' />
                        </div>

                        <div className='md:w-[50%] w-full flex flex-col items-start gap-[1rem]'>
                            <div className='flex flex-col gap-[.5rem]'>
                                <span><p className='paragraph text-[var(--blue)]'>Get To Know Us</p></span>
                                <span>
                                    <h1 className='text-[2rem] font-[700] text-[var(--blue)] w-[80%]'>Your <span className='text-[2rem] font-[700] text-[var(--orange)]'>Ultimate</span> Contestant Voting Solution</h1>
                                </span>

                                <span>
                                    <p className='paragraph text-[var(--light-text-color)]'>Nunc nisl aliquam libero pellentesque magna amet. Nunc pellentesque sit malesuada at odio sit senectus magna lacus. Nunc morbi dui condimentum condimentum magna non nulla in.</p>
                                </span>

                            </div>

                            <div>
                                <button className='btn-primary'>Read More</button>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default GetToKnow;