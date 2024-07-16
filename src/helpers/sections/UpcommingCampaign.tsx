import React from 'react';
import { CommonSection, Heading } from '../dynamic-imports/ui';
import Image from 'next/image';
import { RootState, useAppSelector } from '../hooks/useStoreHooks';
import { VotingCampaignStage } from '@/utils/schema/ApiInterface';
import { Skeleton } from '@nextui-org/react';
import { getTimeStatus } from '@/utils/methods/common';
import { FaClock } from 'react-icons/fa';

const UpcommingCampaign : React.FC = () => {

  const { all_campaign_data } = useAppSelector((state: RootState) => state.VotingCampaign);
  const { isFulfilled, isPending, fulfilledResponse } = all_campaign_data;
  const RunningCampaignStageData: VotingCampaignStage[] = fulfilledResponse?.data.rows.slice(4,13);


  return (
    <CommonSection name='Upcomming-campaign --has-active-campaigns'>
      <Heading title='Upcomming Competitions' link='/campaigns' />
      <div className="mx-auto max-w-[75%] md:max-w-7xl">
        <div className='flex gap-[10px] flex-col md:flex-row'>
          {
            RunningCampaignStageData && Array.from({length:3}).map((_,ind) =>{
              return(
                <div className='flex flex-col gap-2 w-[33%]' key={ind}>
                  <div className='flex gap-x-[10px]'>
                    <div className="w-full p-2 md:p-0 shadow-md rounded-xl" >
                      <Skeleton isLoaded={isFulfilled && RunningCampaignStageData.length > 0 && !isPending} className="rounded-lg">
                        <div className="relative hover-card">
                          <Image
                            alt="gallery"
                            className="block rounded-lg object-cover object-center height-auto w-[100%] "
                            src={process.env.NEXT_PUBLIC_AWS_URI + RunningCampaignStageData[(ind)*3].logo}
                            data-image={process.env.NEXT_PUBLIC_AWS_URI + RunningCampaignStageData[(ind)*3]?.logo}
                            width={400}
                            height={300}
                          />
                          <div className="card__overlay rounded-lg bg-black bg-opacity-75 text-white absolute bottom-0 left-0 right-0 p-[10px]">
                            <h5 className="card__title text-[10px]">{RunningCampaignStageData[(ind)*3]?.title}</h5>
                            <span className="card__status text-[10px] inline-flex justify-center gap-[3px] items-center">
                              <FaClock />
                              {getTimeStatus(RunningCampaignStageData[(ind)*3].startDateTime, RunningCampaignStageData[(ind)*3]?.endDateTime).status} 
                              in 
                              {getTimeStatus(RunningCampaignStageData[(ind)*3].startDateTime, RunningCampaignStageData[(ind)*3]?.endDateTime).timeRemaining}
                            </span>
                          </div>
                        </div>
                      </Skeleton>
                    </div>
                    <div className="w-full p-2 md:p-0 shadow-md rounded-xl" key={(ind*3)} >
                      <Skeleton isLoaded={isFulfilled && RunningCampaignStageData.length > 0 && !isPending} className="rounded-lg">
                        <div className="relative hover-card">
                          <Image
                            alt="gallery"
                            className="block rounded-lg object-cover object-center height-auto w-[100%] "
                            src={process.env.NEXT_PUBLIC_AWS_URI + RunningCampaignStageData[(ind*3)+1].logo}
                            data-image={process.env.NEXT_PUBLIC_AWS_URI + RunningCampaignStageData[(ind*3)+1].logo}
                            width={400}
                            height={300}
                          />
                          <div className="card__overlay rounded-lg bg-black bg-opacity-75 text-white absolute bottom-0 left-0 right-0 p-[10px]">
                            <h5 className="card__title text-[10px]">{RunningCampaignStageData[(ind*3)+1].title}</h5>
                            <span className="card__status text-[10px] inline-flex justify-center gap-[3px] items-center">
                              <FaClock />
                              {getTimeStatus(RunningCampaignStageData[(ind*3)+1].startDateTime, RunningCampaignStageData[(ind*3)+1].endDateTime).status} 
                              in 
                              {getTimeStatus(RunningCampaignStageData[(ind*3)+1].startDateTime, RunningCampaignStageData[(ind*3)+1].endDateTime).timeRemaining}
                            </span>
                          </div>
                        </div>
                      </Skeleton>
                    </div>
                </div>
                <div className="w-full p-2 md:p-0 shadow-md rounded">
                  <Skeleton isLoaded={isFulfilled && RunningCampaignStageData.length > 0 && !isPending} className="rounded-lg">
                    {
                      RunningCampaignStageData?.length > 0 && (
                      <div className="relative hover-card" data-id={RunningCampaignStageData[2+(ind*3)]?.id}>
                        <Image
                          alt="gallery"
                          className="block rounded-xl object-cover object-center aspect-[5/3]"
                          src={process.env.NEXT_PUBLIC_AWS_URI + RunningCampaignStageData[2+(ind*3)]?.logo}
                          width={800}
                          height={300}
                        />
                        <div className="card__overlay rounded-lg bg-black bg-opacity-75 text-white absolute bottom-0 left-0 right-0 p-4">
                          <h5 className="card__title text-[14px]">{RunningCampaignStageData[2+(ind*3)]?.title}</h5>
                          <span className="card__status flex items-center gap-[3px]">
                            <FaClock />
                            {getTimeStatus(RunningCampaignStageData[2+(ind*3)]?.startDateTime, RunningCampaignStageData[2+(ind*3)]?.endDateTime).status} 
                            in 
                            {getTimeStatus(RunningCampaignStageData[2+(ind*3)]?.startDateTime, RunningCampaignStageData[2+(ind*3)]?.endDateTime).timeRemaining}
                          </span>
                        </div>
                      </div>
                      )
                    }
                  </Skeleton>
                </div>
              </div>
              )
            } )
          }
        </div>
      </div>
    </CommonSection>
  );
}

export default UpcommingCampaign;
