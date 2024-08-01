"use client";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import { DynamicDetailModal } from "../dynamic-imports/ui";
import DetailModal from "./DetailModal";
import { Candidate, Contestants } from "@/utils/schema/ApiInterface";
import CoupanModal from "./CoupanModal";
import { useRouter } from "next/navigation";

const DetailButton = ({ candidate }: { candidate: Candidate }) => {
  const router = useRouter();

  const openCoupanPage = (campaignID:string , candidateId:string) => {
    router.push(`/coupons/${campaignID}/${candidateId}`);
  };

  return (
    <>
      <div
        id={candidate.id}
        className="details-btn p-[20px] rounded-2xl overflow-hidden bg-white flex justify-center"
      >
        <div className="flex items-center gap-4 w-full flex-col justify-center py-4">
          <div className="h-[120px] w-[120px] overflow-auto rounded-full bg-gray-400">
            <Image
              src={
                (process.env.NEXT_PUBLIC_AWS_URI as string) +
                candidate.candidate.profilePicture
              }
              height={200}
              width={200}
              alt="img"
              className="h-full w-full rounded-full object-cover"
            />
          </div>
          <div className="flex flex-col justify-center items-center leading-none gap-1">
            <h4 className="font-secular font-[400] text-medium text-[var(--blue)] leading-none">
              {candidate.candidate.name}
            </h4>
            <p className="text-sm font-[500] text-[var(--light)]">
              {candidate.candidate.nationality}
            </p>
          </div>
          <button
            onClick={() =>
              openCoupanPage(candidate.candidate.votingCampaignId, candidate.id)
            }
            className="py-2 px-2 bg-[var(--c-secondary)] text-white rounded-lg font-[500] text-[12px]"
          >
            Vote Now
          </button>
          {/* <CoupanModal
            campaignID={candidate.candidate.votingCampaignId}
            candidateId={candidate?.id}
          /> */}
        </div>
      </div>
    </>
  );
};

export default DetailButton;
