"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
  Input,
} from "@nextui-org/react";
import { IoNotifications } from "react-icons/io5";
import { orgID } from "@/utils/constants/constants";
import Link from "next/link";
import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from "../hooks/useStoreHooks";
import { useDispatch } from "react-redux";
import { dataService } from "@/utils/data/api/dataServices";
import { GetNotifications } from "../redux/notification/_thunks";
import { NotificationsSlice } from "../redux/notification/NotificationsSlice";
import { NotificationInterface, User } from "@/utils/schema/ApiInterface";
import axios from "axios";

interface NotificationProps {
  isLoggedIn: boolean;
}

function Notification({ isLoggedIn }: NotificationProps) {
  const {
    token,
    user,
    x_api_key,
  }: { token: string; user: User; x_api_key: string } = useAppSelector(
    (state: RootState) => state.Auth
  );
  const dispatch = useAppDispatch();
  const { all_notifications_data } = useAppSelector(
    (state: RootState) => state.Notifications
  );
  const [notification, setNotification] = useState([]);
  const didMount = useRef(false);

  const Nots: NotificationInterface[] = [
    {
      id: "aasdd514",
      title: "hjsad",
      inserted: "asd",
      message: "klhandsad",
      updated: "dasddad",
      userId: "jkagsdb",
    },
    {
      id: "aasdd514",
      title: "hjsad",
      inserted: "asd",
      message: "klhandsad",
      updated: "dasddad",
      userId: "jkagsdb",
    },
    {
      id: "aasdd514",
      title: "hjsad",
      inserted: "asd",
      message: "klhandsad",
      updated: "dasddad",
      userId: "jkagsdb",
    },
  ];

  async function fetchNotification() {
    try {
      if (x_api_key) dataService.setApiKey(x_api_key);
      if (!x_api_key) {
        const xApiKey = await axios.get(
          `${process.env.NEXT_PUBLIC_VOTING_IDENTITY_URI}/x-api-key/${orgID}`
        );
        dataService.setApiKey(xApiKey?.data.data.token);
      }
      const response = await dataService.getData("/notification", token);
      if (response.success) {
        dispatch(NotificationsSlice.actions.addVoting(response.data));
        setNotification(response.data);
      }
    } catch (error: any) {}
  }

  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true;
      if (token) fetchNotification();
    }
  }, [token, x_api_key]);

  return (
    <Popover placement="bottom" showArrow offset={10} shouldBlockScroll={true}>
      <PopoverTrigger>
        <button
          className="border-none outline-none"
          disabled={all_notifications_data}
          title="notifications"
        >
          <IoNotifications className="text-xl text-[var(--grey)] w-[20px] h-[20px] md:w-[20px] md:h-[20px] fill-[var(--c-grey)] cursor-pointer" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-[20rem] bg-[var(--pagebg)]">
        {isLoggedIn ? (
          <div className="notification py-1 w-full max-h-[16rem] overflow-auto">
            <div className="flex flex-col gap-2 w-full">
              {Nots &&
                Nots.map((item: NotificationInterface, index: number) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl pl-3 pr-2 py-3 shadow"
                  >
                    <div className="flex justify-between items-center">
                      <h1 className="font-[500] font-secular text-xs text-[var(--blue)]">
                        {item.title}
                      </h1>
                      <p className="text-xs font-[500]">
                        {item.inserted.split("T").at(0)}
                      </p>
                    </div>
                    <p className="text-xs text-[var(--light)] font-[500]">
                      {item.message}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        ) : (
          <div className="px-3 py-4 flex flex-col gap-3">
            <Link href="/login">
              <button className="btn">Login</button>
            </Link>
            <p className="text-lg text-[var(--gray)] font-[500]">
              Not a user?{" "}
              <Link href="/login" className="text-[var(--blue)]">
                {" "}
                Register
              </Link>
            </p>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}

export { Notification };
