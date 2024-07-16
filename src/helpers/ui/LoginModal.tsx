/* eslint-disable react/jsx-no-undef */
import React from "react";
import {Popover, PopoverTrigger, PopoverContent, Button} from "@nextui-org/react";
import Link from "next/link";
import { IoPersonSharp } from "react-icons/io5";

export default function LoginModal() {
  return (
    <Popover placement="bottom" showArrow={true}>
      <PopoverTrigger>
      <button className="border-none outline-none"><IoPersonSharp className='text-xl text-[var(--btncolor)] bg-[var(--c-primary)] rounded-md px-1 py-1 h-[20px] w-[20px] sm:h-[25px] sm:w-[25px] profile-icon'/></button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="px-3 py-4 flex flex-col gap-3">
            <Link href="/login"><button className="btn">Login</button></Link>
            <p className="text-lg text-[var(--gray)] font-[500]">Not a user? <Link href='/register' className="text-[var(--blue)] hover:underline transition-ease duration-200"> Register</Link ></p>
        </div>
      </PopoverContent>
    </Popover>
  );
}
