import React from "react";
import { Register } from "@/helpers/dynamic-imports/components";
import Image from "next/image";
import Link from "next/link";

const RegisterSection: React.FC = () => {
  return (
    <section>
      <div className="container mx-auto">
        <div className="flex justify-center lg:justify-start items-start mt-[34px] mb-[82px] relative w-full">
          <div className=" py-[35px] shadow-lg rounded-md border-2 w-fit lg:w-1/2">
                <div className="mx-auto w-fit">
                    <Register />
                    <div className="w-full text-center">
                    <Link
                        href={"/login"}
                        className="text-sm text-[#117CC4] font-[500]"
                    >
                        Already have an account? Login
                    </Link>
                    </div>
                </div>
          </div>
          <div
            className="h-full lg:block hidden absolute top-0 right-0 w-1/2 object-cover"
            style={{ background: "url('/image/loginimg/register.png')" }}
          >
            {/* <Image src="/image/loginimg/register.png" height={500} width={590} alt="" className='h-[100%] object-cover aspect-[3/3]' /> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterSection;
