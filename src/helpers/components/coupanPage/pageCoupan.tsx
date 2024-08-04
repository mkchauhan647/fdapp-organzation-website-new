"use client";
import React, { useEffect, useState } from "react";
import {
  useAppDispatch,
  RootState,
  useAppSelector,
} from "@/helpers/hooks/useStoreHooks";
import { GetCouponsByVotingCampaignID } from "@/helpers/redux/coupons/_thunks";
import { Contestants, Coupon } from "@/utils/schema/ApiInterface";
import Coupan from "@/helpers/ui/Coupan";
import { dataService } from "@/utils/data/api/dataServices";
import { GetCandidatesByVotingCamapign } from "@/helpers/redux/candidates/_thunks";
import Image from "next/image";
import { CoupanInputs } from "@/helpers/dynamic-imports/ui";

interface CouponsPageProps {
  campaignID: string;
  candidateId: string;
}

const CouponsPage: React.FC<CouponsPageProps> = ({
  campaignID,
  candidateId,
}) => {
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);

  const { all_coupons_by_campaign_id_data } = useAppSelector(
    (state: RootState) => state.Coupons
  );
  const { all_candidates_by_campaign_id_data } = useAppSelector(
    (state: RootState) => state.Candidates
  );
  const { token, x_api_key } = useAppSelector((state: RootState) => state.Auth);

  const Coupons: Coupon[] =
    all_coupons_by_campaign_id_data.fulfilledResponse?.data?.rows || [];
  const Candidates: Contestants[] =
    all_candidates_by_campaign_id_data.fulfilledResponse?.data?.rows || [];

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (campaignID) {
      dataService.setApiKey(x_api_key);
      dispatch(GetCouponsByVotingCampaignID(campaignID));
      if (candidateId) {
        dataService.setApiKey(x_api_key);
        dispatch(GetCandidatesByVotingCamapign(campaignID));
      }
    }
  }, [campaignID, x_api_key, candidateId]);

  // Find the specific candidate by ID
  const candidate = Candidates.find((c) =>
    c.votingStageCandidates.some((vsc) => vsc.id === candidateId)
  );

  return (
    <div className="flex gap-2 bg-[#F6F4F9] p-10">
      {/* Left side for Candidate Information */}
      <div className="w-1/2 bg-[#FFFFFF] shadow-sm rounded-lg p-8 flex flex-col items-center">
        {candidate ? (
          <div className="text-center">
            <Image
              src={process.env.NEXT_PUBLIC_AWS_URI + candidate.profilePicture}
              alt={candidate.name}
              width={150}
              height={150}
              className="rounded-full mx-auto mb-4"
            />
            <p className="text-xl font-semibold mb-2">{candidate.name}</p>
            <p className="text-gray-600 mb-4 max-w-[500px]">
              {candidate.biography}
            </p>
          </div>
        ) : (
          <p>Candidate information not available</p>
        )}
      </div>

      {/* Right side for Coupons */}
      <div className="w-1/2 p-8 bg-[#FFFFFF] shadow-sm rounded-lg">
        <h1 className="text-3xl font-bold mb-6">Available Coupons</h1>
        <p className="mb-2 text-base font-medium">Select Number of Votes</p>
        <div className="flex gap-3 flex-wrap">
          {Coupons.length > 0 ? (
            <div className="w-full">
              <div className="flex gap-2 flex-wrap">
                {Coupons.map((coupon, index) => (
                  <div key={index} onClick={() => setSelectedCoupon(coupon)}>
                    <Coupan
                      coupon={coupon}
                      selectedCoupon={selectedCoupon}
                      candidateId={candidateId}
                    />
                  </div>
                ))}
              </div>
              {selectedCoupon && (
                <CoupanInputs
                  campaignID={campaignID}
                  coupon={selectedCoupon}
                  candidateId={candidateId}
                />
              )}
            </div>
          ) : (
            <p>No coupons available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CouponsPage;
