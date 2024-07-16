'use client'
import { ResetPasswordOTPVerify } from '@/helpers/dynamic-imports/sections'
import { PublicLayout } from '@/helpers/dynamic-imports/views'
import React from 'react'

const VerifyResetPasswordOTP : React.FC = () => {
  return (
    <PublicLayout>
        <ResetPasswordOTPVerify />
    </PublicLayout>
  )
}

export default VerifyResetPasswordOTP