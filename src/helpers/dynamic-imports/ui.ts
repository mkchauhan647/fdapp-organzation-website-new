import dynamic from "next/dynamic";

export const ContestantStageBox = dynamic(
  ()=>import('@/helpers/ui/ContestantStageBox'),
  {ssr : false}

)

export const ContestantDetailButton = dynamic(
  ()=>import('@/helpers/ui/DetailButton'),
  {ssr : false}

)

export const DynamicDetailModal = dynamic(
  ()=>import('@/helpers/ui/DetailModal'),
  {ssr : false}

)

export const Heading = dynamic(
  ()=>import('@/helpers/ui/Heading'),
  {ssr : false}
)

export const TitleBtn = dynamic(
  ()=>import('@/helpers/ui/TitleBtn'),
  {ssr : false}
)

export const CommonSection = dynamic(
  ()=>import('@/helpers/ui/CommonSection'),
  {ssr : false}
)
export const CampaignLists = dynamic(
  ()=>import('@/helpers/ui/CampaignLists'),
  {ssr : false}
)