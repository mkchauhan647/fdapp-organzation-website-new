/* eslint-disable react/jsx-key */
"use client"
import React, { useState } from 'react';
import Pagination from '../pagination/pagination';
import SearchBox from '@/helpers/ui/SearchBox';
import CompetitionBox from '@/helpers/ui/CompetitionBox';
import { RootState, useAppSelector } from '@/helpers/hooks/useStoreHooks';
import { useSearchParams } from 'next/navigation';
import { VotingCampaignStage } from '@/utils/schema/ApiInterface';

const CategoryPage: React.FC = () => {

    const getSearchParamsID: string | null = useSearchParams().get('id');
    const [filterData, setFilterData] = useState<string>('');

    const { all_campaign_stages_Data } = useAppSelector((state: RootState) => state.VotingCampaignStages);
    const fulfilledResponse = all_campaign_stages_Data.fulfilledResponse

    let VotingCampaignStageData: VotingCampaignStage[] = getSearchParamsID
        ? fulfilledResponse?.data.filter((data: VotingCampaignStage) => data.id === getSearchParamsID)
        : fulfilledResponse?.data;


    return (
        <>
            <div className='w-full pt-5  pb-[70px]'>
                <div className='container mx-auto flex flex-col justify-center'>
                    <div className='w-full flex flex-col sm:flex-row justify-between items-start sm:items-center mb-[30px] sm:mb-[65px]'>
                        <p className='text-lg text-[var(--lightblack)] mb-4 sm:mb-0'>Short by: <span className='text-lg text-[var(--blue)]'>Newest</span></p>
                        <div className='w-full md:w-auto'>
                            <SearchBox setFilterData={setFilterData} />
                        </div>
                    </div>

                    {
                        (VotingCampaignStageData && VotingCampaignStageData.length != 0) &&
                        <Pagination
                            itemsPerPage={8}
                            items={VotingCampaignStageData.filter((campaignStage: VotingCampaignStage) => filterData.trim() !== '' ? campaignStage.title.includes(filterData) : true)}
                            ItemsComponent={({ currentItems }: { currentItems: any[] }) => (

                                <div className='grid grid-cols-2 gap-8 sm:gap-12 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-[20px] sm:mb-[50px]'>
                                    {currentItems.map((campaignStage: VotingCampaignStage, index: number) => (
                                        <CompetitionBox
                                            key={index}
                                            id={campaignStage.id}
                                            title={campaignStage.title}
                                            banner={campaignStage.organizationID}
                                            logo={campaignStage.logo}
                                            startDateTime={campaignStage.startDateTime}
                                            endDateTime={campaignStage.endDateTime}
                                            link={`/campaign/category/details?id=${campaignStage.id}`}
                                        />
                                    ))}
                                </div>
                            )}
                        />
                    }

                    {
                        (VotingCampaignStageData?.length == 0 || !VotingCampaignStageData) && 'No Campaign stage to show'
                    }

                </div>
            </div>
        </>
    );
}

export default CategoryPage;