import React, { useEffect, useRef, useState } from 'react';
import ContestantBox from '@/helpers/ui/ContestantBox';
import SearchBox from '@/helpers/ui/SearchBox';
import Pagination from '../pagination/pagination';
import { Contestants } from '@/utils/schema/ApiInterface';
import { RootState, useAppDispatch, useAppSelector } from '@/helpers/hooks/useStoreHooks';
import { GetAllCandidates } from '@/helpers/redux/candidates/_thunks';

const ContestPage = () => {
    const [filterData, setFilterData] = useState<string>('');
    const didMount = useRef<boolean>(false);
    const dispatch: any = useAppDispatch()

    useEffect(() => {
        if (!didMount.current) {
            didMount.current = true;
        }
        dispatch(GetAllCandidates());
    }, [dispatch])

    const { all_candidates_data } = useAppSelector((state: RootState) => state.Candidates);
    const { isFulfilled, fulfilledResponse } = all_candidates_data;
    const CandidatesData: Contestants[] = fulfilledResponse?.data.rows

    return (
        <>
            <div className='w-full pb-[70px]'>
                <div className='container mx-auto flex flex-col justify-center'>
                    <div className='w-full flex flex-col md:flex-row justify-between items-start  mb-[30px] md:mb-[65px]'>
                        <p className='text-lg text-[var(--lightblack)] mb-4 sm:mb-0'>Short by: <span className='text-lg text-[var(--blue)]'>Newest</span></p>
                        <div className='w-full md:w-auto'>
                            <SearchBox setFilterData={setFilterData} />
                        </div>
                    </div>

                    {
                        (CandidatesData && CandidatesData.length > 0 && isFulfilled) &&
                        <Pagination
                            itemsPerPage={12}
                            items={CandidatesData.filter((contestant: Contestants) => filterData.trim() !== '' ? contestant.name?.includes(filterData) : true)}
                            ItemsComponent={({ currentItems }: { currentItems: Contestants[] }) => (
                                <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-6 gap-x-4 sm:gap-x-16 md:gap-x-10 lg:gap-y-30 md:gap-y-8 gap-y-10 mb-[50px]'>
                                    {currentItems.map((contestant: Contestants, index: number) => (
                                        <ContestantBox
                                            key={index}
                                            contestants={contestant}
                                        />
                                    ))}
                                </div>
                            )}
                        />
                    }
                    {
                        (!CandidatesData) && 'No candidates to show'
                    }

                </div>
            </div>
        </>
    );
}

export default ContestPage;
