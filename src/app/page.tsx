"use client";
import {
  GetToKnow,
  NewsUpdate,
  Sponser,
} from "@/helpers/dynamic-imports/components";
import { CampaignSlide } from "@/helpers/dynamic-imports/components";
import { PublicLayout } from "@/helpers/dynamic-imports/views";
import { FaqSection } from "@/helpers/dynamic-imports/components";
import React from "react";
import BannerSlider from "@/helpers/sections/BannerSlider";

const Home: React.FC = () => {
  return (
    <>
      <PublicLayout>
        {/* <CampaignBanner /> */}
        <BannerSlider />
        <CampaignSlide />
        <GetToKnow />
        {/* <JudgeSlide /> */}
        {/* <RunningCampaignStages /> */}
        {/* <CandidateSlide /> */}
        {/* <UpcommingCampaign />
          <UpcommingCompetionStageSlide /> */}
        <FaqSection />
        <Sponser />
        <NewsUpdate />
      </PublicLayout>
    </>
  );
};

export default Home;
