"use client"
import * as React from 'react';
import { IoSearch } from "react-icons/io5";

const SearchBox = ({filterData , setFilterData} :any) => {
    return (
        <div className='mx-auto md:w-auto w-full'>
            <div className="searchbox relative flex items-center w-full md:max-w-[246px] h-12 rounded-2xl bg-white overflow-hidden">
                <div className="grid place-items-center h-full w-12 text-gray-900 pl-[10px]">
                    <IoSearch className='w-[20px] h-[20px]' style={{fill:'rgba(90, 92, 91, 1)'}} />
                </div>

                <input
                    className="peer h-full w-full outline-none text-md text-gray-900 pr-2 text-[12px]"
                    type="text"
                    id="search"
                    placeholder="Search"
                    onChange={e => setFilterData(e.target.value)}
                    />
                    
            </div>
        </div>
    );
}

export default SearchBox;