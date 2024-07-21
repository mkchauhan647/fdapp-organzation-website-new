import Image from 'next/image';
import React from 'react';
import { Contestants } from '@/utils/schema/ApiInterface';
import Link from 'next/link';
import { FaFlag } from 'react-icons/fa';


const ContestantBox = ({ contestants }: { contestants: Contestants }) => {
    return (
        <div className="p-[20px] rounded-2xl overflow-hidden bg-white flex justify-center">
        <Link href={`/contestants/${contestants.id}?name=${contestants.name}&campaignID=${contestants.votingCampaignId}&campaignStage=${contestants.votingCampaignId}`}>
            <div className='flex flex-col gap-[5px] contestant-box mx-auto w-full h-full bg-white items-center'>
                <div className='h-[120px] w-[120px] overflow-hidden rounded-full'>
                    <Image src={process.env.NEXT_PUBLIC_AWS_URI + contestants.profilePicture} height={500} width={900} alt="img" 
                    className='h-full w-full object-cover' />
                </div>
                <div className='flex flex-col gap-[2px] md:gap-[0] items-center mt-3'>
                    <h2 className='md:text-[18px] text-[14px] font-[600] text-[var(--blue)] leading-[1.5rem] line-clamp-1'>{contestants.name}</h2>
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-[3px]'>
                            <FaFlag className='w-4 h-3 fill-[var(--c-secondary)]'/>
                            <p className='paragraph text-[var(--light-text-color)]'>{contestants.nationality}</p>
                        </div>
                    </div>
                    <button className='px-[20px] py-[5px] rounded-md bg-[#ff9f31] text-center text-white mt-2'>vote</button>
                </div>
            </div>
        </Link>
        </div>
    );
}

export default ContestantBox; 