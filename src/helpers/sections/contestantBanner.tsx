/* eslint-disable react-hooks/exhaustive-deps */

"use client";
import React from 'react';
import { IoIosArrowForward } from 'react-icons/io';
import Link from 'next/link';
import { RootState, useAppSelector } from '@/helpers/hooks/useStoreHooks';
import { VotingCampaign} from '@/utils/schema/ApiInterface';

interface CampaignBannerProps {
  stageID: string;
  name:string
}
const ContestantBanner : React.FC<CampaignBannerProps> = ({stageID , name }) => {

    const { all_campaign_data } = useAppSelector((state: RootState) => state.VotingCampaign); // Access state.Products.all_products_data directly
    const IndividualCampaign:VotingCampaign[] = all_campaign_data?.fulfilledResponse?.data.rows?.filter((data: VotingCampaign) => data.id === stageID);
    
    return (
        <>
            <section className="Hero-section -has-dynamic-timer -is-hero">
                <div className='h-fit'>

                <div className='banner w-full h-[30vh] md:h-[40vh] text-[#eeeeee] flex' 
                        style={{backgroundImage: `url(${IndividualCampaign && process.env.NEXT_PUBLIC_AWS_URI + IndividualCampaign[0]?.banner})`}}
                        
                        >

                        <div className='md:max-w-[598px] max-w-[90%] lg:max-w-[598px] w-[100%] mx-auto flex flex-col items-center justify-center banner-content'>
                            {
                                IndividualCampaign && <>
                                    <div className='flex flex-col items-center gap-3 py-10'>
                                        <div>
                                            <h2 className='font-secular font-extrabold text-[20px] md:text-[30px] leading-[30px] text-center 
                                                         md:leading-[10px] text-white'>{name}</h2>
                                        </div>
                                        <div className='flex gap-1 items-center'>
                                            <Link href={`/`} >
                                                <p className='page-top-prevpath text-[#fff] '>Home</p></Link>
                                            <IoIosArrowForward className='fill-[#fff]' />
                                            {
                                                <>
                                                    <Link href={`/campaign/${IndividualCampaign[0]?.id}`} >
                                                        <p className='page-top-prevpath text-[#fff] '>
                                                          {IndividualCampaign[0]?.title.split(' ').at(0)}
                                                        </p>
                                                    </Link>
                                                    <IoIosArrowForward className='fill-[#fff]'/>
                                                </>
                                            }
                                            <p className='page-top-path text-[--c-secondary] '>{name}</p>

                                        </div>
                                    </div>
                                </> 

                            }
                            
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default ContestantBanner;

