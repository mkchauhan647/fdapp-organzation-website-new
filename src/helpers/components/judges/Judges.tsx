"use client";

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y, Autoplay } from "swiper/modules";
import Image from "next/image";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import CommonSection from "@/helpers/ui/CommonSection";
import Controller from "@/helpers/ui/Controller";
import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from "@/helpers/hooks/useStoreHooks";
import { GetAllJudgesUsingCampaignId } from "@/helpers/redux/Judges/_thunks";
import { Judge } from "@/utils/schema/ApiInterface";
import { dataService } from "@/utils/data/api/dataServices";
import SkeletonBanner from "../Skeleton/SkeletonBanner";
import SkeletonImage from "../Skeleton/SkeletonImage";
import { JudgesPopup } from "@/helpers/dynamic-imports/ui";

interface JudgeSlideProps {
  campaignId: string;
}

const JudgeSlide: React.FC<JudgeSlideProps> = ({ campaignId }) => {
  const { token, x_api_key } = useAppSelector((state: RootState) => state.Auth);
  const dispatch = useAppDispatch();

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedJudge, setSelectedJudge] = useState<Judge | null>(null);

  const openPopup = (judge: Judge) => {
    setSelectedJudge(judge);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedJudge(null);
  };

  const { Judges_by_campaign_data } = useAppSelector(
    (state: RootState) => state.Judges
  );

  useEffect(() => {
    if (campaignId) {
      dataService.setApiKey(x_api_key);
      dispatch(GetAllJudgesUsingCampaignId(campaignId));
    }
  }, [dispatch, campaignId, x_api_key]);

  const { isPending, isFulfilled, isRejected, fulfilledResponse } =
    Judges_by_campaign_data;

  const judgesList: Judge[] = isFulfilled ? fulfilledResponse : [];

  return (
    <CommonSection name="Competition-section -has-slider -has-campaigns">
      <header className="w-full flex flex-col items-center mb-[20px] sm:mb-[30px] relative">
        <h1 className="text-[2rem] font-[600] text-[var(--black)] font-poppins">
          Judges
        </h1>
      </header>

      <div className="competition-slider flex justify-between items-baseline relative">
        {isPending ? (
          <div className="w-full flex justify-between gap-3 items-baseline flex-wrap">
            {Array.from({ length: judgesList.length || 3 }).map((_, index) => (
              <div key={index} className="flex w-1/4">
                <SkeletonImage isLoading={isPending} />
              </div>
            ))}
          </div>
        ) : isRejected ? (
          <div className="w-full flex justify-center items-center">
            <p>Error loading judges.</p>
          </div>
        ) : judgesList.length > 0 ? (
          <Swiper
            className="w-full !pb-16"
            modules={[Navigation, Pagination, A11y, Autoplay]}
            spaceBetween={25}
            slidesPerView={4}
            loop={true}
            autoplay={{ delay: 3000 }}
            navigation={{
              nextEl: ".forward",
              prevEl: ".back",
            }}
            pagination={{ clickable: true }}
            breakpoints={{
              0: { slidesPerView: 1.5, spaceBetween: 15 },
              590: { slidesPerView: 2, spaceBetween: 15 },
              730: { slidesPerView: 2.5 },
              980: { slidesPerView: 3 },
              1080: { slidesPerView: 3.5 },
              1260: { slidesPerView: 4 },
            }}
          >
            {judgesList.map((judge: Judge) => (
              <SwiperSlide key={judge.id}>
                <div
                  onClick={() => openPopup(judge)}
                  className="flex flex-col justify-center gap-[5px] contestant-box mx-auto w-full h-full bg-white items-center cursor-pointer"
                >
                  <div className="h-[200px] w-[200px] overflow-hidden rounded-full">
                    <Image
                      src={process.env.NEXT_PUBLIC_AWS_URI + judge.image}
                      height={500}
                      width={900}
                      alt={judge.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <h2 className="mt-4 md:text-[18px] text-[14px] font-[600] text-[var(--blue)] leading-[1.5rem] line-clamp-1">
                    {judge.name}
                  </h2>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="w-full flex justify-center items-center">
            <p>No judges found for this campaign.</p>
          </div>
        )}

        {isPopupOpen && selectedJudge && (
          <JudgesPopup
            judge={selectedJudge}
            isOpen={isPopupOpen}
            onClose={closePopup}
          />
        )}

        <div className="controller_wrapper">
          <Controller />
        </div>
      </div>
    </CommonSection>
  );
};

export default JudgeSlide;
