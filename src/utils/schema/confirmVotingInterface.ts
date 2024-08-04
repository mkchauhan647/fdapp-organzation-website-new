
export interface CouponsVerifyPageProps {
    query: {
      fullName: string;
      email: string;
      couponName: string;
      couponPrice: string;
      candidateId: string;
      campaignID: string;
    };
  }