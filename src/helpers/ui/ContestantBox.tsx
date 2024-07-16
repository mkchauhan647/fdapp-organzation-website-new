import Image from 'next/image';
import React from 'react';
import { Contestants } from '@/utils/schema/ApiInterface';
import Link from 'next/link';
import { FaFlag } from 'react-icons/fa';


const ContestantBox = ({ contestants }: { contestants: Contestants }) => {
    return (
        <Link href={`/contestants/${contestants.id}?name=${contestants.name}&campaignID=${contestants.votingCampaignId}&campaignStage=${contestants.votingCampaignId}`}>
            <div className='flex flex-col gap-[5px] contestant-box mx-auto'>
                <div className='h-[200px] md:h-[242px] rounded-md'>
                    <Image src={process.env.NEXT_PUBLIC_AWS_URI + contestants.profilePicture} height={500} width={900} alt="img" 
                    className='h-[100%] w-[100%] object-cover object-center rounded-md ' />
                </div>
                <div className='flex flex-col gap-[2px] md:gap-[0]'>
                    <h2 className='md:text-[18px] text-[14px] font-[600] text-[var(--blue)] leading-[1.5rem] line-clamp-1'>{contestants.name}</h2>
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-[3px]'>
                            <FaFlag className='w-4 h-3 fill-[var(--c-secondary)]'/>
                            <p className='paragraph text-[var(--light-text-color)]'>{contestants.nationality}</p>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default ContestantBox; 