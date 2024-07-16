"use client"
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { ErrorModel } from '@/helpers/dynamic-imports/components';
import { dataService } from '@/utils/data/api/dataServices';
import { OTP } from '@/utils/schema/formSchema';

const SendVerificationOTP : React.FC = () => {
    let router = useRouter();
    
    const [email, setemail] = useState<string>("");
    const [errorMessage , setErrorMessage] = useState<string>('');
    const [showModal, setShowModal] = useState<boolean>(false);

    const submitHandler = async (e: React.MouseEvent<HTMLButtonElement>) : Promise<void> => {
        e.preventDefault()
        if (!email) {
            setErrorMessage('Enter email to continue');
            showModel();
            return;
        }
        try{
            const response = await dataService.getData('/users/send-verification-token');
            if(response.success){
                router.push('/otp/verify')
            }
        }catch(error:any){
            setErrorMessage(error.response.data.error || error.message);
            showModel();
            return;
        }
    }

    const closeModal = () => {
        setShowModal(false);
    };

    function showModel (){
        setShowModal(true);
        setTimeout(()=>{
            closeModal()
        },5000)
    }

    return (
        <>
            <div className="flex justify-center py-10">
                <div className="px-16 py-5 shadow-lg rounded-md border-2 w-[30rem]">
                    <div className='w-full flex justify-center mb-5'>
                        <Image src='/image/loginimg/forgetpw.png' height={200} width={120} alt="Login forget FDAPP"/>
                    </div>
                    <form className=''>
                        <div className="w-full text-center flex flex-col mb-8 justify-start mx-auto items-center">
                            <h1 className="card-title">Enter Your <span className='text-[#117CC4] font-secular font-500'>Email Address</span></h1>
                            <p className='card-desc'>We need your email address to send you an OTP through Email</p>
                        </div>
                        <div className="w-full mb-8">
                                <label className='input-name' htmlFor='email'>Email</label>
                                <input
                                    value={email}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                        setemail(e.target.value)
                                    }}
                                    name='email'
                                    type="email" placeholder="example@gmail.com"
                                    className="input-box" />

                        </div>
                        <div className="w-full text-center">
                            <button
                                onClick={submitHandler}
                                type='submit'
                                className="btn py-2">Send OTP</button>
                        </div>
                        <div className='w-full text-center mt-5'>
                            <p className='w-[70%] mx-auto font-[500]'>Please read out 
                                <Link href='#' className='text-[#117CC4] hover:underline duration-200 transition-ease'> privace policy</Link> and 
                                <Link href='#' className='text-[#117CC4] hover:underline duration-200 transition-ease'> terms of services</Link>
                            </p>
                        </div>
                    </form>
                    {showModal && <ErrorModel errorMessage={errorMessage} onClose={closeModal}/>}
                </div>
            </div>
        </>
    );
}

export default SendVerificationOTP;