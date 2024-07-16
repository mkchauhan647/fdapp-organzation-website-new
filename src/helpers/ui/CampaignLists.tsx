import { GTKBanner } from '@/utils/image/image';
import Image from 'next/image';
import * as React from 'react';

const CampaignList = () => {
    return (
        <>
            <div className='w-[17rem] flex gap-[.5rem] items-center h-[4rem]'>
                <div className='w-[25%] h-full'>
                    <Image src={GTKBanner} height={500} width={900} alt='camp..' className='h-full w-full object-cover'/> 
                </div>

                <div className='w-[75%] flex flex-col gap-1rem justify-center'>
                    <div>
                        <h1 className='text-[12px] md:text-[16px] font-[400] text-white line-clamp-2'>Enterreal:A Celebration of Beauty</h1>
                    </div>
                    <div>
                        <p className='paragraph text-[var(--grey)]'>15 May, 2024</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CampaignList;