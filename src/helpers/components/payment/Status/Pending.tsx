import React from "react";
import SkeletonCampaign from "../../Skeleton/SkeletonCampaign";
import SkeletonBanner from "../../Skeleton/SkeletonBanner";
import SkeletonCandidate from "../../Skeleton/skeletonCandidate";

const PendingTrans = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-lg w-full">
         <SkeletonCandidate isloading/>
      </div>
    </div>
  );
};

export default PendingTrans;
