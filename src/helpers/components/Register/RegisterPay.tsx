
// import { useRouter } from "next/navigation";

// interface candidateId {
//   candidateId: string;
// }

// interface selectedCoupon {
//   id: string;
//   organizationID: string;
//   name: string;
//   votes: number;
//   eligibleCandidateCounts: number;
//   pricing: string;
//   currency: string;
//   avabilityPeriodStart: string;
//   avabilityPeriodEnd: string;
//   votingCampaignId: string;
//   inserted: string;
//   updated: string;
//   totalVotes: string;


// }


// // selected Coupon{"id":"3bd683b0a400c8bd","organizationID":"d82b3694d9f8cc49","name":"basic coupon","votes":5,"eligibleCandidateCounts":1,"pricing":"100.00","currency":"NPR","avaibilityPeriodStart":"2024-08-12T00:00:00.000Z","avaibilityPeriodEnd":"2024-08-31T00:00:00.000Z","votingCampaignId":"87b5ec47fb608800","inserted":"2024-08-12T07:23:41.212Z","updated":"2024-08-12T07:27:56.137Z","totalVotes":"0"}

// export const RegisterAndPay = ({selectedCoupon, candidateId})=>{
//   const router = useRouter();
//   const queryString = new URLSearchParams({
//     couponVotes: selectedCoupon.votes,
//     couponPricing: selectedCoupon.pricing,
//     couponVotingCampaignId: selectedCoupon.votingCampaignId,
//     fullName: name,
//     email: email,
//     candidateId: candidateId
//   }).toString();
//   router.push(`/coupons/verify?${queryString}`);
// }