"use client"
import { GetToKnow, NewsUpdate, RunningCampaignStages, Sponser } from "@/helpers/dynamic-imports/components";
import { CampaignSlide } from "@/helpers/dynamic-imports/components";
import { CandidateSlide } from "@/helpers/dynamic-imports/components";
import { PublicLayout } from "@/helpers/dynamic-imports/views";
import { FaqSection } from "@/helpers/dynamic-imports/components";
import CampaignBanner from "@/helpers/sections/campaignBanner";
import UpcommingCampaign from "@/helpers/sections/UpcommingCampaign";
import UpcommingCompetionStageSlide from "@/helpers/sections/UpcommingCampaignStages";
import React from "react";
import BannerSlider from "@/helpers/sections/BannerSlider";


const Home : React.FC = () => {
  return (
    <>
      <PublicLayout>
          {/* <CampaignBanner /> */}
          <BannerSlider />
          <CampaignSlide />
          <GetToKnow />
          {/* <RunningCampaignStages /> */}
          <CandidateSlide />
          {/* <UpcommingCampaign />
          <UpcommingCompetionStageSlide /> */}
          <FaqSection />
          <Sponser />
          <NewsUpdate />
      </PublicLayout>
    </>
  );
}

export default Home
