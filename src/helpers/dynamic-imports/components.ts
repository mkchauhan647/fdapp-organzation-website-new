import dynamic from "next/dynamic";



export const RootFooter = dynamic(
  () => import("@/helpers/components/Footer/Footer"),
  { ssr: false }
);

export const RootHeader = dynamic(
  () => import("@/helpers/components/Header/Header"),
  { ssr: false }
);

export const DynamicCountDown = dynamic(
  ()=>import('@/helpers/ui/countDown'),
  {ssr:false},
)

export const RootPageTop = dynamic(
  ()=>import('@/helpers/components/PageTop/PageTop'),
  { ssr: false }

)

export const CampPage= dynamic(
  ()=>import('@/helpers/components/compPage/campaingnPage'),
  { ssr: false }

)

export const CampaignIndividual = dynamic(
  ()=>import('@/helpers/components/campaign-individual/CampaignIndividual'),
  { ssr: false }

)

export const HomeBanner = dynamic(
  ()=>import('@/helpers/components/Homebanner/Homebanner'),
  { ssr: false }

)

export const Register = dynamic(
  ()=>import('@/helpers/components/Register/Register'),
  { ssr: false }

)

export const Login = dynamic(
  ()=>import('@/helpers/components/LoginBox/Loginbox'),
  { ssr: false }

)

export const LoginSection = dynamic(
  ()=>import('@/helpers/components/form/login'),
  { ssr: false }

)

export const ErrorModel = dynamic(
  ()=>import('@/helpers/components/ErrorModel/ErrorModel'),
  { ssr: false }

)

export const CampaignSlide = dynamic(
  () => import('@/helpers/components/competiton/Competion'),
  {ssr : false}
)

export const CandidateSlide = dynamic(
  () => import('@/helpers/components/Contestants/Contestants'),
  {ssr : false}
)

export const CategoryPage = dynamic(
  ()=> import ('@/helpers/components/catePage/CatePage'),
  {ssr : false}
)

export const CategorySlide = dynamic(
  ()=>import('@/helpers/components/category/Category'),
  {ssr : false}
)

export const CandidateSlideStage = dynamic(
  ()=>import('@/helpers/components/Candidate-stage/CandidateSlideStage'),
  {ssr : false}
)

export const RegisterSection = dynamic(
  ()=>import('@/helpers/components/Register/Register'),
  {ssr : false}
)

export const OTPVerify = dynamic(
  () => import('@/helpers/components/OtpVerify/Otpverify'),
  {ssr : false}
)

export const sendOTP = dynamic(
  ()=>import('@/helpers/components/SendOTP/SendOTP'),
  {ssr : false}
)

export const ContactSection = dynamic(
  ()=> import('@/helpers/components/contact/contact'),
  {ssr : false}
)

export const FaqSection = dynamic(
  () => import('@/helpers/components/FAQ/faq'),
  {ssr : false}
)


export const TermsCondition = dynamic(
  () => import('@/helpers/components/termscondition/TermsCondition'),
  {ssr : false}
)

export const PrivacyPolicy = dynamic(
  () => import('@/helpers/components/privacypolicy/Privacy'),
  {ssr : false}
)

export const AboutUS = dynamic(
  () => import('@/helpers/components/aboutus/AboutUs'),
  {ssr : false}
)
export const NewsUpdate = dynamic(
  () => import('@/helpers/components/news/News'),
  {ssr : false}
)
export const NewsPage = dynamic(
  () => import('@/helpers/components/newspage/NewsPage'),
  {ssr : false}
)
export const Sponser = dynamic(
  () => import('@/helpers/components/sponser/Sponser'),
  {ssr : false}
)
export const LandingPage = dynamic(
  () => import('@/helpers/components/landingpage/LandingPage'),
  {ssr : false}
)

export const Pricing = dynamic(
  () => import('@/helpers/components/pricing/Pricing'),
  {ssr : false}
)
export const Error = dynamic(
  () => import('@/helpers/components/Error/Error'),
  {ssr : false}
)
export const Success = dynamic(
  () => import('@/helpers/components/success/Success'),
  {ssr : false}
)

export const RunningCampaignStages = dynamic(
  () => import('@/helpers/sections/RunningCampaignStages'),
  {ssr : false}
)

export const CompetitonSkeleton = dynamic(
  () => import('@/helpers/components/Skeleton/SkeletonCampaign'),
  {ssr : false}
)

export const ImageSkeleton = dynamic(
  () => import('@/helpers/components/Skeleton/SkeletonImage')
)
export const GetToKnow = dynamic(
  () => import('@/helpers/components/GetToKnow/GetToKnow')
)

