"use client";

import PublicLayout from "@/views/layouts/publicLayout";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/helpers/hooks/useStoreHooks";
import { GetCouponsByVotingCampaignID } from "@/helpers/redux/coupons/_thunks";
import { CouponsPage } from "@/helpers/dynamic-imports/components";

const Page = ({ params }: { params: { campaignID: string; candidateId: string } }) => {
  const { campaignID, candidateId } = params;

  return (
    <PublicLayout>
      <h1>Coupons for candidateId: {candidateId}</h1>
      <CouponsPage
        campaignID={campaignID}
        candidateId={candidateId}
      />
    </PublicLayout>
  );
};

export default Page;
