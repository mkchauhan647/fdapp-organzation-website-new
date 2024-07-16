import React from 'react';
import Link from 'next/link'
import { GoDotFill } from "react-icons/go";
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { RootState, useAppSelector } from '@/helpers/hooks/useStoreHooks';
import { News } from '@/utils/schema/ApiInterface';


const NewsPage: React.FC = () => {
    const searchParams = useSearchParams();
    const newsId : string | null = searchParams.get('id')
    const {all_news_data} = useAppSelector((state : RootState) => state.News )
    const AllNews : News[] = all_news_data.fulfilledResponse?.data
    const FilteredNews : News[] = AllNews.filter(news => news.id === newsId)


    return (
        <>
            <div className='w-full pt-10 bg-[var(--pagebg)] pb-[70px] '>
                <div className='container mx-auto flex flex-col gap-8 justify-center'>
                    <div>
                        <h1 className='text-[var(--blue)] text-3xl font-secular'>News & Updates</h1>
                    </div>

                    <div className='flex md:flex-row  md:justify-between md:px-0 flex-col px-3'>
                        <div className='w-full md:w-[60%] flex flex-col'>
                            {
                                FilteredNews && FilteredNews.map((news: News, index: number) => {
                                    return (
                                        <div key={index} className='flex flex-col gap-[2rem] border-b-2 py-[3rem]'>
                                            <h3 className='text-2xl font-secular'>{news.title}</h3>
                                            <div className='h-[27rem] w-full'>
                                                <Image src={process.env.NEXT_PUBLIC_AWS_URI + news.image} 
                                                height={500} width={900} alt={news.title} className='h-full w-full  object-cover' />
                                            </div>
                                            <p className='text-[var(--blue)] font-ubuntu text-justify' >{news.description}</p>

                                        </div>
                                    )


                                })


                            }
                        </div>

                        <div className='w-full md:w-[35%]  mt-[3rem] flex flex-col gap-[1rem]'>
                            {
                                AllNews && AllNews.map((news: News, index: number) => {
                                    return (
                                        <li key={index} className='list-none px-4 py-4 bg-white shadow-sm'>
                                            <Link href={`/newspage?id=${news.id}`}>
                                                <h2 className='text-[var(--blue)] font-ubuntu text-justify'> {news.title}</h2>
                                            </Link>
                                        </li>
                                    )
                                })
                            }
                        </div>



                    </div>
                </div >
            </div >
        </>
    );
}

export default NewsPage;