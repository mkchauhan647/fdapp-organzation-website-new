"use client"

import RegisterSection from '@/helpers/components/form/register'
import { PublicLayout } from '@/helpers/dynamic-imports/views'
import React from 'react'

const Register : React.FC = () => {
  return (
    <PublicLayout>
        <RegisterSection />
    </PublicLayout>
  )
}

export default Register