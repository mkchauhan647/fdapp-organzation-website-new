"use client";
import * as React from 'react';
import { PublicLayout } from '@/helpers/dynamic-imports/views';
import { CategorySlide, CandidateSlideStage } from '@/helpers/dynamic-imports/components';
import CampaignBanner from '@/helpers/sections/campaignBanner';

const CompetitionTypeListPage : React.FC<{params : any}> = ({params}) => {
    
    return (
        <>
            <PublicLayout>
                <CampaignBanner campaignID={params.id}/>
                <CandidateSlideStage params={params} />
                <CategorySlide id={params.id} />
            </PublicLayout>
        </>
    );
}

export default CompetitionTypeListPage;