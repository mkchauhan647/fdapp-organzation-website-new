"use client";

import PublicLayout from "@/views/layouts/publicLayout";
import React, { useEffect } from "react";
import CouponsPage from "@/helpers/components/coupanPage/pageCoupan";

const Page = ({
  params,
}: {
  params: { campaignID: string; candidateId: string };
}) => {
  const { campaignID, candidateId } = params;

  return (
    <PublicLayout>
      {/* <h1>Coupons for candidateId: {candidateId}</h1> */}
      <CouponsPage campaignID={campaignID} candidateId={candidateId} />
    </PublicLayout>
  );
};

export default Page;
