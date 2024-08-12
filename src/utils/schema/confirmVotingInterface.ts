import { Coupon } from "./ApiInterface";

export interface CouponsVerifyPageProps {
    query: {
      candidateId: string | null;
      campaignID: string | null;
      coupons?: Coupon | null;
    };
  }

