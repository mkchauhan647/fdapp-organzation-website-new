'use client'
import { CompetionType } from '@/utils/constants/constants';
import Image from 'next/image';
import React from 'react';
import { Contestants } from '@/utils/schema/ApiInterface';
import { ContestantDetailButton, DynamicDetailModal } from '@/helpers/dynamic-imports/ui';
import DetailModal from './DetailModal';


const ContestantStageBox = ({link,candidate}: {candidate :Partial<Contestants>} & {link:string}) => {
    return (
        <div className='flex flex-col gap-[5px] contestant-box w-fit mx-auto'>
            <div className='h-[210px]  rounded-2xl'>
                <Image src="/image/home/contest.png" height={500} width={900} alt="img" className='h-[100%] w-[100%] max-w-[210px] object-cover object-center rounded-2xl' />
            </div>
            <div className='flex flex-col  gap-1'>
                <h1 className='text-[12px] md:text-[14px] font-[500] text-[var(--blue)] leading-[1rem]'>{candidate.name}</h1>
                <div className='flex items-center justify-between'>
                    <p className='text-[12px] sm:text-[14px] text-[var(--light)]'>{candidate.nationality}</p>
                    <DetailModal candidate={candidate} />
                </div>
            </div>
        </div>
    );
}

export default ContestantStageBox;