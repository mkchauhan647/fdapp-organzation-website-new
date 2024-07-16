'use client'
import { ContactSection } from '@/helpers/dynamic-imports/components'
import { PublicLayout } from '@/helpers/dynamic-imports/views'
import React from 'react'

const Contact : React.FC = () => {
  return (
    <PublicLayout>
        <ContactSection />
    </PublicLayout>
  )
}

export default Contact