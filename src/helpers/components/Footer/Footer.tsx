import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";
import image from "@/utils/image/logo-white-new.png";
import CampaignList from "@/helpers/ui/CampaignLists";
import {
  RiFacebookFill,
  RiInstagramLine,
  RiLinkedinFill,
} from "react-icons/ri";
import { RootState, useAppSelector } from "@/helpers/hooks/useStoreHooks";

const Footer: React.FC = () => {
  const { all_org_setting_data } = useAppSelector(
    (state: RootState) => state.OrgSetting
  );
  const { fulfilledResponse } = all_org_setting_data;

  let orgSettingData: any = null;

  if (fulfilledResponse?.data && Array.isArray(fulfilledResponse.data)) {
    [orgSettingData] = fulfilledResponse.data;
  }

  return (
    <footer className="text-[var(--light-text-color2)] bg-[var(--c-l-primary)]">
      <div className="footer-cta -has-footer-links -is-cta  pb-[32px]">
        <div className=" flex flex-col items-center justify-center mt-6">
          <p className="footer-title">Subscribe Our NewsLetter </p>
          <div className="flex gap-2 w-full justify-center items-center">
            <input
              type="text"
              placeholder="Enter Email"
              className="px-[1.5rem] w-[50%] md:w-auto py-[1rem] rounded-md"
            />
            <button className="px-[1.5rem] py-[1rem] rounded-md bg-[var(--c-secondary)] text-white w-[10rem]">
              Subscribe
            </button>
          </div>
        </div>

        <div className="container mx-auto">
          <div className="w-full flex flex-col items-start gap-[3rem] md:gap-10 md:flex-row md:justify-between  pt-10">
            <div className="flex flex-col itece md:items-start w-full md:w-[33%] text-center md:text-left gap-[10px] self-center md:self-start">
              <Link
                href="/"
                className="flex flex-col item-center gap-4 title-font font-medium items-center md:justify-start justify-center text-white    p-1 rounded-lg"
              >
                <Image
                  src={image}
                  height={500}
                  width={900}
                  alt="brand-logo"
                  className=" h-[50px] object-contain w-[120px]  md:bg-inherit  p-1 "
                />
              </Link>
              <div className="text-white">
                <p>{orgSettingData?.footerLeftText}</p>
              </div>

              <div className="flex flex-col items-center md:items-start gap-[1rem]">
                <div className="flex flex-col gap-[.5rem] my-4 text-[white] text-[1rem]">
                  <Link
                    href="https://www.google.com/maps/place/Wise+House,+38+Pinewood+Dr,
                                        +Potters+Bar+EN6+2BD,+UK/@51.7011527,-0.1975736,17z/data=!3m1!4b1!4m6!3m5!1s0x48763d490510c6b1:
                                        0xf06768e86d0d6172!8m2!3d51.
                                        7011527!4d-0.1975736!16s%2Fg%2F11b8zhlv8d?entry=ttu"
                    target="_blank"
                    className="flex gap-[.5rem] md:gap-[0.3em] items-center"
                  >
                    <span style={{ alignSelf: "baseline" }}>
                      <FaLocationDot className="w-[1.3rem] h-[1.3rem]" />
                    </span>
                    {/* <span className="">{orgSettingData?.location}</span> */}
                    <span className="">
                      Wise House & Pinewood Drive Potters Bar, Hertfordshire,
                      United Kingdom
                    </span>
                  </Link>

                  {/* <Link href='mailto:contact@fdapp.co.uk' className='flex  items-center gap-[.5rem] md:gap-[0.3em]'>
                                        <span><BsFillPersonFill className='w-[1.3rem] h-[1.3rem]' /></span>
                                        <span className=''>+180 123 (567) 00</span>
                                    </Link> */}

                  <Link
                    href="mailto:contact@fdapp.co.uk"
                    className="flex  items-center gap-[.5rem] mt-2 md:gap-[0.3em]"
                  >
                    <span>
                      <IoMdMail className="w-[1.3rem] h-[1.3rem]" />
                    </span>
                    {/* <span className="">{orgSettingData?.orgEmail}</span> */}
                    <span className="">contact@fdapp.co.uk                    </span>
                  </Link>
                </div>

                <div className="flex gap-[0.6em] text-base text-[white]">
                  <Link
                    className="w-[2.5rem] h-[2.5rem] rounded-full bg-[var(--c-primary)] flex items-center justify-center"
                    href={orgSettingData?.facebookURL ?? "#"}
                    target="_blank"
                  >
                    <RiFacebookFill className="text-[1.5rem]" />
                  </Link>
                  <Link
                    className="w-[2.5rem] h-[2.5rem] rounded-full bg-[var(--c-primary)] flex items-center justify-center"
                    href={orgSettingData?.instagramURL ?? "#"}
                    target="_blank"
                  >
                    <RiInstagramLine className="text-[1.5rem]" />
                  </Link>
                  <Link
                    className="w-[2.5rem] h-[2.5rem] rounded-full bg-[var(--c-primary)] flex items-center justify-center"
                    href={orgSettingData?.linkedinURL ?? "#"}
                    target="_blank"
                  >
                    <RiLinkedinFill className="text-[1.5rem]" />
                  </Link>
                </div>
              </div>
            </div>

            <div className="w-[100%] md:w-[66%] flex flex-wrap flex-row item-center justify-center md:justify-center font-[500] gap-[0em] md:gap-[10px]">
              <div className="lg:w-1/4 w-1/2 md:w-[33%]  px-0 md:px-4 flex flex-col items-center md:items-start">
                <h2 className="footer-title">Quick Links</h2>
                <ul className="list-disc flex flex-col gap-[0.3em] ml-[1rem] text-white">
                  <li>
                    <Link
                      href="/"
                      className="hover:opacity-[0.8] text-[12px] md:text-[14px]"
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/campaign"
                      className="hover:opacity-[0.8] text-[12px] md:text-[14px]"
                    >
                      Campaign
                    </Link>
                  </li>
                  <li className="w-fit">
                    <Link
                      href="/contestants"
                      className="hover:opacity-[0.8] text-[12px] md:text-[14px]"
                    >
                      Contestants
                    </Link>
                  </li>
                  {/* <li className='w-fit'>
                                        <Link href='/pricing' className="hover:opacity-[0.8] text-[12px] md:text-[14px]">Pricing</Link>
                                    </li> */}
                  <li>
                    <Link
                      href="/about"
                      className="hover:opacity-[0.8] text-[12px] md:text-[14px]"
                    >
                      About Us
                    </Link>
                  </li>
                  <li className="w-fit">
                    <Link
                      href="/newspage"
                      className="hover:opacity-[0.8] text-[12px] md:text-[14px]"
                    >
                      Blog
                    </Link>
                  </li>
                  <li className="w-fit">
                    <Link
                      href="/faq"
                      className="hover:opacity-[0.8] text-[12px] md:text-[14px]"
                    >
                      FAQs
                    </Link>
                  </li>
                  <li className="w-fit">
                    <Link
                      href="/privacy"
                      className="hover:opacity-[0.8] text-[12px] md:text-[14px]"
                    >
                      Privacy Policy
                    </Link>
                  </li>
                </ul>
              </div>

              {/* <div className="lg:w-1/4 w-1/2  px-0 md:px-4 flex flex-col items-center md:items-start gap-[2rem]">
                <div className="flex flex-col">
                  <h2 className="footer-title">Campaigns</h2>
                  <ul className="list-none flex flex-col gap-[1rem]">
                    <CampaignList />
                  </ul>
                </div>
              </div> */}

              <div className="flex  md:w-[33%] flex-col md:items-start items-center gap-2 px-0 md:px-4 mt-[3rem] md:mt-0 ml-[5em]">
                <h2 className="footer-title">Download</h2>
                <div>
                  <Link href="#">
                    <Image
                      src="/image/loginimg/google.png"
                      height={80}
                      width={150}
                      alt="google-store-icon"
                      className="w-[150px] aspect-auto"
                    />
                  </Link>
                </div>
                <div>
                  <Link href="#">
                    <Image
                      src="/image/loginimg/mac.png"
                      height={80}
                      width={150}
                      alt="apple-store-icon"
                      className="w-[150px] aspect-auto"
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="paragraph footer-copyright -has-copyright text-[#fff] paragraph ">
        <div className="container mx-auto flex justify-between py-[10px]  border-t-2 border-[#413595]">
          <div>
            <p className="text-[var(--c-grey)] paragraph">
              {orgSettingData?.copyright}
            </p>
          </div>
          <div>
            <Link href="/terms" className="text-[var(--c-grey)] paragraph">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
