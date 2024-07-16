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
        <div className="competition-slider px-2 sm:px-0 flex justify-between items-baseline relative">
          <Swiper
            className="w-[100%] !pb-16"
            modules={[Navigation, Pagination, A11y]}
            spaceBetween={40}
            slidesPerView={6}
            loop={true}
            navigation={{
              nextEl: ".forward",
              prevEl: ".back",
            }}
            pagination={{ clickable: true }}
            breakpoints={{
              0: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              358: {
                slidesPerView: 1.5,
                spaceBetween: 20,
              },
              485: {
                slidesPerView: 2.5,
                spaceBetween: 20,
              },
              735: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              955: {
                slidesPerView: 4,
                spaceBetween: 20,
              },
              1045: {
                slidesPerView: 6,
              },
            }}
          >
            {!isPending &&
              !isRejected &&
              isFulfilled &&
              CandidatesData.length > 0 &&
              CandidatesData.slice(0, 8).map(
                (candidate: Contestants, index: number) => {
                  return (
                    <SwiperSlide key={index}>
                      {/* <Skeleton isLoaded={isPending || isRejected}> */}
                      <ContestantBox contestants={candidate} />
                      {/* </Skeleton> */}
                    </SwiperSlide>
                  );
                }
              )}
            {CandidatesData?.length == 0 &&
              Array.from({ length: 8 }).map((_, index) => {
                return (
                  <SwiperSlide key={index}>
                    <SkeletonCampaign isloading={false} />
                  </SwiperSlide>
                );
              })}
          </Swiper>
          <div className="controller_wrapper">
            <Controller />
          </div>
        </div>
      </CommonSection>
    </>
  );
};

export default ContestantSlideStage;
