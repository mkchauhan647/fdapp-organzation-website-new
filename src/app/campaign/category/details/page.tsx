'use client'

import { CampaignIndividual, HomeBanner } from '@/helpers/dynamic-imports/components'
import { PublicLayout } from '@/helpers/dynamic-imports/views'
import { useSearchParams } from 'next/navigation'
import React from 'react'

const  DetailPage : React.FC = () => {

  const searchParams = useSearchParams();
  
  return (
    <PublicLayout>
        <HomeBanner  stageID={searchParams.get('id')!} />
        <CampaignIndividual id={searchParams.get('id')} />
    </PublicLayout>
  )
}

export default DetailPage