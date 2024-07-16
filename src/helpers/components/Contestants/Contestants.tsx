/* eslint-disable react/jsx-key */
"use client"
import React, { useEffect } from 'react';
import { A11y, Navigation, Pagination } from 'swiper/modules';


import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import ContestantBox from '@/helpers/ui/ContestantBox';
import Controller from '@/helpers/ui/Controller';
import { Contestants } from '@/utils/schema/ApiInterface';
import { RootState, useAppDispatch, useAppSelector } from '@/helpers/hooks/useStoreHooks';
import { CommonSection, Heading  } from '@/helpers/dynamic-imports/ui';
import SkeletonImage from '../Skeleton/SkeletonImage';
import { expiryTime } from '@/utils/constants/constants';
import { GetAllCandidates } from '@/helpers/redux/candidates/_thunks';
import { successToast } from '@/utils/lib/toastify';
import { ToastContainer } from 'react-toastify';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Link from 'next/link';
import { PiArrowLineRightBold } from "react-icons/pi";


const ContestantSlide: React.FC = () => {

    const { all_candidates_data } = useAppSelector((state: RootState) => state.Candidates); // Access state.Products.all_products_data directly
    const { isPending, isFulfilled, isRejected, fulfilledResponse } = all_candidates_data;
    const CandidatesData: Contestants[] = fulfilledResponse?.data.rows
    const dispatch = useAppDispatch();


    const isExpired = all_candidates_data.expire ? new Date(all_candidates_data.expire).getTime() < Date.now() : true;

    useEffect(() => {
        successToast('SucessFUL')
        if (isExpired) {
            dispatch(GetAllCandidates());
        }
    }, [dispatch, isExpired])

    return (
        <>
            <CommonSection name='Contestants-section -has-slider -has-campaigns bg-[var(--pagebg1)]'>
                {/* <Heading title='Contestants' link='/contestants' /> */}
                <header className='w-full flex justify-between items-start md:items-end mb-[20px] sm:mb-[30px] relative'>
                    <div className='flex-col items-start w-[80%] md:w-[50%]'>
                    <h1 className='text-[2rem] font-[600] text-[var(--black)] font-poppins'>Contestants</h1>
                        <p className='paragraph text-[var(--light-text-color)] text-left w-full md:w-[85%]'>Nulla viverra at senectus commodo. Adipiscing ac habitasse nec quis libero facilisis.</p>
                    </div>
                    <div className='md:w-fit w-[20%]'>
                        <Link className='link flex items-center gap-[.5rem]' href={'/contestants'}><span className='paragraph text-[var(--c-secondary)] !font-[500]'>View All</span><span><PiArrowLineRightBold className='text-[var(--c-secondary)] text-[1.5rem]'/></span></Link>
                    </div>
                </header>

                <div className='competition-slider flex justify-between items-baseline overflow-auto'>

                    <Swiper
                        className='w-full'
                        modules={[Navigation, Pagination, A11y]}
                        spaceBetween={25}
                        slidesPerView={6}
                        loop={true}
                        navigation={{
                            nextEl: '.forward',
                            prevEl: '.back',

                        }}
                        breakpoints={{

                            0: {
                                slidesPerView: 2.5,
                                spaceBetween:15
                            },
                            390: {
                                slidesPerView: 3,
                                spaceBetween:15
                                
                            },
                            480: {
                                slidesPerView: 3.5,
                            },
                            600: {
                                slidesPerView: 4,
                            },
                            955: {
                                slidesPerView: 5,
                            },
                            1045: {
                                slidesPerView: 6

                            }
                        }}
                    >
                        {
                            (!isPending && !isRejected && CandidatesData?.length > 0) ? (
                                CandidatesData.slice(0, 8).map((candidates: Contestants, index: number) => {
                                    return (
                                        <SwiperSlide key={index}>
                                            <ContestantBox contestants={candidates} />
                                        </SwiperSlide>
                                    )
                                })
                            ) : (
                                Array.from({ length: 6 }).map((_, index: number) => {
                                    return (
                                        <SwiperSlide key={index}>
                                            <SkeletonImage isLoading={true}></SkeletonImage>
                                        </SwiperSlide>
                                    )
                                })
                            )

                        }

                        <div className="controller_wrapper mt-5">
                            <div className='flex w-full justify-center items-center gap-[1rem] py-[1rem]'>
                                <div className="back back-btn"><FaChevronLeft className='text-2xl' /></div>
                                <div className="forward forward-btn"><FaChevronRight className='text-2xl' /></div>
                            </div>
                        </div>
                    </Swiper >

                </div>
            </CommonSection>
        </>
    );
}

export default ContestantSlide;

// {
//     (!isPending && !isRejected && isFulfilled) && (
//         CandidatesData.slice(0, 8).map((candidates: Contestants, index: number) => {
//             return (
//                 <SwiperSlide key={index}>
//                     <ContestantBox contestants={candidates} />
//                 </SwiperSlide>
//             )
//         })
//     )


// }
// {
//     CandidatesData?.length === 0 && Array.from({ length: 6 }).map((_, index) => {
//         return (
//             <SwiperSlide key={index}>
//                 <SkeletonImage isLoading={true}></SkeletonImage>
//             </SwiperSlide>
//         )
//     })
// }

