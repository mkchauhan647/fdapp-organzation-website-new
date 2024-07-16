'use client';

import { ReduxProvider } from '@/helpers/dynamic-imports/redux';
import { PublicLayout } from '@/helpers/dynamic-imports/views';
import ContestantBanner from '@/helpers/sections/contestantBanner';
import ContestantProfile from '@/helpers/ui/ContestantIndividual';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react'

const  ContestantsIndividual : React.FC<{params : any}> = ({params}) => {
  const query = useSearchParams();
  const router = useRouter()
  const name = query.get('name');
  const campaignID = query.get('campaignID');
  
  useEffect(()=>{
    if(name == null || campaignID == null) {
      router.push('/contestants') 
    }
    },[name , campaignID , router])


  return (
    <>
      <PublicLayout>
        <ReduxProvider>
          {/* {(campaignID && name) &&  <ContestantBanner stageID={campaignID} name={name} />} */}
          <ContestantProfile params={params.id} />
        </ReduxProvider>
      </PublicLayout>
    </>
  )
}

export default ContestantsIndividual