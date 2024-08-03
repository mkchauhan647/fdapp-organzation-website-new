import Image from "next/image";
import React, { useState } from "react";
import { PayModal } from "./PayModal";
import { Coupon } from "@/utils/schema/ApiInterface";
import { usePathname } from "next/navigation";
import path from "path";

const Coupan: React.FC<any> = ({
  coupon,
  candidateId,
  selectedCoupon,
}: any) => {
  const [showModal, setShowModal] = useState(false);

  const handleNameClick = () => {
    setShowModal(true);
  };


  return (
    <>
      <div
        className="coupon-box flex flex-wrap  items-center justify-center "
        onClick={handleNameClick}
      >
        {/* <div className="flex justify-between items-center gap-4">
          {/* <Image
            src="/image/vote/cupon.png"
            height={500}
            width={900}
            alt="cuopn"
            className="h-[3rem] w-[3rem] object-contain"
          /> */}
        {/* <h3 className="font-secular font-[500] text-lg text-[var(--black)] text-right cursor-pointer">
            {coupon.name}
          </h3> */}
        {/* {showModal && (
            <p className="font-secular font-[500] text-lg bg-[var(--btncolor)] text-white p-1 px-1 rounded-lg text-right">
              NPR.{coupon.pricing}
            </p>
          )} 
        </div> */}
        <div
          className={`coupon-box flex items-center  flex-col justify-center p-4 ${
            selectedCoupon?.id === coupon.id ? "bg-slate-100 border-1 border-blue-300 " : ""
          }`}
        >
          <p className=" text-2xl font-medium text-primary-700">
            {coupon.votes}
          </p>
          <p className=" text-base">Votes</p>
        </div>
        {/* <div className="bg-[var(--c-rose-pink)] text-[var(--c-secondary)] px-2 py-1 rounded-lg">
            <p>{coupon.eligibleCandidateCounts} Candidates</p>
          </div> */}

        {/* {showModal && <PayModal coupon={coupon} candidateId={candidateId} />} */}
      </div>
    </>
  );
};

export default Coupan;
