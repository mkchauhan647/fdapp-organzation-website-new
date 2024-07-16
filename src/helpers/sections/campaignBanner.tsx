/* eslint-disable react-hooks/exhaustive-deps */

"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import Link from "next/link";
import { DynamicCountDown } from "@/helpers/dynamic-imports/components";
import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from "@/helpers/hooks/useStoreHooks";
import { VotingCampaign } from "@/utils/schema/ApiInterface";
import { capitalize } from "@/utils/methods/common";
import { GetCampaignByID } from "../redux/voting-campaign/_thunks";
import { orgID } from "@/utils/constants/constants";
import { AuthSlice } from "../redux/Auth/AuthSlice";
import axios from "axios";
import { dataService } from "@/utils/data/api/dataServices";

const CampaignBanner: React.FC<{ campaignID?: string }> = ({ campaignID }) => {
  const { x_api_key } = useAppSelector((state: RootState) => state.Auth); // Access state.Auth
  const [xApiKeyFetched, setXApiKeyFetched] = useState(false);
  const isMounted = useRef(false);
  const dispatch = useAppDispatch();

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
      if (!isMounted.current && campaignID) {
        isMounted.current = true;
        if (!x_api_key) {
          try {
            await getXApiKey();
            setXApiKeyFetched(true);
            dispatch(GetCampaignByID(campaignID));
          } catch (error) {}
        } else {
          setXApiKeyFetched(true);
          dispatch(GetCampaignByID(campaignID));
        }
      }
    };

    fetchData();
  }, [xApiKeyFetched]);

  const { all_upcomming_campaign, campaign_by_id } = useAppSelector(
    (state: RootState) => state.VotingCampaign
  ); // Access state.Products.all_products_data directly
  const { fulfilledResponse, isFulfilled, isPending, isRejected } =
    all_upcomming_campaign;
  const BannerData: VotingCampaign = fulfilledResponse?.data.rows[0];
  const individualCampaign: VotingCampaign =
    campaign_by_id.fulfilledResponse?.data;

  console.log("Banner", BannerData);

  return (
    <>
      <section className="Hero-section -has-dynamic-timer -is-hero">
        <div className="h-fit">
          <div
            className={`banner w-full ${
              campaignID && individualCampaign
                ? "h-[30vh] md:h-[40vh]"
                : "min-h-[40vh] sm:min-h-[60vh]"
            } text-[#eeeeee] flex`}
            style={{
              backgroundImage:
                campaignID && individualCampaign
                  ? `url(${
                      process.env.NEXT_PUBLIC_AWS_URI +
                      individualCampaign.banner
                    })`
                  : `url(${
                      process.env.NEXT_PUBLIC_AWS_URI + BannerData?.banner
                    })`,
            }}
          >
            <div className="md:max-w-[598px] max-w-[90%] lg:max-w-[60%] w-[100%] mx-auto flex flex-col items-center justify-center banner-content">
              {campaignID && individualCampaign && (
                <>
                  <div className="flex flex-col items-center gap-2 py-10">
                    <div>
                      <h1
                        className="font-secular font-extrabold text-[20px] md:text-[30px] leading-[30px] text-center 
                                             text-white"
                      >
                        {individualCampaign.title}
                      </h1>
                    </div>
                    <div className="flex gap-1 items-center">
                      <Link href={`/`}>
                        <p className="page-top-prevpath">Home</p>
                      </Link>
                      <IoIosArrowForward />
                      {campaignID && individualCampaign && (
                        <>
                          <Link href={`/campaign`}>
                            <p className="page-top-prevpath">Campaign</p>
                          </Link>
                          <IoIosArrowForward />
                        </>
                      )}
                      <p className="page-top-path text-[--c-secondary]">
                        {individualCampaign.title.split(" ").at(0)}
                      </p>
                    </div>
                  </div>
                </>
              )}
              {!campaignID &&
                isFulfilled &&
                !isPending &&
                !isRejected &&
                BannerData && (
                  <>
                    <div className="text-center">
                      <Image
                        src="/image/home/title.png"
                        height={90}
                        width={90}
                        alt="title"
                        className="object-cover w-[30px] h-[30px] md:w-[100%] md:h-[100%] mb-[10px]"
                      />
                    </div>
                    <div className="text-center flex flex-col mb-[20px]">
                      <h2 className="font-secular font-extrabold mb-[10px] md:mb-[20px] text-[20px] md:text-[35px] leading-[30px]  md:leading-[30px] text-white">
                        {BannerData.title.toUpperCase()}
                      </h2>
                      <p className="font-ubuntu text-[16px] md:text-[20px] font-[400] text-white">
                        {capitalize(BannerData.description)}
                      </p>
                    </div>

                    <DynamicCountDown targetDate={BannerData.startDateTime} />
                  </>
                )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CampaignBanner;
