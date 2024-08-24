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

import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Controller from "../ui/Controller";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import SkeletonBanner from "../components/Skeleton/SkeletonBanner";
import banner from "../../utils/image/banner.jpg";
const BannerSlider: React.FC<{ campaignID?: string }> = ({ campaignID }) => {
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

  // const { all_upcomming_campaign, campaign_by_id } = useAppSelector(
  //   (state: RootState) => state.VotingCampaign
  // ); // Access state.Products.all_products_data directly
  // const { fulfilledResponse, isFulfilled, isPending, isRejected } =
  //   all_upcomming_campaign;
  // const BannerData: VotingCampaign[] = fulfilledResponse?.data.rows;
  // const individualCampaign: VotingCampaign =
  //   campaign_by_id.fulfilledResponse?.data;

  // console.log(fulfilledResponse?.data.rows);
  const { all_campaign_data } = useAppSelector(
    (state: RootState) => state.VotingCampaign
  ); // Access state.VotingCampaign
  const { isPending, isRejected, fulfilledResponse } = all_campaign_data;
  const CampaignData = fulfilledResponse?.data.rows;
  console.log(CampaignData);

  return (
    <>
      <section className="Hero-section -has-dynamic-timer -is-hero">
        <div className="h-fit">
          <div
            className={`sliderbanner w-full ${
              campaignID
                ? "h-[30vh] md:h-[40vh]"
                : "min-h-[40vh] sm:min-h-[60vh]"
            } text-[#eeeeee] flex`}
          >
            <Swiper
              className="w-full lg:h-screen text-white"
              modules={[Navigation, Pagination, A11y, Autoplay]}
              spaceBetween={30}
              slidesPerView={1}
              loop={true}
              autoplay={{
                delay: 3000, // 3 seconds delay between slides
                disableOnInteraction: false,
              }}
              navigation={{
                nextEl: ".b-forward",
                prevEl: ".b-back",
              }}
              pagination={{ clickable: true }}
            >
              {!isPending && !isRejected && CampaignData?.length > 0
                ? CampaignData.map(
                    (bannerdata: VotingCampaign, index: number) => (
                      <SwiperSlide key={bannerdata.id} className="relative">
                      <Link href={`/campaign/${bannerdata.id}`}>
                        <div className="relative flex items-center text-center justify-center">
                          <Image
                            src={(process.env.NEXT_PUBLIC_AWS_URI as string) + bannerdata.banner}
                            height={1000}
                            width={3000}
                            alt="Banner"
                            className="h-full w-full object-cover"
                          />
                          <h3 className="absolute flex text-center items-center justify-center z-20 text-white text-xl md:text-5xl font-bold leading-8 ">
                            FDApp: Your Voice, Your Vote.  <br></br>  Secure easy, and just a click away
                          </h3>
                        </div>
                      </Link>
                    </SwiperSlide>
                    )
                  )
                : Array.from({ length: 3 }).map((_, index: number) => {
                    return (
                      <SwiperSlide key={index}>
                        {/* <SkeletonBanner
                          isloading={
                            isPending ||
                            isRejected ||
                            BannerData?.length == 0 ||
                            !BannerData
                          }
                        /> */}
                        <Link href={`/campaign`} key={index}>
                          <Image
                            src={banner}
                            height={1800}
                            width={1800}
                            alt="Banner"
                            className="h-full w-full object-cover"
                          />
                        </Link>
                      </SwiperSlide>
                    );
                  })}
              <div className="controller_wrapper">
                <div className="absolute top-[40%] translate-y-[-50%] left-0 z-10 flex w-full justify-between items-center py-[1rem] px-[1rem]">
                  <div className="back-btn b-back">
                    <FaChevronLeft className="text-2xl" />
                  </div>
                  <div className="forward-btn b-forward">
                    <FaChevronRight className="text-2xl" />
                  </div>
                </div>
              </div>
            </Swiper>
          </div>
        </div>
      </section>
    </>
  );
};

export default BannerSlider;
