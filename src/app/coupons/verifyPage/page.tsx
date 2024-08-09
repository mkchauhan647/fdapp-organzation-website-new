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
    coupon: null,
    candidateId: "",
    campaignID: "",
  });

  useEffect(() => {
    // Retrieve query parameters
    const fullName = params.get("fullName");
    const email = params.get("email");
    const coupon = params.get("coupon");
    const candidateId = params.get("candidateId");
    const campaignID = params.get("campaignID");

    // Update state with query parameters
    setQuery({
      fullName: fullName || "",
      email: email || "",
      candidateId: candidateId || "",
      campaignID: campaignID || "",
      coupon: coupon ? JSON.parse(decodeURIComponent(coupon)) : null, 
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
