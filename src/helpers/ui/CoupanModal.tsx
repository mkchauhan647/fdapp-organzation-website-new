'use client'
import React, { useEffect } from "react";
import { Modal, ModalContent, ModalBody, useDisclosure } from "@nextui-org/react";
import Coupan from "./Coupan";
import { Coupon } from "@/utils/schema/ApiInterface";
import { RootState, useAppDispatch, useAppSelector } from "../hooks/useStoreHooks";
import {useRouter} from "next/navigation";
import { GetCouponsByVotingCampaignID } from "../redux/coupons/_thunks";
import { dataService } from "@/utils/data/api/dataServices";

export default function CoupanModal({campaignID} : {campaignID?  : string}) {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const {all_coupons_by_campaign_id_data} = useAppSelector((state : RootState) => state.Coupons);
    const { token ,x_api_key } = useAppSelector((state : RootState) => state.Auth)
    const Coupons : Coupon[] = all_coupons_by_campaign_id_data.fulfilledResponse?.data?.rows;
    const router = useRouter();
    const dispatch = useAppDispatch()

    useEffect(()=>{
        if(campaignID){
            dataService.setApiKey(x_api_key)
            dispatch(GetCouponsByVotingCampaignID(campaignID))
        }
    },[campaignID , x_api_key])
    const handleOpen = () => {
        if(!token){
            router.push(`/login?redirect_url=${encodeURIComponent(location.href)}`)
        }
        onOpen();
    }

    return (
        <>
            <button
                onClick={() => handleOpen()}
                className="py-2 px-2 bg-[var(--c-secondary)] text-white rounded-lg font-[500] text-[12px]">
                Vote Now
            </button>

            <Modal
                size="4xl"
                backdrop='blur' isOpen={isOpen} onClose={onClose}>
                <ModalContent className="bg-[var(--pagebg)] px-3 pb-6">
                    {(onClose) => (
                        <>
                            <ModalBody className="px-2 md:px-6">
                                <div className="w-full py-5 text-center">
                                    <h1 className="text-2xl font-[700] text-[var(--black)]">Available Coupons</h1>
                                </div>
                                <div className="grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-5">
                                    {
                                        (Coupons && Coupan.length > 0) && Coupons.map((coupon : Coupon , index :number) => {
                                            return(

                                                <Coupan {...coupon} key={index} />
                                            )
                                        })
                                    }
                                </div>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
