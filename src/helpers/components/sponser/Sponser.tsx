/* eslint-disable react/jsx-key */
import React from 'react';
import { Navigation, Pagination, A11y } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Image from 'next/image';
import SectionHeading from '@/helpers/ui/SectionHeading';
import { CommonSection } from '@/helpers/dynamic-imports/ui';
import { BsArrowRight } from 'react-icons/bs';
import Link from 'next/link';
import { RootState, useAppSelector } from '@/helpers/hooks/useStoreHooks';




const SponserSlide: React.FC = () => {
    const { all_org_setting_data } = useAppSelector((state: RootState) => state.OrgSetting);
    const fulfilledResponseOrg = all_org_setting_data?.fulfilledResponse;

    let orgSettingData: any = null;

    if (fulfilledResponseOrg?.data && Array.isArray(fulfilledResponseOrg.data)) {
    [orgSettingData] = fulfilledResponseOrg.data;
    }

    return (
        <>
            <CommonSection name='sponsore bg-[var(--pagebg1)]'>
                <section className='flex md:flex-row flex-col w-full gap-[2rem]'>
                    <div className='md:w-[50%] w-full flex flex-col gap-[1.5rem]'>
                        <span>
                            <h1 className='text-[2.5rem] font-[700] text-[var(--blue)] w-full'>Supporting Partners: <span className='text-[2.5rem] font-[700] text-[var(--c-secondary)]'>Empowering</span> Dreams Together!</h1>
                        </span>
                        <span className='flex flex-col gap-[.5rem] text-justify'>
                            <p className='paragraph text-[var(--light-text-color)]'>{orgSettingData?.sponserBody}</p>
                        </span>

                        <span>
                            <button className='btn-primary'>Contact Us</button>
                        </span>
                    </div>

                    <div className='md:w-[50%] w-full bg-white rounded-md px-[1rem] py-[1rem] md:px-[2rem] md:py-[2rem] flex flex-col gap-[1.5rem]'>
                        <h1 className='text-[24px] text-[var(--c-secondary)] font-[600]'>Sponsers</h1>
                        <div className='competition-slider px-2 sm:px-0 flex flex-wrap justify-start gap-[.5rem] items-baseline'>
                            {
                                orgSettingData?.sponserImages.slice(0, 7).map((logo:any, index:any) => {
                                    return (
                                        <>
                                           
                                        <div className='relative mx-auto md:mx-0' >
                                        {
                                            index  === 6 && <Link href="#" className='h-[8rem] w-[8rem] flex flex-col items-center justify-center rounded-md bg-[var(--c-primary)] absolute opacity-90 z-10'><span className='paragraph text-[white] !font-[500]'>View All</span><span><BsArrowRight className='text-[white] text-[1.5rem]' /></span></Link>
                                        }
                                        <Image key={index} src={logo} height={500} width={900} alt="img" className={`h-[8rem] w-[8rem] border-2 hover:shadow-md object-cover rounded-md`} />
                                        </div>
                                            
                                        </>
                                    )
                                })
                            }
                        </div>

                    </div>
                </section>
            </CommonSection>

        </>
    );
}

export default SponserSlide;