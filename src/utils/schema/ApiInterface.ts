export interface Contestants {
  id: string;
  code: string;
  organizationID: string;
  name: string;
  age: string;
  gender: string;
  nationality: string;
  weight: string;
  city: string;
  biography: string;
  profilePicture: string;
  socialMediaFacebook: string;
  socialMediaInstagram: string;
  socialMediaTwitter: string;
  votingCampaignId: string;
  inserted: Date;
  updated: Date;
  votingCampaign: { title: string; id: string };
  votingStageCandidates: VotingStageCandidate[];
}

export interface Candidate {
  candidate: Contestants;
  candidateId: string;
  id: string;
  inserted: string;
  organizationID: string;
  updated: string;
  votingCampaignStage: VotingCampaignStage;
  votingCampaignStageId: string;
}

export interface VotingStageCandidate {
  id: string;
  votingCampaignStage: VotingCampaignStage;
}

export interface User {
  lastLogin: string;
  lastLoginIp: string;
  lastNotificationActivity: string | null;
  lastPasswordChange: string | null;
  name: string;
  profile: string;
  isVerified: boolean;
  id: string;
  email: string;
}

export interface VotingCampaign {
  banner: string;
  description: string;
  endDateTime: string;
  id: string;
  inserted: string;
  logo: string;
  candidateCount: string;
  organizationID: string;
  startDateTime: string;
  timeZone: string;
  title: string;
  updated: string;
}

export interface VotingCampaignStage {
  description: string;
  emailVotingLimit: number;
  endDateTime: string;
  id: string;
  inserted: string;
  organizationID: string;
  smsVotingLimit: number;
  startDateTime: string;
  title: string;
  updated: string;
  votingCampaignId: string;
  logo: string;
  banner: string;
}

export interface Coupon {
  id: string;
  name: string;
  votingCampaignId: string;
  votes: number;
  eligibleCandidateCounts: number;
  pricing: number;
  avaibilityPeriodStart: string;
  avaibilityPeriodEnd: string;
  currency: string;
  organizationID: string;
  candidateId: string;
}

export interface GetClientSecretInterface {
  couponId: string;
  idempotentKey: string;
  paymentService: string;
  votingCampaignStageId: string;
  distribution: Distribution[];
  instrumentCode?: string;
}

export interface Distribution {
  candidateId: string;
  votes: number;
}

export interface NotificationInterface {
  title: string;
  id: string;
  message: string;
  inserted: string;
  updated: string;
  userId: string;
}

export interface FAQ {
  question: string;
  answer: string;
  id: string;
  organizationId: string;
  updated: string;
  inserted: string;
}

export interface News {
  id: string;
  organizationId: string;
  title: string;
  description: string;
  image: string;
  updated: string;
  inserted: string;
}
