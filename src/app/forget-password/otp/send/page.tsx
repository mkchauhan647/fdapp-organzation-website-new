'use client'
import { ResetPasswordOTP } from '@/helpers/dynamic-imports/sections'
import { PublicLayout } from '@/helpers/dynamic-imports/views'
import React from 'react'

const SendResetPassWordToken : React.FC = () => {
  return (
    <PublicLayout>
        <ResetPasswordOTP />
    </PublicLayout>
  )
}

export default SendResetPassWordToken