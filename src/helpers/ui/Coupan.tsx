import Image from 'next/image';
import React from 'react';
import { PayModal } from './PayModal';
import { Coupon } from '@/utils/schema/ApiInterface';

const Coupan: React.FC<Coupon> = ({ ...coupon }) => {
    return (
        <>
            <div className='coupon-box flex flex-col gap-2 py-2 px-3 bg-white rounded-lg'>
                <div className='flex justify-between items-center'>
                    <Image src='/image/vote/cupon.png' height={500} width={900} alt='cuopn' className='h-[3rem] w-[3rem] object-contain' />
                    <div>
                        <h3 className='font-secular font-[500] text-lg text-[var(--black)] text-right'>{coupon.name}</h3>
                        <p className='font-secular font-[500] text-lg text-[var(--blue)] text-right'>${coupon.pricing}</p>
                    </div>
                </div>

                <div className='text-xs font-[500] text-[var(--c-secondary)] flex justify-between items-center gap-[10px]'>
                    <div className='bg-[var(--c-rose-pink)] px-2 py-1 rounded-lg'>
                        <p>{coupon.votes} votes</p>
                    </div>
                    <div className='bg-[var(--c-rose-pink)] text-[var(--c-secondary)] px-2 py-1 rounded-lg'>
                        <p>{coupon.eligibleCandidateCounts} Candidates</p>
                    </div>
                </div>

                <div>
                    <PayModal {...coupon} />
                </div>

            </div>
        </>
    );
}

export default Coupan;
