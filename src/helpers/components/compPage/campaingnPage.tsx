/* eslint-disable react/jsx-key */
/* eslint-disable react/jsx-no-comment-textnodes */

// Import Swiper styles
"use client"
import React, { useState } from 'react';
import SearchBox from '@/helpers/ui/SearchBox';
import CompetitionBox from '@/helpers/ui/CompetitionBox';
import Pagination from '../pagination/pagination';
import { RootState, useAppSelector } from '@/helpers/hooks/useStoreHooks';
import { VotingCampaign } from '@/utils/schema/ApiInterface';

const CampPage : React.FC = () => {
    const [filterData , setFilterData] = useState<string>('');

    // redux store data
    const {all_campaign_data } = useAppSelector((state: RootState) => state.VotingCampaign); 
    const {isPending , isFulfilled , isRejected ,fulfilledResponse} = all_campaign_data;
    const CampaignData:VotingCampaign[] = fulfilledResponse?.data.rows

    return (
        <>
            <div className='w-full pt-5 pb-[70px]'>
                <div className='container mx-auto flex flex-col justify-center'>
                    <div className='w-full flex flex-col sm:flex-row justify-between items-start sm:items-center mb-[30px] sm:mb-[65px]'>
                        <p className='text-lg text-[var(--lightblack)] mb-4 sm:mb-0'>Short by: <span className='text-lg text-[var(--blue)]'>Newest</span></p>
                        <div className='w-full md:w-auto'>
                            <SearchBox setFilterData={setFilterData} />
                        </div>
                    </div>

                    {
                        (!isPending && !isRejected && isFulfilled && CampaignData) && 
                        <Pagination
                            itemsPerPage={8}
                            items={CampaignData.filter((campaign: VotingCampaign) => filterData.trim() !== '' ? campaign.title.includes(filterData) : true)}
                            ItemsComponent={({ currentItems }: { currentItems: any[] }) => (
                                
                                <div className='grid grid-cols-2 gap-[2rem] md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-[20px] sm:mb-[50px]'>
                                    {currentItems.map((campaign: VotingCampaign, index: number) => (
                                        <CompetitionBox
                                            key={index}
                                            title={campaign.title}
                                            organizationID={campaign.title}
                                            banner={campaign.banner}
                                            logo={campaign.logo}
                                            id={campaign.id}
                                            link={`/campaign/${campaign.id}`}
                                            startDateTime={campaign.startDateTime}
                                            endDateTime={campaign.endDateTime}
                                        />
                                    ))}
                                </div>
                            )}
                        />
                    }

                    {
                        (!CampaignData) && 'No Campaigns to display'
                    }

                </div>
            </div>
        </>
    );
}

export default CampPage;