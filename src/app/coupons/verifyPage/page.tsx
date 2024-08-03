"use client";
import { CouponsVerifyPage } from "@/helpers/dynamic-imports/components";
import { PublicLayout } from "@/helpers/dynamic-imports/views";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const VerifyPage = () => {
  const params = useSearchParams();
  const [query, setQuery] = useState({
    fullName: "",
    email: "",
    couponName: "",
    candidateId: "",
    couponPrice: "",
    campaignID: "",
  });

  useEffect(() => {
    // Retrieve query parameters
    const fullName = params.get("fullName");
    const email = params.get("email");
    const couponName = params.get("couponName");
    const couponPrice = params.get("couponPrice");
    const candidateId = params.get("candidateId");
    const campaignID = params.get("campaignID")


    // Update state with query parameters
    setQuery({
      fullName: fullName || "",
      email: email || "",
      couponName: couponName || "",
      candidateId: candidateId || "",
      couponPrice: couponPrice || "",
      campaignID: campaignID || "",
    });
  }, [params]);

  return (
    <div>
      <PublicLayout>
        <CouponsVerifyPage query={query} />
      </PublicLayout>
    </div>
  );
};

export default VerifyPage;
