"use client";
import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { Drawer, Space } from "antd";
import PModal from "@/helpers/ui/PModal";
import LoginModal from "@/helpers/ui/LoginModal";
import { Notification } from "@/helpers/ui/Notification";
import { User } from "@/utils/schema/ApiInterface";

// redux imports
import {
  RootState,
  useAppSelector,
  useAppDispatch,
} from "@/helpers/hooks/useStoreHooks";
import {
  GetAllCampaigns,
  GetUpcommingCampaign,
} from "@/helpers/redux/voting-campaign/_thunks";
import { GetAllCandidates } from "@/helpers/redux/candidates/_thunks";
import {
  GetActiveCampaignStages,
  GetAllCampaignsStages,
  GetUpcommingCampaignStages,
} from "@/helpers/redux/voting-campaign-stages.ts/_thunks";
import { GetAllFAQ } from "@/helpers/redux/faqs/_thunks";
import { AuthSlice } from "@/helpers/redux/Auth/AuthSlice";

import image from "@/utils/image/logo-white.png";
import axios from "axios";
import { orgID } from "@/utils/constants/constants";
import { dataService } from "@/utils/data/api/dataServices";
import { GetAllNews } from "@/helpers/redux/news/_thunks";
import SearchBar from "../searchbar/searchbar";

