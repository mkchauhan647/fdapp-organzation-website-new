/* eslint-disable react/jsx-key */
"use client";
import Link from 'next/link';
import React, { useState } from 'react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import CompetitionBox from '@/helpers/ui/CompetitionBox';
import Controller from '@/helpers/ui/Controller';
import { RootState, useAppSelector } from '@/helpers/hooks/useStoreHooks';
import {  VotingCampaignStage } from '@/utils/schema/ApiInterface';
import { Heading } from '@/helpers/dynamic-imports/ui';
import SkeletonCampaign from '../components/Skeleton/SkeletonCampaign';

const UpcommingCompetionStageSlide:React.FC = () => {

    const {upcomming_campaign_stages_data} = useAppSelector((state: RootState) => state.VotingCampaignStages); // Access state.Products.all_products_data directly
    const {isPending , isRejected ,fulfilledResponse} = upcomming_campaign_stages_data;
    const CampaignStageData : VotingCampaignStage[] = fulfilledResponse?.data.rows

    return (
        <section className='Competition-section -has-slider -has-campaigns py-8 sm:pt-[40px] sm:pb-[20px] bg-[var(--pagebg)]'>
            <div className='container mx-auto'>
                <div className=''>
                    <Heading title='Upcomming Competition Stages' link='/campaign/category' />


                    <div className='competition-slider flex justify-between items-baseline gap-10 overflow-auto'>
                    <Swiper
                        modules={[Navigation, Pagination ,A11y]}
                        spaceBetween={30}
                        slidesPerView={4}
                        loop={true}
                        navigation={{
                            nextEl: '.forward',
                            prevEl: '.back',

                        }}
                        pagination={{ clickable: true }}
                        breakpoints={{
                            375:{
                                slidesPerView:2,
                            },
                            580:{
                                slidesPerView:2
                            },
                            980:{
                                slidesPerView:3
                            },
                            
                            1260:{
                                slidesPerView:4

                            }
                            }}
                    >
                        {
                            (!isPending && !isRejected && CampaignStageData?.length > 0) ? (
                                CampaignStageData.slice(0, 8).map((competition : VotingCampaignStage, index : number)  => {
                                    return (
                                        <SwiperSlide key={index}>
                                            <CompetitionBox link={`/campaign/${competition.id}`} title={competition.title} logo={competition.logo} />
                                        </SwiperSlide>
                                    )
                                })
                            ) : (
                                Array.from({length:8}).map((_, index : number)  => {
                                    return (
                                        <SwiperSlide key={index}>
                                            <SkeletonCampaign isloading={(isPending || isRejected || CampaignStageData?.length == 0) || !CampaignStageData}/>
                                        </SwiperSlide>
                                    )
                                })
                            )
                            
                        }
                        
                        <div className="controller_wrapper">
                            <Controller />
                        </div>
                    </Swiper >
                    </div>
                </div>
            </div>
        </section>
    );
}

export default UpcommingCompetionStageSlide;