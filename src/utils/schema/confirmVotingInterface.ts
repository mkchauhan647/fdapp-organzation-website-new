import { Coupon } from "./ApiInterface";

export interface CouponsVerifyPageProps {
    query: {
      fullName: string;
      email: string;
      candidateId: string;
      campaignID: string;
      coupon?: Coupon | null;
    };
  }

