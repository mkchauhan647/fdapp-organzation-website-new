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
import { VotingCampaign } from '@/utils/schema/ApiInterface';
import { CommonSection, Heading } from '@/helpers/dynamic-imports/ui';
import SkeletonCampaign from '../Skeleton/SkeletonCampaign';

const CompetionSlide: React.FC = () => {

    const { all_campaign_data } = useAppSelector((state: RootState) => state.VotingCampaign); // Access state.VotingCampaign
    const { isPending, isRejected, fulfilledResponse } = all_campaign_data;
    const CampaignData = fulfilledResponse?.data.rows

    return (

        <CommonSection name='Competition-section -has-slider -has-campaigns'>
            <header className='w-full flex flex-col items-center mb-[20px] sm:mb-[30px] relative'>
                <h1 className='text-[2rem] font-[600] text-[var(--black)] font-poppins'>Competitions</h1>
                <p className='topic-desc text-center'>Nulla viverra at senectus commodo. Adipiscing ac habitasse nec quis libero facilisis. Vulputate blandit suspendisse id lorem et porta</p>
            </header>

            <div className='competition-slider flex justify-between items-baseline relative'>
                <Swiper
                    className='w-full !pb-16 '
                    modules={[Navigation, Pagination, A11y]}
                    spaceBetween={25}
                    slidesPerView={4}
                    loop={true}
                    navigation={{
                        nextEl: '.forward',
                        prevEl: '.back',

                    }}
                    pagination={{ clickable: true }}
                    breakpoints={{
                        0: {
                            slidesPerView: 1.5,
                            spaceBetween:15
                        },
                       590: {
                            slidesPerView: 2,
                            spaceBetween:15
                        },
                        730: {
                            slidesPerView: 2.5,
                        },
                        980: {
                            slidesPerView: 3
                        },
                        1080: {
                            slidesPerView: 3.5
                        },

                        1260: {
                            slidesPerView: 4

                        }
                    }}
                >
                    {
                        (!isPending && !isRejected && CampaignData?.length > 0) ? (
                            CampaignData.slice(0, 8).map((competition: VotingCampaign, index: number) => {
                                return (
                                    <SwiperSlide key={index}>
                                        <CompetitionBox
                                            link={`/campaign/${competition.id}`} title={competition.title} logo={competition.logo}
                                            startDateTime={competition.startDateTime}
                                            endDateTime={competition.endDateTime} />
                                    </SwiperSlide>
                                )
                            })
                        ) : (
                            Array.from({ length: 8 }).map((_, index: number) => {
                                return (
                                    <SwiperSlide key={index}>
                                        <SkeletonCampaign isloading={(isPending || isRejected || CampaignData?.length == 0) || !CampaignData} />
                                    </SwiperSlide>
                                )
                            })
                        )

                    }

                </Swiper >
                    <div className="controller_wrapper">
                        <Controller />
                    </div>
            </div>
        </CommonSection>

    );
}

export default CompetionSlide;