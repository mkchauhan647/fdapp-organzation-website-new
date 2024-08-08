"use client";
import * as React from "react";
import { PublicLayout } from "@/helpers/dynamic-imports/views";
import {
  CategorySlide,
  CandidateSlideStage,
} from "@/helpers/dynamic-imports/components";
import CampaignBanner from "@/helpers/sections/campaignBanner";
import JudgeSlide from "@/helpers/components/judges/Judges";

const CompetitionTypeListPage: React.FC<{ params: any }> = ({ params }) => {
  return (
    <>
      <PublicLayout>
        <CampaignBanner campaignID={params.id} />
        {/* <CandidateSlideStage params={params} /> */}
        <CategorySlide id={params.id} />
        <JudgeSlide campaignId={params.id} />

      </PublicLayout>
    </>
  );
};

export default CompetitionTypeListPage;
