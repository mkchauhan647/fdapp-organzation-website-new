import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import Confirm from "./ConfirmModal";
import Image from "next/image";
import { Candidate} from "@/utils/schema/ApiInterface";
import { RootState, useAppDispatch, useAppSelector } from "../hooks/useStoreHooks";
import { WeAcceptPng } from "@/utils/image/image";
import { GetVotingStageCandidateById } from "../redux/voting-campaign-stages.ts/_thunks";

export const PayModal: React.FC<any> = ({ coupon, userdata, candidateId ,stageID}) => {
  const dispatch = useAppDispatch();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [paymentMethod, setPaymentMethod] = useState<
    "ESEWA" | "STRIPE" | "NPS"
  >("NPS");
  const { candidates_by_voting_stages_data, voting_stage_candidate_by_id_data } = useAppSelector(
    (state: RootState) => state.VotingCampaignStages
  );


  const candidates: Candidate[] =
    candidates_by_voting_stages_data.fulfilledResponse?.data.rows || [];



  const selectedCandidates: Candidate[] = candidates.slice(
    0,
    coupon.eligibleCandidateCounts
  );

  // State to track the votes for each candidate
  const [votesPerCandidate, setVotesPerCandidate] = useState<{
    [candidateId: string]: number;
  }>({});




    useEffect(() => {
      // Initialize votesPerCandidate only if it's not already initialized
      if (Object.keys(votesPerCandidate).length === 0) {
        const initialVotes: { [candidateId: string]: number } = {};
        selectedCandidates.forEach((candidate) => {
          initialVotes[candidate.candidateId] = 0;
        });
        setVotesPerCandidate(initialVotes);
      }
      dispatch(GetVotingStageCandidateById(stageID));
    }, [dispatch]);
  
    const votingCampaignStageId = voting_stage_candidate_by_id_data.fulfilledResponse?.data.votingCampaignStageId || '' ;
    console.log("voting"+ votingCampaignStageId)
  const handleOpen = () => {
    onOpen();
  };

  return (
    <>
      <button
        onClick={handleOpen}
        className="bg-blue-500 text-white py-2 px-5  border rounded-full hover:bg-blue-600"
      >
        Pay Online
      </button>

      <Modal backdrop="blur" isOpen={isOpen} onClose={onClose}>
        <ModalContent className="py-3 px-3 max-w-xl">
          {(onClose) => (
            <>
              <ModalBody className="">
                <div className="flex flex-col gap-5">
                  <div className="flex flex-col gap-2">
                    <h3 className="text-xl font-[500] text-black font-secular">
                      Coupan Name:{" "}
                      <span className=" text-2xl text-[var(--blue)] ">
                        {coupon.name}{" "}
                      </span>
                    </h3>
                    <div className="flex gap-3">
                      <span className="px-2 py-1 bg-[var(--c-rose-pink)] text-[--c-secondary] font-[500] rounded-md">
                        Vote Counts: {coupon.votes}
                      </span>
                    </div>
                  </div>

                  <div className="">
                    <p className="text-lg text-[var(--blue)] font-[500] mb-2">
                      Select Payment Method
                    </p>

                    <div className="flex gap-5">
                      <label className="border relative h-fit rounded-lg">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="NPS"
                          onClick={(e: any) => {
                            setPaymentMethod(e.target.value);
                          }}
                          className="absolute inset-0 opacity-[0]"
                        />
                        <Image
                          src="/image/payment/pay-online-btn.png"
                          height={100}
                          width={900}
                          alt="eSewa"
                          className="h-[5rem] w-[9rem] object-contain"
                        />
                        <div
                          className={`absolute top-0 left-0 right-0 bottom-0 border-[var(--btncolor)] rounded-lg transition-all
                                                ${
                                                  paymentMethod === "NPS"
                                                    ? "border-1"
                                                    : "bottom-10"
                                                }`}
                        />
                      </label>

                      <label className="border relative h-fit rounded-lg">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="ESEWA"
                          onClick={(e: any) => {
                            setPaymentMethod(e.target.value);
                          }}
                          className="absolute inset-0 opacity-[0]"
                        />
                        <Image
                          src="/image/payment/esewa.png"
                          height={100}
                          width={900}
                          alt="eSewa"
                          className="h-[5rem] w-[9rem] object-contain"
                        />
                        <div
                          className={`absolute top-0 left-0 right-0 bottom-0 border-[var(--btncolor)] rounded-lg transition-all ${
                            paymentMethod === "ESEWA" ? "border-1" : "border-10"
                          }`}
                        />
                      </label>

                      <label className="border relative h-fit rounded-lg">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="STRIPE"
                          onClick={(e: any) => {
                            setPaymentMethod(e.target.value);
                          }}
                          className="absolute inset-0 opacity-[0]"
                        />
                        <Image
                          src={WeAcceptPng}
                          height={100}
                          width={900}
                          alt="Stripe"
                          className="h-[5rem] w-[9rem] object-contain"
                        />
                        <div
                          className={`absolute top-0 left-0 right-0 bottom-0 border-[var(--btncolor)] rounded-lg transition-all ${
                            paymentMethod === "STRIPE"
                              ? "border-1"
                              : "border-10"
                          }`}
                        />
                      </label>
                    </div>
                  </div>

                  <div className="">
                  
                  </div>
                </div>
              </ModalBody>
              <ModalFooter className="mt-3">
                <div className="w-full flex justify-between items-center">
                  <p className="text-3xl font-[500] text-[var(--blue)] font-secular">
                    NPR {coupon.pricing}
                  </p>
                  <Confirm
                   votingCampaignStageId= {votingCampaignStageId}
                    userData ={userdata}
                    paymentMethod={paymentMethod}
                    candidateId={candidateId}
                    candidateVotes= {coupon.votes}
                    coupon={coupon}
                  />
                </div>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
