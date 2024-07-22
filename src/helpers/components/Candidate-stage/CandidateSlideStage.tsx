/* eslint-disable react/jsx-key */
"use client";
import React, { useEffect, useRef, useState } from "react";
import { orgID } from "@/utils/constants/constants";
import { A11y, Navigation, Pagination } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Controller from "@/helpers/ui/Controller";
import { Contestants } from "@/utils/schema/ApiInterface";
import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from "@/helpers/hooks/useStoreHooks";
import { CommonSection, Heading } from "@/helpers/dynamic-imports/ui";
import ContestantBox from "@/helpers/ui/ContestantBox";
import { Skeleton } from "@nextui-org/react";
import { GetCandidatesByVotingCamapign } from "@/helpers/redux/candidates/_thunks";
import axios from "axios";
import { AuthSlice } from "@/helpers/redux/Auth/AuthSlice";
import { dataService } from "@/utils/data/api/dataServices";
import SkeletonCampaign from "../Skeleton/SkeletonCampaign";
import SkeletonImage from "../Skeleton/SkeletonImage";

type Params = {
  id: string;
};
const ContestantSlideStage: React.FC<{ params: Params }> = ({ params }) => {
  const dispatch = useAppDispatch();
  const isMounted = useRef(false);
  const { x_api_key } = useAppSelector((state: RootState) => state.Auth); // Access state.Auth
  const [xApiKeyFetched, setXApiKeyFetched] = useState(false);

  async function getXApiKey() {
    // const response = await axios.get(`${process.env.NEXT_PUBLIC_VOTING_IDENTITY_URI}/x-api-key/${orgID}`);
    const response = await axios.get(
      "https://apiauth.easyvotingapp.com/v1/x-api-key/" + orgID
    );

    const x_api_key = response?.data.data.token;
    dispatch(AuthSlice.actions.setXApiKey(x_api_key));
    dataService.setApiKey(x_api_key);
  }

  useEffect(() => {
    const fetchData = async () => {
      if (!isMounted.current) {
        isMounted.current = true;
        if (!x_api_key) {
          try {
            await getXApiKey();
            setXApiKeyFetched(true);
            dispatch(GetCandidatesByVotingCamapign(params.id));
          } catch (error) {}
        } else {
          setXApiKeyFetched(true);
          dataService.setApiKey(x_api_key);
          dispatch(GetCandidatesByVotingCamapign(params.id));
        }
      }
    };

    fetchData();
  }, [xApiKeyFetched]);

  const { all_candidates_by_campaign_id_data } = useAppSelector(
    (state: RootState) => state.Candidates
  ); // Access state.Candidates
  const { isPending, isFulfilled, isRejected, fulfilledResponse } =
    all_candidates_by_campaign_id_data;
  const CandidatesData: Contestants[] = fulfilledResponse?.data.rows;

  return (
    <>
      <CommonSection name="candidate-slide-stage bg-[var(--pagebg)]">
        <Heading title="Contestants" link={`/contestants/`} />
        <div className="grid md:grid-cols-5 gap-2 content-center justify-center">
      
            {isPending && isRejected ? (
              <>
                {[1, 2, 3,4].map((key: number) => (
                  <SkeletonImage isLoading={true}></SkeletonImage>
                ))}
              </>
            ) : (
              <>
                {CandidatesData?.map(
                  (candidates: Contestants, index: number) => (
                      <ContestantBox key={index} contestants={candidates} />
                  )
                )}
              </>
            )}
        </div>
      </CommonSection>
    </>
  );
};

export default ContestantSlideStage;
