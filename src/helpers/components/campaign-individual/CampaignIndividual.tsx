import { DynamicCountDown } from "@/helpers/dynamic-imports/components";
import { ContestantDetailButton } from "@/helpers/dynamic-imports/ui";
import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from "@/helpers/hooks/useStoreHooks";
import { GetCandidatesByVotingStages } from "@/helpers/redux/voting-campaign-stages.ts/_thunks";
import {
  Candidate,
  VotingCampaignStage,
} from "@/utils/schema/ApiInterface";
import React, { useEffect, useRef, useState } from "react";
import { orgID } from "@/utils/constants/constants";
import axios from "axios";
import { AuthSlice } from "@/helpers/redux/Auth/AuthSlice";
import { dataService } from "@/utils/data/api/dataServices";
import SkeletonCandidate from "../Skeleton/skeletonCandidate";
import { GetCouponsByVotingCampaignID } from "@/helpers/redux/coupons/_thunks";
import { useSearchParams } from "next/navigation";

const CampaignStageIndividual: React.FC<{ id: string | null }> = ({ id }) => {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const campaignId = searchParams.get("campaignId");
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
            id && dispatch(GetCandidatesByVotingStages(id));
            campaignId && dispatch(GetCouponsByVotingCampaignID(campaignId));
          } catch (error) {}
        } else {
          setXApiKeyFetched(true);
          dataService.setApiKey(x_api_key);
          id && dispatch(GetCandidatesByVotingStages(id));
          campaignId && dispatch(GetCouponsByVotingCampaignID(campaignId));
        }
      }
    };

    fetchData();
  }, [xApiKeyFetched]);

  // redux data extraction
  const { all_campaign_stages_Data, candidates_by_voting_stages_data } =
    useAppSelector((state: RootState) => state.VotingCampaignStages);
  const CampaignStageData: VotingCampaignStage =
    all_campaign_stages_Data.fulfilledResponse?.data
      ?.filter((data: VotingCampaignStage) => data.id === id)
      ?.at(0);
  const CandidateStageData: Candidate[] =
    candidates_by_voting_stages_data.fulfilledResponse?.data.rows;

  return (
    <>
      {CampaignStageData && (
        <section className="md:px-28  px-4 bg-[var(--pagebg)] py-10 md:py-20 pb-32">
          <div className="xl:w-[68rem] mx-auto">
            <div className="flex md:flex-row flex-col-reverse gap-2 md:gap-8  grow ">
              <div className="flex-3">
                <h2 className="font-[500] text-lg md:text-2xl mb-3 md:mb-3">
                  {CampaignStageData?.title}
               
               
                </h2>

                <p className="text-justify text-[12px] md:text-[16px] max-w-[40rem]">
                  {CampaignStageData?.description}
                </p>
              </div>

              <div className="flex flex-col md:items-center gap-2 flex-1 ">
                <div className=" overflow-hidden">
                  <p className="font-[500] text-lg md:text-2xl mb-1 md:mb-5 md:text-center">
                    Ends In
                  </p>
                  <DynamicCountDown
                    targetDate={new Date(CampaignStageData.endDateTime)}
                    isBlue={true}
                  />
                </div>
              </div>
            </div>
            <div className="w-full">
              <h3 className="font-[500] text-lg md:text-2xl mb-3"></h3>
              <div className=" grid md:grid-cols-5 sm:grid-cols-3 grid-cols-2  gap-2 content-center justify-center">
                {CandidateStageData?.length != 0 ?
                  CandidateStageData?.map((contestant: Candidate) => {
                    return (
                      <ContestantDetailButton
                        candidate={contestant}
                        key={contestant.id}
                      />
                    );
                  })
                  : (
                    <div className="text-center text-gray-600">No candidates found.</div>
                  )
                }
                {CandidateStageData?.length == 0 &&
                  Array.from({ length: 5 }).map((_, index) => {
                    return (
                      <SkeletonCandidate
                        isLoaded={CandidateStageData.length == 0}
                        key={index}
                      />
                    );
                  })}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default CampaignStageIndividual;
