import { CompetionType } from "@/utils/constants/constants";
import { getTimeStatus } from "@/utils/methods/common";
import { VotingCampaign } from "@/utils/schema/ApiInterface";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaClock } from "react-icons/fa";
import TitleBtn from "./TitleBtn";

const CompetitionBox = ({
  link,
  ...campaign
}: Partial<VotingCampaign> & { link: string }) => {
  return (
    <Link href={link}>
      <div
        className="flex flex-col justify-between gap-[5px] contestant-box shadow hover:shadow-md transition-ease duration-300
             rounded-md px-[3px] py-[5px] md:px-[5px] md:py-[7px] md:h-[18rem]"
      >
        <div className="rounded-md h-[55%]">
          <Image
            src={(process.env.NEXT_PUBLIC_AWS_URI as string) + campaign.logo}
            height={500}
            width={900}
            alt="img"
            className="h-[100%] w-[100%] object-cover object-center rounded-md aspect-[5/3]"
          />
        </div>
        <div className="flex flex-col justify-between mt-[5px] h-[40%] p-[.2rem]">
          <h4 className="md:text-[18px] text-[14px] font-[600] text-[var(--blue)] capitalize leading-[21px] line-clamp-2">
            {campaign.title}
          </h4>

          <div className="flex flex-col gap-[.8rem]">
            <div className="flex items-center gap-[.5rem]">
              <FaClock className="fill-[var(--c-primary)] text-[1rem]" />
              <p className="md:text-[14px] text-[10px] text-[var(--blue)]">
                {
                  getTimeStatus(
                    campaign.startDateTime as string,
                    campaign.endDateTime as string
                  ).status
                }{" "}
                in{" "}
                {
                  getTimeStatus(
                    campaign.startDateTime as string,
                    campaign.endDateTime as string
                  ).timeRemaining
                }
              </p>
            </div>

            <div className="flex gap-[.5rem]">
              <TitleBtn title={campaign?.description ?? ""} type="color" />
              <TitleBtn
                title={`${campaign?.candidateCount} Contestants`}
                type="light"
              />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CompetitionBox;
