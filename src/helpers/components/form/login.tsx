"use client"
import React, { useEffect } from 'react';
import Image from 'next/image';
import { Login } from '@/helpers/dynamic-imports/components';
import { RootState, useAppSelector } from '@/helpers/hooks/useStoreHooks';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const LoginSection : React.FC = () => {
    const router = useRouter();
    const {token} = useAppSelector((state:RootState) => state.Auth);
    
    useEffect(()=>{
        if(token){
            router.push('/');
        }
    },[token , router])
    

    return (
        <section className='Login -has-login-component -is-user-login relative'>
            <div className="flex justify-center lg:justify-start items-start px-20 mx-auto mt-[34px] mb-[82px] container relative">
                <div className=" py-[28px] shadow-lg rounded-md border-2 w-fit lg:w-1/2">
                    <Login /> 
                    <div className='w-full text-center'>
                        <Link
                            href={'/register'}
                            className="text-sm text-[#117CC4] font-[500]">
                                Not a User? Create New Account
                        </Link>
                    </div>
                </div>
                <div className='h-full lg:block hidden absolute w-1/2 h-full right-0 object-cover' style={{background:'url("/image/loginimg/login.png")'}}>
                    {/* <Image src="/image/loginimg/login.png" height={500} width={963} alt="" className='h-[100%] object-cover' />  */}
                </div>


            </div>
        </section>
    );
}

export default LoginSection;