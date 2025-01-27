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
    <Link href={link} className="">
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

      {/* <div
        style={{
          position: "relative", 
          backgroundImage: `url('${
            (process.env.NEXT_PUBLIC_AWS_URI as string) + campaign.logo
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
          overflow: "hidden",
          boxShadow: "0 5px 10px rgba(0,0,0,0.5)",
        }}
        className="flex gap-[5px] h-[18rem] w-full items-center"
      >
     
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
            pointerEvents: "none",
            zIndex: 1, // Ensure the gradient stays behind the content
          }}
        />

        <div style={{ position: "relative", zIndex: 2 }} className=" flex justify-between items-center w-full ml-10 mr-10">
          <div className="left flex flex-col gap-6">
            <div>
              <h4 className="md:text-[40px] text-[14px] font-[600] text-white capitalize  line-clamp-2">
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
          <div className="right cursor-pointer">
            <button className="bg-[#F58314] px-3 py-2 rounded-full font-normal cursor-pointer">Vote Now</button>
          </div>
        </div>


      </div> */}
    </Link>
  );
};

export default CompetitionBox;
