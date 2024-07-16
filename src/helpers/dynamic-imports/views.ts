import dynamic from "next/dynamic";

export const PublicLayout = dynamic(
  () => import ("@/views/layouts/publicLayout"),
  {ssr:false},
)

export const ReactSuspense = dynamic(
  () => import("@/views/suspense/index")
)