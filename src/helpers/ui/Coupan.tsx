import Image from "next/image";
import React, { useState } from "react";
import { PayModal } from "./PayModal";
import { Coupon } from "@/utils/schema/ApiInterface";
import { usePathname } from "next/navigation";
import path from "path";

const Coupan: React.FC<any> = ({ coupon, candidateId }: any) => {
  const [showModal, setShowModal] = useState(false);

  console.log("This is candididate id", candidateId);

  const handleNameClick = () => {
    setShowModal(true);
  };

  const pathname = usePathname();
  console.log("This is pathname", pathname);

  console.log("This is coupon", coupon);

  return (
    <>
      <div
        className="coupon-box flex items-center justify-center flex-col py-2 px-3 bg-white rounded-lg h-20"
        onClick={handleNameClick}
      >
        <div className="flex justify-between items-center gap-4">
          {/* <Image
            src="/image/vote/cupon.png"
            height={500}
            width={900}
            alt="cuopn"
            className="h-[3rem] w-[3rem] object-contain"
          /> */}
          <h3 className="font-secular font-[500] text-lg text-[var(--black)] text-right cursor-pointer">
            {coupon.name}
          </h3>
          {showModal && (
            <p className="font-secular font-[500] text-lg bg-[var(--btncolor)] text-white p-1 px-1 rounded-lg text-right">
              NPR.{coupon.pricing}
            </p>
          )}
        </div>

        {/* <div className="text-xs font-[500] text-[var(--c-secondary)] flex justify-between items-center gap-[10px]">
          <div className="bg-[var(--c-rose-pink)] px-2 py-1 rounded-lg">
            <p>{coupon.votes} votes</p>
          </div>
          <div className="bg-[var(--c-rose-pink)] text-[var(--c-secondary)] px-2 py-1 rounded-lg">
            <p>{coupon.eligibleCandidateCounts} Candidates</p>
          </div>
        </div> */}

        <div></div>
        {showModal && <PayModal coupon={coupon} candidateId={candidateId} />}
      </div>
    </>
  );
};

export default Coupan;
