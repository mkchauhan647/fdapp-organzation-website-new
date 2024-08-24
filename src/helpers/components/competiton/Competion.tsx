/* eslint-disable react/jsx-key */
"use client";
import Link from "next/link";
import React, { useState } from "react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import CompetitionBox from "@/helpers/ui/CompetitionBox";
import Controller from "@/helpers/ui/Controller";
import { RootState, useAppSelector } from "@/helpers/hooks/useStoreHooks";
import { VotingCampaign } from "@/utils/schema/ApiInterface";
import { CommonSection, Heading } from "@/helpers/dynamic-imports/ui";
import SkeletonCampaign from "../Skeleton/SkeletonCampaign";
import HomeCompetitionBox from "@/helpers/ui/HomeCompetionBox";

const CompetionSlide: React.FC = () => {
  const { all_campaign_data } = useAppSelector(
    (state: RootState) => state.VotingCampaign
  ); // Access state.VotingCampaign
  const { isPending, isRejected, fulfilledResponse } = all_campaign_data;
  const CampaignData = fulfilledResponse?.data.rows;
  console.log("campaign data " + JSON.stringify(CampaignData));

  const dataCampaign = {
    title: "Campaigns",
    description:
      "  Welcome to FDAPPA where your voice matters. With FDApp, our official voting platform, you can securely and easily cast your vote via SMS or email, ensuring that your opinion is heard. FDApp makes participation effortless, no matter where you are. Join us in making a difference—your vote is just a click away with FDApp",
  };

  return (
    <CommonSection name="Competition-section -has-slider -has-campaigns ">
      <header className="w-full flex flex-col items-center mt-8 sm:mt-2 md:mt-0 lg:mt-44 xl:mt-60 2xl:mt-16  mb-[20px] sm:mb-[30px] relative">
        <h1 className="text-[2rem] font-[600] text-[var(--blue)] font-poppins">
          {dataCampaign.title}
        </h1>
        <p className="topic-desc text-center">
          {dataCampaign.description}
        </p>
      </header>

      <div className="competition-slider flex  items-baseline  w-full relative">
        <Swiper
          className="w-full  "
          modules={[Navigation, Pagination, A11y]}
          spaceBetween={25}
          slidesPerView={4}
          loop={true}
          navigation={{
            nextEl: ".forward",
            prevEl: ".back",
          }}
          pagination={{ clickable: true }}
          breakpoints={{
            0: {
              slidesPerView: 1,
              spaceBetween: 15,
            },
            590: {
              slidesPerView: 1,
              spaceBetween: 15,
            },
            730: {
              slidesPerView: 1,
            },
            980: {
              slidesPerView: 1,
            },
            1080: {
              slidesPerView: 1,
            },

            1260: {
              slidesPerView: 1,
            },
          }}
        >
          {!isPending && !isRejected && CampaignData?.length > 0
            ? CampaignData.slice(0, 8).map(
                (competition: VotingCampaign, index: number) => {
                  return (
                    <SwiperSlide key={index}>
                      <HomeCompetitionBox
                        link={`campaign/${competition.id}`}
                        // link={`/campaign/category/details?id=${competition.logo}&campaignId=${competition.id}`}
                        title={competition.title}
                        logo={competition.logo}
                        banner={competition.banner}
                        startDateTime={competition.startDateTime}
                        endDateTime={competition.endDateTime}
                        candidateCount={competition.candidateCount}
                        description={competition.description}
                      />
                    </SwiperSlide>
                  );
                }
              )
            : Array.from({ length: 8 }).map((_, index: number) => {
                return (
                  <SwiperSlide key={index}>
                    <SkeletonCampaign
                      isloading={
                        isPending ||
                        isRejected ||
                        CampaignData?.length == 0 ||
                        !CampaignData
                      }
                    />
                  </SwiperSlide>
                );
              })}
        </Swiper>
        <div className="controller_wrapper">
          <Controller />
        </div>
      </div>
    </CommonSection>
  );
};

export default CompetionSlide;
