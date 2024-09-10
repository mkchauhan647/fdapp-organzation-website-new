import { RootState, useAppSelector } from "@/helpers/hooks/useStoreHooks";
import CommonSection from "@/helpers/ui/CommonSection";
import about1 from "/public/image/about/about.jpg";
import about2 from "/public/image/about/about1.jpg";
import Image from "next/image";
import * as React from "react";

const GetToKnow: React.FC = () => {
  const { all_org_setting_data } = useAppSelector(
    (state: RootState) => state.OrgSetting
  );
  const fulfilledResponseOrg = all_org_setting_data?.fulfilledResponse;

  let orgSettingData: any = null;

  if (fulfilledResponseOrg?.data && Array.isArray(fulfilledResponseOrg.data)) {
    [orgSettingData] = fulfilledResponseOrg.data;
  }
  <div className="border-1 w-6"></div>;

  return (
    <>
      <section className="gettoknow pb-8 sm:pb-12 bg-bgColor">
        <div className="container mx-auto">
          <div className="flex md:flex-row flex-col gap-[4rem] md:gap-[1rem] w-full py-[3rem] border-t-2">
            <div className="md:w-[50%] w-full flex flex-col items-start gap-[1rem]">
              <div className="flex flex-col gap-[.5rem]">
                <div className="flex items-center gap-4">
                  <p className="paragraph text-secondary font-bold">About Us</p>
                  <div className="border-1 w-6 border-secondary"></div>
                </div>
                <span>
                  <h1 className="text-[2rem] font-[700] text-[var(--blue)] w-[80%]">
                    Your{" "}
                    <span className="text-[2rem] font-[700] text-[var(--orange)]">
                      Ultimate
                    </span>{" "}
                    Contestant Voting Solution
                  </h1>
                </span>

                <span>
                  {/* <p className='paragraph text-[var(--light-text-color)]'>{orgSettingData?.knowUsBody}</p> */}
                  <p className="paragraph text-textColor">
                    Discover EasyVotingApp, the ultimate solution for managing
                    SMS and email-based voting contests with ease. Whether
                    you&apos;re hosting a talent show, a community poll, or any
                    other voting event, EasyVotingApp simplifies the process and
                    ensures a seamless experience for both participants and
                    voters.
                  </p>
                </span>
              </div>
              <div>
                <button className="btn-primary">Read More</button>
              </div>
            </div>
            <div className="md:w-[50%] w-full  gap-10 relative">
              <div className="flex gap-10">
                <Image
                  src={about1}
                  width={400}
                  height={300}
                  alt="gtk-banner"
                  className="w-[45%] h-[25rem] md:h-[20rem] rounded-md shadow-md"
                />
                <Image
                  src={about2}
                  width={400}
                  height={300}
                  alt="gtk-banner"
                  className="w-[45%] h-[25rem] md:h-[20rem] rounded-md shadow-md"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default GetToKnow;
