/* eslint-disable react-hooks/exhaustive-deps */

"use client";
import React from 'react';
import { IoIosArrowForward } from 'react-icons/io';
import Link from 'next/link';
import { RootState, useAppSelector } from '@/helpers/hooks/useStoreHooks';
import { VotingCampaignStage } from '@/utils/schema/ApiInterface';


const StageBanner : React.FC<{ stageID? : string }> = ({ stageID }) => {

    const { all_campaign_stages_Data } = useAppSelector((state: RootState) => state.VotingCampaignStages); // Access state.CotingCampaignStages
    const IndividualCampaignStage:VotingCampaignStage[] = 
        all_campaign_stages_Data.fulfilledResponse?.data?.filter((data: VotingCampaignStage) => data.id === stageID);

    
    return (
        <>
            <section className="Hero-section -has-dynamic-timer -is-hero">
                <div className='h-fit'>
                    {
                        IndividualCampaignStage && (
                            <div className='banner w-full h-[30vh] sm:h-[40vh] text-[#eeeeee] flex' 
                                    style={{backgroundImage: `url(${process.env.NEXT_PUBLIC_AWS_URI + IndividualCampaignStage[0]?.banner})`}}
                                    
                                    >

                                    <div className='md:max-w-[598px] max-w-[90%] lg:max-w-[598px] w-[100%] mx-auto flex flex-col items-center justify-center banner-content'>
                                        {
                                            IndividualCampaignStage && <>
                                                <div className='flex flex-col items-center py-10'>
                                                    <div>
                                                        <h1 className='font-secular font-extrabold text-[20px] md:text-[30px] leading-[30px] text-center
                                                         md:leading-[52px] text-white'>{IndividualCampaignStage[0]?.title}</h1>
                                                    </div>
                                                    <div className='flex gap-1 items-center'>
                                                        <Link href={`/`} >
                                                            <p className='page-top-prevpath'>Home</p></Link>
                                                        <IoIosArrowForward />
                                                        {
                                                            <>
                                                                <Link href={`/campaign/category`} >
                                                                    <p className='page-top-prevpath'>
                                                                        Category
                                                                    </p>
                                                                </Link>
                                                                <IoIosArrowForward />
                                                            </>
                                                        }
                                                        <p className='page-top-path text-[--c-secondary]'>{IndividualCampaignStage[0]?.title.split(' ').at(0)}</p>

                                                    </div>
                                                </div>
                                            </> 

                                        }
                                        
                                    </div>
                                </div>
                        )
                    }
                </div>
            </section>
        </>
    );
}

export default StageBanner;

