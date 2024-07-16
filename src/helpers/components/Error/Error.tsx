import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Error : React.FC = () => {
    return (
        <>
            <div className="flex justify-center items-center py-10">
                <div className="px-12 py-16 shadow-lg rounded-md border-2 flex flex-col items-center gap-5 w-[90%] md:w-1/3">
                    <div className='w-full flex justify-center my-5'>
                        <Image src='/image/loginimg/error.png' height={200} width={120} alt="img" />
                    </div>
                    <div className='w-[70%] text-center mx-auto flex flex-col gap-2 items-center justify-start'>
                        <h1 className='text-[#117CC4] font-secular font-500 text-xl'>Error Occured</h1>
                        <p className='card-desc'>Something went wrong processing your request</p>
                    </div>
                    <div className='flex justify-center'>
                        <Link className='btn py-2 px-4' href={'/'}>Continue</Link>
                    </div>

                </div>
            </div>
        </>
    );
}

export default Error;