"use client";
import { CouponsVerifyPage } from "@/helpers/dynamic-imports/components";
import { PublicLayout } from "@/helpers/dynamic-imports/views";
import { Coupon } from "@/utils/schema/ApiInterface";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const VerifyPage = () => {
  const router = useRouter()
  const [data, setData] = useState<{
    votes: string | null;
    pricing: string | null;
    campaignID: string | null;
    candidateId: string | null;
    eligibleCandidateCounts: string | null;
    coupons: Coupon
  } | null>(null);


  useEffect(() => {
    // Retrieve data from localStorage
    const savedData = localStorage.getItem('selectedCoupon');
    const candidateId = localStorage.getItem("candidateId");

  
    if (savedData) {
      // Parse the data
      const parsedData = JSON.parse(savedData);
      
      // Set the data to state
      setData({
        coupons:{
          id: parsedData.id,
          name: parsedData.name,
          votingCampaignId: parsedData.votingCampaignId,
          votes: parsedData.votes || null,
          eligibleCandidateCounts: parsedData.eligibleCandidateCounts||null,
          pricing: parsedData.pricing || null,
          avaibilityPeriodStart: parsedData.avaibilityPeriodStart || null,
          avaibilityPeriodEnd: parsedData.avaibilityPeriodEnd || null,
          currency: parsedData.currency || null,
          organizationID: parsedData.organizationID || null,
          candidateId: parsedData.candidateId || null,
        },
        votes: parsedData.votes || null,
        pricing: parsedData.pricing || null,
        campaignID: parsedData.votingCampaignId || null,
        eligibleCandidateCounts: parsedData.eligibleCandidateCounts||null,
        candidateId: candidateId || null,
      });
    }
    else {
      // Redirect to home page if no data is found
      router.push("/");
    }
  }, []);

  console.log(data)

  return (
    <div>
      <PublicLayout>
        {data ? <CouponsVerifyPage query={data} /> : <p>No data...</p>}
      </PublicLayout>
    </div>
  );
};

export default VerifyPage;

// fullName: string;
// email: string;
// candidateId: string;
// campaignID: string;
// coupon?: Coupon | null;


// id: string;
//   name: string;
//   votingCampaignId: string;
//   votes: number;
//   eligibleCandidateCounts: number;
//   pricing: number;
//   avaibilityPeriodStart: string;
//   avaibilityPeriodEnd: string;
//   currency: string;
//   organizationID: string;
//   candidateId: string;