"use client";

import React, { useEffect } from "react";
import { useAppDispatch, RootState, useAppSelector } from "@/helpers/hooks/useStoreHooks";
import { GetCouponsByVotingCampaignID } from "@/helpers/redux/coupons/_thunks";
import { Coupon } from "@/utils/schema/ApiInterface";
import Coupan from "@/helpers/ui/Coupan";
import { useRouter } from "next/navigation";
import { dataService } from "@/utils/data/api/dataServices";

interface CouponsPageProps {
  campaignID: string;
  candidateId: string;
}

const CouponsPage: React.FC<CouponsPageProps> = ({ campaignID, candidateId }) => {
  const { all_coupons_by_campaign_id_data } = useAppSelector(
    (state: RootState) => state.Coupons
  );
  const { token, x_api_key } = useAppSelector((state: RootState) => state.Auth);

  // Initialize Coupons as an empty array
  const Coupons: Coupon[] = all_coupons_by_campaign_id_data.fulfilledResponse?.data?.rows;

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (campaignID) {
      dataService.setApiKey(x_api_key);
      dispatch(GetCouponsByVotingCampaignID(campaignID));
    }
  }, [campaignID, x_api_key]);

  return (
    <div>
      <h1>Available Coupons</h1>
      <div>
        {Coupons?.length > 0 ? (
          Coupons.map((coupon, index) => (
            <Coupan coupon={coupon} key={index} candidateId={candidateId} />
          ))
        ) : (
          <p>No coupons available</p>
        )}
      </div>
    </div>
  );
};

export default CouponsPage;
