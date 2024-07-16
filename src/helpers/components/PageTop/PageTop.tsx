import { capitalize } from '@/utils/methods/common';
import Link from 'next/link';
import * as React from 'react';
import { IoIosArrowForward } from "react-icons/io";

type TopDetsType = {
    pageName: string,
    prevpageName: string,
    prevpage2Name?: string,

}

const PageTop = ({ pageName, prevpageName, prevpage2Name }: TopDetsType) => {
    return (
        <>
            <div className='py-4 sm:py-10'>
                <div className='container mx-auto flex flex-col gap-3'>
                    <div>
                        <h1 className='card-title text-[16px] sm:text-[24px]'>{pageName.toUpperCase()}</h1>
                    </div>
                    <div className='flex gap-1 items-center'>
                        <Link href={`/`} ><p className='page-top-prevpath text-[14px] sm:text-[16px] hover:underline transition-ease duration-200'>{prevpageName}</p></Link>
                        <IoIosArrowForward className='icon' />
                        {
                            prevpage2Name &&
                            <>
                                <Link href={`${prevpage2Name}`} ><p className='page-top-prevpath text-[14px] sm:text-[16px] hover-underline'>{capitalize(prevpage2Name as string)}</p></Link>
                                <IoIosArrowForward className='icon' />
                            </>
                        }
                        <Link href={`/${pageName}`} className='page-top-path text-[14px] sm:text-[16px] hover:underline transition-ease duration-200'>{capitalize(pageName as string)}</Link>

                    </div>
                </div>
            </div>
        </>
    );
}

export default PageTop;