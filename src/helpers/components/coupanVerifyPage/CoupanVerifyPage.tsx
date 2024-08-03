import React, { useEffect } from "react";
import {
  useAppDispatch,
  RootState,
  useAppSelector,
} from "@/helpers/hooks/useStoreHooks";
import { GetCandidatesByVotingCamapign } from "@/helpers/redux/candidates/_thunks";
import { Contestants } from "@/utils/schema/ApiInterface";
import { dataService } from "@/utils/data/api/dataServices";
import Image from "next/image";
import { CouponsVerifyPageProps } from "@/utils/schema/confirmVotingInterface";
import { useRouter } from "next/navigation";

const CouponsVerifyPage: React.FC<CouponsVerifyPageProps> = ({ query }) => {
  const { fullName, email, couponName, couponPrice, candidateId, campaignID } =
    query;

  const { all_candidates_by_campaign_id_data } = useAppSelector(
    (state: RootState) => state.Candidates
  );
  const { x_api_key } = useAppSelector((state: RootState) => state.Auth);

  const Candidates: Contestants[] =
    all_candidates_by_campaign_id_data.fulfilledResponse?.data?.rows || [];

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (campaignID) {
      dataService.setApiKey(x_api_key);
      dispatch(GetCandidatesByVotingCamapign(campaignID));
    }
  }, [campaignID, x_api_key, dispatch]);

  const candidate = Candidates.find((c) =>
    c.votingStageCandidates.some((vsc) => vsc.id === candidateId)
  );

  const router = useRouter()
  const cancelBtn = ()=>{
  router.back()
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 p-6">
      <div className="flex flex-col sm:flex-row bg-white shadow-lg rounded-lg p-6 max-w-6xl w-full h-[400px] items-center">
        <div className="sm:w-1/3 flex flex-col justify-center items-center mb-6 sm:mb-0">
          <Image
            src={
              (process.env.NEXT_PUBLIC_AWS_URI as string) +
              (candidate?.profilePicture || "")
            }
            alt="Candidate Profile"
            width={300}
            height={300}
            className="w-32 h-32 rounded-full object-cover"
          />
          <div className="mt-4 text-center">
            <div className="text-lg font-light text-gray-800 py-1">
              {candidate?.name || "Candidate Name"}
            </div>
          </div>
        </div>
        <div className="sm:w-2/3 p-4">
          <div className="flex flex-col justify-center items-center">
            <h2 className="text-2xl font-bold mb-4">Confirm Voting</h2>
            <div className="text-lg mb-4">
              <p className="">Number of Votes: <span>{couponName}</span> </p>
              <p className="">Amount (NPR): <span> {couponPrice} </span> </p>
              <p className="">
                Voter: {fullName}, {email}
              </p>
            </div>
            <div className="flex space-x-4 mb-4">
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-5  border rounded-full hover:bg-blue-600"
              >
                Pay With Card
              </button>
              <span
                className="text-orange-500 cursor-pointer py-2 px-4"
                onClick={() => cancelBtn()}
              >
                Cancel
              </span>
            </div>
            <div className="text-red-500 text-xs">
              Kindly ensure your card is activated for e-commerce transactions.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CouponsVerifyPage;
