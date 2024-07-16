import dynamic from 'next/dynamic';

export const ResetPasswordOTP = dynamic(
  ()=>import('@/helpers/sections/sendResetPasswordOTP'),
  {ssr : false}
)

export const ResetPasswordOTPVerify = dynamic(
  () => import('@/helpers/sections/resetPasswordOTPVerify'),
  {ssr : false}
)

export const Terms = dynamic(
  () => import('@/helpers/sections/terms'),
  {ssr : false}
)