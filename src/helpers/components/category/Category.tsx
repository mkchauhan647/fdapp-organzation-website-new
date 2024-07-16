/* eslint-disable react/jsx-key */
import React, { useEffect, useRef }  from 'react';
import { Navigation, Pagination , A11y } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import CompetitionBox from '@/helpers/ui/CompetitionBox';
import Controller from '@/helpers/ui/Controller';
import { RootState, useAppDispatch, useAppSelector } from '@/helpers/hooks/useStoreHooks';
import { GetAllCampaignsStages, GetVotingStagesByVotingCampaignID } from '@/helpers/redux/voting-campaign-stages.ts/_thunks';
import { VotingCampaignStage } from '@/utils/schema/ApiInterface';
import { CommonSection, Heading } from '@/helpers/dynamic-imports/ui';
import SkeletonCampaign from '../Skeleton/SkeletonCampaign';


const CategorySlide : React.FC<{id : string}> = ({ id }) => {

    const didMount = useRef<boolean>(false);
    const dispatch = useAppDispatch()
    useEffect(()=>{
        if(!didMount.current){
            didMount.current = true;
            if(id){
                dispatch(GetVotingStagesByVotingCampaignID(id))
            }else{
                dispatch(GetAllCampaignsStages())
            }
        }

    },[dispatch , id])

    const {all_campaign_stages_Data} = useAppSelector((state : RootState) => state.VotingCampaignStages);
    const fulfilledResponse =  all_campaign_stages_Data.fulfilledResponse

    let VotingCampaignStageData:VotingCampaignStage[] = id 
    ? fulfilledResponse?.data.filter((data : VotingCampaignStage) => data.votingCampaignId == id) 
    : fulfilledResponse?.data


    return (
        <>
            {/* <section className='w-full py-8 sm:py-8 md:px-28  px-2 bg-[--pagebg] pb-8 sm:pb-20'>
                <div className='xl:w-[78rem] mx-auto flex flex-col'> */}
                    <CommonSection name='category' >
                        <Heading link={`/campaign/cateogry?name=${id}`} title='Category' />

                        <div className='competition-slider flex justify-between items-baseline gap-10 overflow-auto'>
                            <Swiper
                                className='w-full'
                                modules={[Navigation, Pagination, A11y]}
                                spaceBetween={30}
                                slidesPerView={4}
                                loop={true}
                                navigation={{
                                    nextEl: '.forward',
                                    prevEl: '.back',

                                }}
                                pagination={{ clickable: true }}
                                breakpoints={{
                                    0:{
                                        slidesPerView:1,
                                    },
                                    375:{
                                        slidesPerView:1.5,
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
                                    VotingCampaignStageData && 
                                    [...VotingCampaignStageData].slice(0, 8).map((campaignStage, index) => {
                                        return (
                                            <SwiperSlide key={index}>
                                                <CompetitionBox
                                                    key={index}
                                                    id={campaignStage.id}
                                                    title={campaignStage.title}
                                                    banner={campaignStage.organizationID}
                                                    logo={campaignStage.logo}
                                                    link={`/campaign/category/details?id=${campaignStage.id}&campaignId=${campaignStage.votingCampaignId}`}
                                                    startDateTime={campaignStage.startDateTime}
                                                    endDateTime={campaignStage.endDateTime}
                                                />
                                            </SwiperSlide>
                                        )
                                    })
                                } 
                                {
                                    VotingCampaignStageData?.length == 0 && Array.from({length:4}).map((_ , index) => {
                                        return(
                                            <SwiperSlide key={index}>
                                                <SkeletonCampaign isloading={VotingCampaignStageData.length != 0} />
                                            </SwiperSlide>
                                        )
                                    })
                                }
                                
                                <div className="controller_wrapper">
                                    <Controller />
                                </div>
                            </Swiper >
                        </div>
                    </CommonSection>
                {/* </div>
            </section> */}
        </>
    );
}

export default CategorySlide;