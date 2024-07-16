import React, { useEffect } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";

export default function CustomModal({title,handleSubmit}:any) {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleOpen = () => {
        onOpen();
    }

    return (
        <>
            <Modal
                size="full"
                backdrop='blur' isOpen={isOpen} onClose={onClose}>
                <ModalContent className="px-5 py-5">
                    {(onClose) => (
                        <>
                            <ModalBody className="flex items-center justify-center">
                                <div className="w-[60%] mx-auto text-center">
                                    <h1 className="text-3xl font-[500] text-[var(--blue)] font-secular">Are you sure you want to {title} ?</h1>
                                    <p className="w-[40%] mx-auto font-[500] text-[var(--black)]">Clicking Confirm will {title} </p>
                                    <div className="flex gap-5 text-center justify-center mt-5">
                                        <button className="px-4 py-2 bg-[var(--btncolor)] text-white  rounded-lg font-[700]" onClick={handleSubmit()}>Confirm</button>
                                        <button
                                            onClick={onClose}
                                            className="px-4 py-2 bg-[#DF383033] text-[#DF3830] rounded-lg font-[700]" >Cancel</button>
                                    </div>
                                </div>
                            </ModalBody>

                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
