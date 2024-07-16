import dynamic from "next/dynamic";

export const ReduxProvider = dynamic(
  ()=>import('@/helpers/redux/ReduxProvider'),
  {ssr:false},
)