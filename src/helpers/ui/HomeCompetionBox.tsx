import { CompetionType } from "@/utils/constants/constants";
import { getTimeStatus } from "@/utils/methods/common";
import { VotingCampaign } from "@/utils/schema/ApiInterface";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaClock } from "react-icons/fa";
import TitleBtn from "./TitleBtn";

const HomeCompetitionBox = ({
  link,
  ...campaign
}: Partial<VotingCampaign> & { link: string }) => {
  console.log("link of campaign", campaign);

  return (
    <Link href={link} className="block cursor-pointer">
      <div
        style={{
          position: "relative",
          backgroundImage: `url('${
            (process.env.NEXT_PUBLIC_AWS_URI as string) + campaign.banner
          }')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: "10px",
          transition: "all 0.3s ease-in-out",
          cursor: "pointer",
          color: "white",
          fontSize: "20px",
          fontWeight: "bold",
          textTransform: "uppercase",
          padding: "10px",
          boxShadow: "0 5px 10px rgba(0,0,0,0.5)",
        }}
        className="flex gap-[5px] h-[18rem] w-full items-center"
      >
        {/* Gradient overlay */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background:
              "linear-gradient(to bottom, rgba(0.4, 0.4, 0.5, 0.9), rgba(20, 240, 230, 0))",
            borderRadius: "10px",
          }}
        />

        {/* Content area */}
        <div
          style={{ position: "relative", zIndex: 2 }}
          className="flex justify-between items-center w-full ml-10 mr-10"
        >
          <div className="left flex flex-col gap-6">
            <div>
              <h4 className="md:text-[40px] text-[14px] font-[600] text-white capitalize line-clamp-2">
                {campaign.title}
              </h4>
              <div className="flex items-center gap-[.5rem]">
                <FaClock className="text-white text-[1rem]" />
                <p className="md:text-[14px] text-[10px] text-white">
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
            </div>
            <div className="flex gap-[.5rem] flex-col">
              <TitleBtn title={campaign?.description ?? ""} type="color" />
              <TitleBtn
                title={`${campaign?.candidateCount} Contestants`}
                type="light"
              />
            </div>
          </div>
          <div className="right cursor-pointer ">
            <Link className="cursor-pointer z-10" href={link}>
              <span className="bg-[#F58314] hover:bg-[#F58313] px-3 py-2 rounded-full font-normal cursor-pointer">
                Vote Now
              </span>
            </Link>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default HomeCompetitionBox;
