import { RootState } from '@/helpers/redux/store';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useSelector } from 'react-redux';
import { MdCheckCircle } from "react-icons/md";

const Success : React.FC = () => {
    const paymentStatus = useSelector((state: RootState) => state.Payment.paymentStatus);
  const paymentData = useSelector((state: RootState) => state.Payment.paymentData);
  console.log(paymentData)
    return (
        <>
            <div className="flex justify-center items-center py-10">
                <div className="px-12 py-16 shadow-lg rounded-md border-2 flex flex-col items-center gap-5 w-[90%] md:w-1/3">
                    {/* <div className='w-full flex justify-center my-5'>
                        <Image src='/image/loginimg/success.png' height={200} width={120} alt="img" />
                    </div>
                    <div className='w-[70%] text-center mx-auto flex flex-col gap-2 items-center justify-start'>
                        <h3 className='text-[#117CC4] font-secular font-500 text-xl'>Successfully</h3>
                        <p className='card-desc'>Proceeded your request</p>
                    </div>
                    <div className='flex justify-center'>
                        <Link className='btn py-2 px-4 inline mx-auto w-fit' href='/'>Continue</Link>
                    </div> */}
<div className="flex flex-col items-center justify-center rounded-xl bg-green-400 w-full p-3 text-white">
<MdCheckCircle className='text-8xl'/>
        {/* <CheckCircleIcon className="h-16 w-16 text-green-500" /> */}
        <p className='text-2xl font-bold'>Payment Success</p>
        <p className='text-sm'>Your transaction Completed Successfully</p>
        <p></p>
      </div>

      {/* Transaction Details */}
      <div className="text-start space-y-2 w-full">
        <p className="text-gray-600 font-bold">
          Transaction ID: <span className="font-medium">{paymentData?.paymentData.data.transactionId}</span>
        </p>
        <p className="text-gray-600 font-bold">
          Amount: <span className="font-medium">{paymentData?.paymentData.data.totalTransactionAmount}</span>
        </p>
        <p className="text-gray-600 font-bold">
          Service Charge: <span className="font-medium">{paymentData?.paymentData.data.transactionCharge}</span>
        </p>
        <p className="text-gray-600 font-bold">
          Payment Service: <span className="font-medium">{paymentData?.paymentData.data.paymentService}</span>
        </p>
        <p className="text-gray-600 font-bold">
          Status: <span className={`font-medium ${paymentData?.paymentData.data.paymentStatus==="FAILED"?"text-red-600":"text-green-600"} `}>{paymentData?.paymentData.data.paymentStatus}</span>
        </p>
        
        <p className="text-gray-600 font-bold">
          Currency: <span className="font-medium">{paymentData?.paymentData.data.currency}</span>
        </p>
      </div>
                </div>
            </div>
        </>
    );
}

export default Success;