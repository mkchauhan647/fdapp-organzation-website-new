/* eslint-disable react/no-unescaped-entities */
"use client";
import React from "react";
import SectionHeading from "@/helpers/ui/SectionHeading";
import { RootState, useAppSelector } from "@/helpers/hooks/useStoreHooks";
import CommonSection from "@/helpers/ui/CommonSection";
import Image from "next/image";
import Link from "next/link";
import { News } from "@/utils/schema/ApiInterface";
import { Skeleton } from "@nextui-org/react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { A11y, Navigation, Pagination } from "swiper/modules";
import Controller from "@/helpers/ui/Controller";

const NewsUpdate: React.FC = () => {
  const { all_news_data } = useAppSelector((state: RootState) => state.News);
  const { isPending, isRejected, isFulfilled, fulfilledResponse } =
    all_news_data;
  const News: News[] = fulfilledResponse?.data;
  console.log(News);

  return (
    <>
      <CommonSection name="news">
        <header className="w-full flex flex-col items-center mb-[20px] sm:mb-[30px] relative">
          <h1 className="text-[2rem] font-[600] text-[var(--black)] font-poppins">
            Latest News & Updates
          </h1>
          {/* <p className="topic-desc text-center">
            {orgSettingData?.latestNewsUpdates}
          </p> */}
        </header>

        <div className="flex flex-col md:flex-row items-center md:items-start justify-center w-full relative">
          <Swiper
            className="w-full !pb-16"
            modules={[Navigation, Pagination, A11y]}
            spaceBetween={25}
            slidesPerView={4}
            loop={true}
            navigation={{
              nextEl: ".forward",
              prevEl: ".back",
            }}
            pagination={{ clickable: true }}
            breakpoints={{
              0: {
                slidesPerView: 1.5,
                spaceBetween: 15,
              },
              500: {
                slidesPerView: 2,
                spaceBetween: 15,
              },
              750: {
                slidesPerView: 2.5,
              },
              975: {
                slidesPerView: 3,
              },

              1200: {
                slidesPerView: 3.5,
              },

              1300: {
                slidesPerView: 4,
              },
            }}
          >
            {!isPending &&
              !isRejected &&
              isFulfilled &&
              News?.map((news, index) => {
                return (
                  <SwiperSlide key={index}>
                    <div className="px-[.5rem] py-[.5rem] shadow-md hover:shadow-lg transition-ease duration-300 rounded-md ">
                      <Link
                        href={`/newspage?id=${news.id}`}
                        key={index}
                        className="flex flex-col h-full gap-[1rem]"
                      >
                        <div className="w-full h-[15rem]">
                          <Image
                            src={process.env.NEXT_PUBLIC_AWS_URI + news.image}
                            alt={news.title}
                            height={500}
                            width={900}
                            className="h-full w-full object-cover"
                          />
                        </div>

                        <div className="flex flex-col gap-1">
                          {/* <div className="flex items-center">
                            <Image
                              src="/image/home/contest.png"
                              height={500}
                              width={900}
                              alt="image"
                              className="h-[2rem] w-[2rem] object-cover rounded-full"
                            />
                            <span className="flex h-fit">
                              <span className="px-[5px]">
                                <p className="paragraph text-[var(--blue)]">
                                  FDAPP
                                </p>
                              </span>
                              <p className="text-[var(--blue)]">|</p>
                              <span className="pl-[5px]">
                                <p className="paragraph text-[var(--light-text-color)] ">
                                  15 May, 2024
                                </p>
                              </span>
                            </span>
                          </div> */}
                          <h3 className="text-[14px] md:text-[16px] font-semibold text-[var(--blue)] line-clamp-2">
                            {news.title}
                          </h3>
                          <h3
                            className="text-[14px] md:text-[16px] h-16 overflow-hidden font-semibold text-[var(--blue)] pl-2 line-clamp-2"
                            dangerouslySetInnerHTML={{
                              __html: news.description,
                            }}
                          />
                        </div>
                      </Link>
                    </div>
                  </SwiperSlide>
                );
              })}
          </Swiper>
          <div className="controller_wrapper">
            <Controller />
          </div>
        </div>
      </CommonSection>
    </>
  );
};

export default NewsUpdate;
