/* eslint-disable react/no-unescaped-entities */
import Link from 'next/link';
import React from 'react';


const LandingPage : React.FC = () => {

    return (
        <>
            <div className='w-full pt-10 bg-[var(--pagebg)] pb-[70px] '>
                <div className='container mx-auto flex flex-col gap-8 justify-center'>
                    <div className='w-full md:h-[70vh] flex flex-col items-center md:flex-row md:justify-between'>
                        <div className='w-full md:w-[40%] h-full pl-15'>
                            <div className='flex flex-col gap-5 py-10 text-left h-full justify-center'>

                                <span>
                                    <h1 className='text-5xl font-bold w-[85%] text-[var(--blue)]'>Global Choice Awards: Amplify Your Voice and Influence</h1>
                                </span>

                                <span>
                                    <p className='text-[var(--c-secondary)] w-[80%]'>Revolutionize Contests and Empower Your Audience with Our Seamless SaaS Voting Platform!</p>
                                </span>

                                <span>
                                    <Link href="/login" > <button className='px-10 py-4 bg-[var(--btncolor)] text-white font-semibold rounded-full'>Sign Up Start your campion</button></Link>
                                </span>
                            </div>
                        </div>

                        <div className='w-full md:w-[60%]'>
                            <div className='w-full md:h-[70vh]'>
                                <video className='h-full w-full  rounded-xl'
                                    preload='auto'
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    poster="video/video1.mp4" >
                                    <source src="video/video1.mp4" />
                                </video>
                            </div>

                        </div>
                    </div>
                </div>
            </div >
        </>
    );
}

export default LandingPage;