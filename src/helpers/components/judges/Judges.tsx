import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y, Autoplay } from "swiper/modules";
import Image from "next/image";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import CommonSection from "@/helpers/ui/CommonSection";
import SkeletonCampaign from "../Skeleton/SkeletonCampaign";
import Controller from "@/helpers/ui/Controller";

import judge1 from "../../../../public/image/judges1.jpg";
import judge2 from "../../../../public/image/judges2.jpg";
import judge3 from "../../../../public/image/judges3.jpg";
import judge4 from "../../../../public/image/judges4.jpg";

const judges = [
  { id: 1, name: "Amila P", image: judge1 },
  { id: 2, name: "Lily S", image: judge2 },
  { id: 3, name: "Tina C", image: judge3 },
  { id: 4, name: "Mica R", image: judge4 },
];

const JudgeSlide: React.FC = () => {
  return (
    <CommonSection name="Competition-section -has-slider -has-campaigns">
      <header className="w-full flex flex-col items-center mb-[20px] sm:mb-[30px] relative">
        <h1 className="text-[2rem] font-[600] text-[var(--black)] font-poppins">
          Judges
        </h1>
      </header>

      <div className="competition-slider flex justify-between items-baseline relative">
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
          {judges.map((judge) => (
            <SwiperSlide key={judge.id}>
              <div className="judge-card relative">
                <Image
                  src={judge.image.src}
                  alt={judge.name}
                  width={300}
                  height={300}
                  className="judge-image w-full h-full"
                />
                <h2 className="absolute -bottom-7 left-1/2 transform -translate-x-1/2 px-2 w-[90%] sm:w-[80%] bg-opacity-75 bg-gray-900 text-white text-center py-2 text-sm sm:text-base">
                  {judge.name}
                </h2>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="controller_wrapper">
          <Controller />
        </div>
      </div>
    </CommonSection>
  );
};

export default JudgeSlide;
