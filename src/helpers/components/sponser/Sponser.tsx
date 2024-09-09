import React, { useEffect } from "react";
import { Navigation, Pagination, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";
import { CommonSection } from "@/helpers/dynamic-imports/ui";
import { BsArrowRight } from "react-icons/bs";
import Link from "next/link";
import { dataService } from "@/utils/data/api/dataServices";

import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from "@/helpers/hooks/useStoreHooks";
import { GetAllSponsers } from "@/helpers/redux/sponsers/_thunk";
import SkeletonImage from "../Skeleton/SkeletonImage";

declare global {
  interface Window {
    Calendly: any;
  }
}

const SponserSlide: React.FC = () => {
  const { all_sponsers_data } = useAppSelector(
    (state: RootState) => state.Sponsers
  );

  const [calendlyLoaded, setCalendlyLoaded] = React.useState(false);

  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://assets.calendly.com/assets/external/widget.css";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    script.onload = () => {
      setCalendlyLoaded(true);
    };
    document.body.appendChild(script);

    return () => {
      document.head.removeChild(link);
      document.body.removeChild(script);
    };
  }, []);

  const handleClick = () => {
    if (calendlyLoaded && window.Calendly) {
      window.Calendly.initPopupWidget({
        url: "https://calendly.com/fdapponline/30min",
      });
    } else {
      console.error("Calendly widget not loaded yet");
    }
    return false;
  };

  const dispatch = useAppDispatch();
  const { x_api_key } = useAppSelector((state: RootState) => state.Auth);

  const fulfilledResponseOrg = all_sponsers_data?.fulfilledResponse?.data || "";

  console.log("sponsor padam", JSON.stringify(all_sponsers_data));

  useEffect(() => {
    dataService.setApiKey(x_api_key);
    dispatch(GetAllSponsers());
  }, [dispatch, x_api_key]);

  console.log("all sponsors", JSON.stringify(all_sponsers_data.isPending));

  return (
    <>
      <CommonSection name="sponsore bg-[var(--pagebg1)]">
        <section className="flex md:flex-row flex-col w-full gap-[2rem]">
          <div className="md:w-[50%] w-full flex flex-col justify-center gap-[1.5rem]">
            <div className="flex items-center gap-4">
              <p className="paragraph text-secondary font-bold uppercase">
                Our Sponsors
              </p>
              <div className="border-1 w-6 border-secondary"></div>
            </div>
            <span>
              <h1 className="text-[1.5rem] font-[700] text-[var(--blue)] w-full">
                Supporting Partners:{" "}
                <span className="text-[1.5rem] font-[700] text-[var(--c-secondary)]">
                  Empowering
                </span>{" "}
                Dreams Together!
              </h1>
            </span>
            <span className="flex flex-col gap-[.5rem] text-justify">
              <p className="paragraph text-[var(--light-text-color)]">
                Sponsorship helps us achieve our goals by bringing together
                like-minded partners.
              </p>
            </span>

            <span>
              <button onClick={handleClick} className="btn-primary">
                Contact Us
              </button>
            </span>
          </div>

          <div className="md:w-[50%] w-full bg-white rounded-md px-[1rem] py-[1rem] md:px-[2rem] md:py-[2rem] flex flex-col gap-[1.5rem]">
            {all_sponsers_data.isPending ? (
              <div className="w-full flex justify-between gap-3 items-baseline flex-wrap">
                {Array.from({ length: fulfilledResponseOrg.length || 1 }).map(
                  (_, index) => (
                    <div key={index} className="flex w-10">
                      <SkeletonImage isLoading={all_sponsers_data.isPending} />
                    </div>
                  )
                )}
              </div>
            ) : all_sponsers_data.isRejected ? (
              <div className="w-full flex justify-center items-center">
                <p>
                  There was an error fetching the data. Please try again later.
                  .
                </p>
              </div>
            ) : fulfilledResponseOrg.length > 0 ? (
              <div className="competition-slider px-2 sm:px-0 flex flex-wrap justify-start gap-[.5rem] items-baseline">
                {fulfilledResponseOrg?.map((sponsor: any, index: any) => (
                  <div key={sponsor.id} className="relative mx-auto md:mx-0">
                    {index === 6 && (
                      <Link
                        href="#"
                        className="h-[8rem] w-[8rem] flex flex-col items-center justify-center rounded-md bg-[var(--c-primary)] absolute opacity-90 z-10"
                      >
                        <span className="paragraph text-[white] !font-[500]">
                          View All
                        </span>
                        <span>
                          <BsArrowRight className="text-[white] text-[1.5rem]" />
                        </span>
                      </Link>
                    )}
                    <Image
                      src={process.env.NEXT_PUBLIC_AWS_URI + sponsor?.logo}
                      height={500}
                      width={900}
                      alt={sponsor.title}
                      className="h-[8rem] w-[8rem] border-2 hover:shadow-md object-cover rounded-md"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-[var(--light-text-color)]">
                No sponsors available at the moment.
              </p>
            )}
          </div>
        </section>
      </CommonSection>
    </>
  );
};

export default SponserSlide;
