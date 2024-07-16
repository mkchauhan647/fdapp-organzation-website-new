import * as React from 'react';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Controller = () => {
    return (
        <>
            <div className='absolute top-[40%] translate-y-[-50%] left-0 z-10 flex w-full justify-between items-center py-[1rem] '>
                <div className="back back-btn ml-[-10px] md:ml-[-20px]"><FaChevronLeft className='text-2xl' /></div>
                <div className="forward forward-btn mr-[-10px] md:mr-[-20px]"><FaChevronRight className='text-2xl' /></div>
            </div>
        </>

    );
}

export default Controller;