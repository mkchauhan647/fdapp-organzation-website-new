"use client"
import { ErrorModel } from '@/helpers/dynamic-imports/components';
import { RootState, useAppDispatch, useAppSelector } from '@/helpers/hooks/useStoreHooks';
import { AuthSlice } from '@/helpers/redux/Auth/AuthSlice';
import PasswordField from '@/helpers/ui/passwordField';
import { dataService } from '@/utils/data/api/dataServices';
import { ResetPasswordSchema } from '@/utils/schema/formSchema';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const ResetPass : React.FC = () => {
    let { push } = useRouter();
    const [newPassword, setnewPassword] = useState<string>("");
    const [confirmPassword, setconfirmPassword] = useState<string>("");
    const [error, seterror] = useState<boolean>(false);
    const [errorMessage , setErrorMessage] = useState<string>('');
    const [showModal, setShowModal] = useState<boolean>(false);
    const {reset_password_token , x_api_key} = useAppSelector((state : RootState) => state.Auth);
    const dispatch = useAppDispatch()

    // useEffect(()=>{
    //     if(!reset_password_token) push('/forget-password/otp/send');
    //     dispatch(AuthSlice.actions.removeResetPasswordToken());
    // },[reset_password_token , push , dispatch])

    const  submitHandler = async(e: React.MouseEvent<HTMLButtonElement>) : Promise<void> => {
        e.preventDefault()
        try{
            const validationResult : any = ResetPasswordSchema.safeParse({newPassword , confirmPassword});
            if(!validationResult.success){
                setErrorMessage(JSON.parse(validationResult.error).at(0).message);
                showModel();
                return;
            }
            dataService.setApiKey(x_api_key)
            const response = await dataService.patchData('/users/reset-password',{newPassword , confirmPassword},reset_password_token);
            if(response.success){
                dispatch(AuthSlice.actions.removeResetPasswordToken());
                push('/success')
            }
        }catch(error : any){
            setErrorMessage(error.response.data.error || error.message);
            showModel();
            push('/error')
            return;
        }

    }

    const closeModal = () => {
        setShowModal(false);
    };

    function showModel (){
        setShowModal(true);
        seterror(true)
        setTimeout(()=>{
            seterror(false)
            closeModal()
        },5000)
    }

    return (
        <>
            <div className="flex justify-center py-5">
                <div className="px-16 py-10 shadow-lg rounded-md border-2 w-[30rem]">
                    <div className='w-full flex justify-center mb-2'>
                        <Image src='/image/loginimg/forgetpw.png' height={200} width={120} alt="img" />
                    </div>
                    <form>
                        <div className="text-center cursor-pointer flex flex-col justify-start w-full mx-auto items-center">
                            <h1 className="card-title">Reset your <span className='text-[#117CC4] font-secular font-500'>Password</span></h1>
                            <p className='card-desc'>Provide your new password and cofirm password</p>
                        </div>
                        <div className="w-full flex flex-col gap-5 mt-8 justify-center items-center">
                            <div className="w-full">
                                <label className='input-name' htmlFor='new_password'>New Password</label>
                                <PasswordField setErrorMessage={setErrorMessage} error={error} setError={seterror} setpassword={setnewPassword}/>
                            </div>
                            <div className="w-full">
                                <label className='input-name'>Confirm Password</label>
                                <PasswordField setErrorMessage={setErrorMessage} error={error} setError={seterror} setpassword={setconfirmPassword}/>
                            </div>
                        </div>
                        <div className="w-full text-center mt-7">
                            <button
                                onClick={submitHandler}
                                type='submit'
                                className="btn py-2">Reset</button>
                        </div>
                    </form>
                    {
                        error && <ErrorModel errorMessage={errorMessage} onClose={closeModal} />
                    }
                </div>
            </div>
        </>
    );
}

export default ResetPass;