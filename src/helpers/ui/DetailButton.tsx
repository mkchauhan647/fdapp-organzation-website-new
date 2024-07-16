import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';
import { DynamicDetailModal } from '../dynamic-imports/ui';
import DetailModal from './DetailModal';
import { Candidate, Contestants } from '@/utils/schema/ApiInterface';
import CoupanModal from './CoupanModal';


const DetailButton = ({candidate}:{candidate:Candidate}) => {
    return (
        <>
            <div id={candidate.id} className='details-btn flex items-center justify-between w-full md:w-[20rem] rounded-xl'>
                <div className='flex items-center gap-2  w-full'>
                    <div className='h-[4rem] w-[8rem] rounded-md'>
                        <Image src={process.env.NEXT_PUBLIC_AWS_URI as string + candidate.candidate.profilePicture }height={200} width={200} alt="img" className='h-full w-full rounded-lg object-cover' />
                    </div>
                    <div className='flex justify-between px-2 py-3 self-end' style={{width:'-webkit-fill-available'}}>
                        <div className='flex flex-col justify-center items-start leading-none'>
                            <h4 className='font-secular font-[400] text-sm text-[var(--blue)] leading-none'>{candidate.candidate.name}</h4>
                            <p className='text-sm font-[500] text-[var(--light)]'>{candidate.candidate.nationality}</p>
                        </div>
                        <CoupanModal campaignID={candidate.candidate.votingCampaignId}  />
                    </div>
                </div>
                <div>
                </div>
                
            </div>
        </>
    );
}

export default DetailButton;