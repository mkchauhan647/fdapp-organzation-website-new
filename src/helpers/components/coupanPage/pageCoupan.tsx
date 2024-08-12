"use client";

import React, { useEffect, useState } from "react";
import {
  useAppDispatch,
  useAppSelector,
  RootState,
} from "@/helpers/hooks/useStoreHooks";
import { GetCouponsByVotingCampaignID } from "@/helpers/redux/coupons/_thunks";
import { Contestants, Coupon } from "@/utils/schema/ApiInterface";
import Coupan from "@/helpers/ui/Coupan";
import { dataService } from "@/utils/data/api/dataServices";
import { GetCandidatesByVotingCamapign } from "@/helpers/redux/candidates/_thunks";
import Image from "next/image";
import { CoupanInputs } from "@/helpers/dynamic-imports/ui";
import { Button } from "antd";
import Link from "next/link";
import { addCouponToCart } from "@/helpers/redux/coupons/CouponsSlice";
import { useRouter } from "next/navigation";

interface CouponsPageProps {
  campaignID: string;
  candidateId: string;
}

interface AuthState {
  token: string | null;
  user: string;
  x_api_key: string;
}

const CouponsPage: React.FC<CouponsPageProps> = ({
  campaignID,
  candidateId,
}) => {
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);
  const router = useRouter();

  const { token, user }: AuthState = useAppSelector(
    (state: RootState) => state.Auth
  );

  const dispatch = useAppDispatch();
  const { all_coupons_by_campaign_id_data } = useAppSelector(
    (state: RootState) => state.Coupons
  );
  const { all_candidates_by_campaign_id_data } = useAppSelector(
    (state: RootState) => state.Candidates
  );
  const { x_api_key } = useAppSelector((state: RootState) => state.Auth);

  const Coupons: Coupon[] =
    all_coupons_by_campaign_id_data?.fulfilledResponse?.data?.rows || [];
  const Candidates: Contestants[] =
    all_candidates_by_campaign_id_data?.fulfilledResponse?.data?.rows || [];

  useEffect(() => {
    if (campaignID) {
      dataService.setApiKey(x_api_key);
      dispatch(GetCouponsByVotingCampaignID(campaignID));

      if (candidateId) {
        dispatch(GetCandidatesByVotingCamapign(campaignID));
      }
    }
  }, [campaignID, candidateId, dispatch, x_api_key]);

  const candidate = Candidates.find((c) =>
    c.votingStageCandidates.some((vsc) => vsc.id === candidateId)
  );

  return (
    <div className="flex flex-col md:flex-row gap-2 bg-[#F6F4F9] p-10 ">
      {/* Left side for Candidate Information */}
      <div className="w-full md:w-1/2 bg-white shadow-sm rounded-lg p-8 flex flex-col items-center">
        {candidate ? (
          <div className="text-center">
            <Image
              src={process.env.NEXT_PUBLIC_AWS_URI + candidate.profilePicture}
              alt={candidate.name}
              width={300}
              height={300}
              className="rounded-full mx-auto mb-4 object-contain"
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
      <div className="w-full md:w-1/2 bg-white shadow-sm rounded-lg p-8">
        <h1 className="text-3xl font-bold mb-6">Available Coupons</h1>
        <p className="mb-2 text-base font-medium">Select Number of Votes</p>
        <div className="flex gap-3 flex-wrap">
          {Coupons.length === 0 ? (
            <p className="text-center mt-8">No Coupons available</p>
          ) : (
            <>
              <div className="flex gap-2 flex-wrap w-full">
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
                <div className=" mt-4">
                  <h3 className=" text-xl">
                    Price:{" "}
                    <span className=" font-semibold">
                      {selectedCoupon.pricing} Rs
                    </span>
                  </h3>

                  <div className="mt-10 flex gap-4 w-full items-center">
                    <Button
                      className=" p-7 rounded-md bg-primary text-white flex items-center justify-center w-auto font-medium"
                      onClick={() => {
                        dispatch(
                          addCouponToCart({
                            coupon: selectedCoupon,
                            candidateId,
                          })
                        );
                        router.push(user ? "/coupons/verifyPage" : "/register");
                      }}
                    >
                      {user ? "submit" : "Register and Pay"}
                      {/* Register and Pay */}
                    </Button>
                    {!user && <p>Or</p>}

                    {!user && (
                      <Button
                        className=" p-7 rounded-md bg-[var(--c-secondary)] text-white flex items-center justify-center w-auto font-medium"
                        onClick={() => {
                          dispatch(
                            addCouponToCart({
                              coupon: selectedCoupon,
                              candidateId,
                            })
                          );
                          router.push("/coupons/verifyPage");
                        }}
                      >
                        Guest Checkout
                      </Button>
                    )}
                  </div>
                </div>

                // <CoupanInputs
                //   campaignID={campaignID}
                //   coupon={selectedCoupon}
                //   candidateId={candidateId}
                // />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CouponsPage;