export type AuthState = {
  token: string | null;
  user: User;
  x_api_key: string | null;
};
const Navbar = () => {
  // redux declaration
  const { token, user, x_api_key }: AuthState = useAppSelector(
    (state: RootState) => state.Auth
  );
  const { all_campaign_data } = useAppSelector(
    (state: RootState) => state.VotingCampaign
  );
  const dispatch = useAppDispatch();
  const didMountRef = useRef<boolean>(false);

  // get x-api-key and set it to redux
  async function getXApiKey() {
    // const response = await axios.get(`${process.env.NEXT_PUBLIC_VOTING_IDENTITY_URI}/x-api-key/${orgID}`);
    const response = await axios.get(
      "https://apiauth.easyvotingapp.com/v1/x-api-key/" + orgID,
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
        timeout: 20000,
      }
    );
    const x_api_key = response?.data.data.token;
    dispatch(AuthSlice.actions.setXApiKey({ x_api_key }));
    dataService.setApiKey(x_api_key);
  }

  function dispatchAction(): void {
    // if(!isCampaingFulfilled){
    dispatch(GetAllCampaigns());
    dispatch(GetAllCandidates());
    dispatch(GetAllCampaignsStages());
    dispatch(GetUpcommingCampaign());
    dispatch(GetActiveCampaignStages());
    dispatch(GetUpcommingCampaignStages());
    dispatch(GetAllNews());
    dispatch(GetAllFAQ());
    // }
  }

  // dispatch allCampaigns and allCandidates and allCampaignStages i.e thunk action
  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      if (!didMountRef.current) {
        didMountRef.current = true;
        if (!x_api_key) {
          try {
            await getXApiKey();
            dispatchAction();
          } catch (error) {}
        } else {
          dataService.setApiKey(x_api_key);
          dispatchAction();
        }
      }
    };

    fetchData();
  }, [getXApiKey, dispatchAction]);

  const [fix, setFixed] = useState(false);

  // sticky navbar
  useEffect(() => {
    const stickyTop = () => {
      if (window.scrollY >= 70) {
        setFixed(true);
      } else {
        setFixed(false);
      }
    };

    window.addEventListener("scroll", stickyTop);

    return () => {
      window.removeEventListener("scroll", stickyTop);
    };
  }, []);

  // drawer
  const [open, setOpen] = useState<boolean>(false);
  const [placement, setPlacement] = useState<
    "top" | "right" | "bottom" | "left"
  >("left");
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div
        className={`sticky top-0 w-full bg-[--c-l-primary] font-ubuntu font-[400] text-[22px] z-50 `}
      >
        <div className={`${fix ? "nav" : ""} `}>
          <div className={`mx-auto  py-2   sm:px-10 md:px-0`}>
            <div className="container mx-auto flex items-center justify-between">
              <Link href="/" className="bg-white p-1">
                <div className="flex items-center justify-center relative">
                  <Image
                    src={image}
                    alt=""
                    width={500}
                    height={500}
                    className=" h-[50px] w-[120px]"
                  ></Image>
                </div>
              </Link>
              <nav className="lg:flex items-center gap-20 hidden navbar">
                <ul className="flex items-center">
                  <li className="px-[0.6em]">
                    <Link
                      href="/"
                      className="text-[var(--c-grey)] hover:text-[#fff] text-[16px] font-[500]"
                    >
                      Home
                    </Link>
                  </li>

                  <li className="px-[0.6em]">
                    <Link
                      href="/campaign"
                      className="text-[var(--c-grey)] hover:text-[#fff] text-[16px] font-[500]"
                    >
                      Campaign
                    </Link>
                  </li>
                  <li className="px-[0.6em]">
                    <Link
                      href="/contestants"
                      className="text-[var(--c-grey)] hover:text-[#fff] text-[16px] font-[500]"
                    >
                      Contestants
                    </Link>
                  </li>
                  {/* <li className='px-[0.6em]'>
                                        <Link href="/pricing"className='text-[var(--c-grey)] hover:text-[#fff] text-[16px] font-[500]'>
                                            Pricing
                                        </Link>
                                    </li> */}
                  <li className="px-[0.6em]">
                    <Link
                      href="/about"
                      className="text-[var(--c-grey)] hover:text-[#fff] text-[16px] font-[500]"
                    >
                      About Us
                    </Link>
                  </li>
                  <li className="px-[0.6em]">
                    <Link
                      href="/contact"
                      className="text-[var(--c-grey)] hover:text-[#fff] text-[16px] font-[500]"
                    >
                      Contact Us
                    </Link>
                  </li>
                </ul>
                <div className="flex items-center gap-[0.8em]">
                  <SearchBar />

                  <Notification isLoggedIn={token ? true : false} />

                  {token ? <PModal {...user} /> : <LoginModal />}
                </div>
              </nav>

              <div className="lg:hidden  flex items-center gap-[9px] justify-center">
                <div className="flex items-center gap-4 md:gap-7 mt-0  w-fit mx-auto mr-4 lg:mr-0">
                  {/* <IoSearch className='text-xl text-[var(--c-grey)] w-[20px] h-[20px] md:w-[25px] md:h-[25px]' /> */}
                  <SearchBar />
                  <Notification isLoggedIn={token ? true : false} />

                  {token ? <PModal {...user} /> : <LoginModal />}
                </div>
                <Space
                  className="border border-[#EDEDED] rounded-[2px] h-[20px] w-[100%] md:w-[20px] flex items-center justify-center cursor-pointer"
                  onClick={showDrawer}
                >
                  <svg
                    width="27"
                    height="21"
                    viewBox="0 0 27 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="27" height="3" rx="1.5" fill="#97A6B7" />
                    <rect y="9" width="27" height="3" rx="1.5" fill="#97A6B7" />
                    <rect
                      y="18"
                      width="27"
                      height="3"
                      rx="1.5"
                      fill="#97A6B7"
                    />
                  </svg>
                </Space>
                <Drawer
                  placement={placement}
                  closable={true}
                  onClose={onClose}
                  open={open}
                  key={placement}
                  className=" mobile-nav --has-links bg-[var(--c-l-primary)]"
                >
                  <ul className="flex items-center flex-col">
                    <li>
                      <Link
                        href="/"
                        className="text-[var(--c-grey)] text-[20px] text-[600]"
                      >
                        Home
                      </Link>
                    </li>

                    <li>
                      <Link
                        href="/campaign"
                        className="text-[var(--c-grey)] text-[20px] text-[600]"
                      >
                        Campaign
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/contestants"
                        className="text-[var(--c-grey)] text-[20px] text-[600]"
                      >
                        Contestants
                      </Link>
                    </li>
                    {/* <li>
                                            <Link href="/pricing" className='text-[var(--c-grey)] text-[20px] text-[600]'>Pricing</Link>
                                        </li> */}
                    <li>
                      <Link
                        href="/about"
                        className="text-[var(--c-grey)] text-[20px] text-[600]"
                      >
                        About us
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/contact"
                        className="text-[var(--c-grey)] text-[20px] text-[600]"
                      >
                        Contact Us
                      </Link>
                    </li>
                  </ul>
                  <div className="mt-[30px]">
                    <Link href="/">
                      <div className="flex items-center justify-center  relative">
                        <Image
                          src={image}
                          alt=""
                          width={500}
                          height={500}
                          className="object-contain h-[50px] w-[100px]"
                        ></Image>
                      </div>
                    </Link>
                  </div>
                </Drawer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
