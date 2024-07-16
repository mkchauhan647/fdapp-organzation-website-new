import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import Image from "next/image";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Link from "next/link";
import CoupanModal from "./CoupanModal";
import { Contestants } from "@/utils/schema/ApiInterface";

export default function DetailModal({candidate}:{candidate:Partial<Contestants>}) {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleOpen = () => {
        onOpen();
    }

    return (
        <>
            <button
                onClick={() => handleOpen()}
                className='text-[--c-secondary] font-[500] text-[12px]'>Details</button>
            <Modal 
            size="md"
            backdrop='blur' isOpen={isOpen} onClose={onClose}>
                <ModalContent className="py-2 pt-4 px-1">
                    {(onClose) => (
                        <>
                            <ModalBody>
                                <div className="flex flex-col gap-5">
                                    <div className="flex gap-3 items-center">
                                        <div className="h-[3.8rem] w-[4rem] rounded-lg">
                                            <Image src='/image/home/contest.png' height={500} width={900} alt="profile" className="h-full w-full rounded-lg" />
                                        </div>
                                        <div>
                                            <h1 className="card-title-blue">{candidate.name}</h1>
                                            <p className="text-xl font-[500] text-[var(--light)]">Xactor UK | {candidate.code}</p>
                                        </div>
                                    </div>

                                    <div>
                                        <p className="profile-topic">About</p>
                                        <p className="text-sm font-[500] text-[var(--light)] text-left">
                                            {candidate.biography}
                                        </p>

                                    </div>

                                    <div>
                                        <p className="profile-topic">Additional Information</p>
                                        <div className="flex flex-wrap items-center gap-2">
                                            <div className="contestant-info-box"><p className="text-[13px] ">{candidate.nationality}</p></div>
                                            <div className="contestant-info-box"><p className="text-[13px] ">{candidate.city}</p></div>
                                            <div className="contestant-info-box"><p className="text-[13px] ">{candidate.gender}</p></div>
                                            <div className="contestant-info-box"><p className="text-[13px] ">{candidate.weight} lbs</p></div>
                                            <div className="contestant-info-box"><p className="text-[13px] ">{candidate.age} Years Old</p></div>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="profile-topic">Social Media</p>
                                        <div className="flex items-center gap-4 text-xl text-[var(--blue)]">
                                            {candidate.socialMediaFacebook && <Link href={candidate.socialMediaFacebook}> <FaFacebook /></Link> }
                                            {candidate.socialMediaInstagram && <Link href={candidate.socialMediaInstagram}> <FaInstagram /></Link> }
                                            {candidate.socialMediaInstagram && <Link href={candidate.socialMediaInstagram}> <FaXTwitter /></Link> }
                                        </div>
                                    </div>
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                {/* <CoupanModal /> */}
                                {/* <button className="py-2 px-6 bg-[var(--orange)] text-white rounded-lg">Vote Now</button> */}
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
