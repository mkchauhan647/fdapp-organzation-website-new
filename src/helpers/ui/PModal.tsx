import React, { useRef, useState } from "react";
import { Modal, ModalContent, ModalBody } from "@nextui-org/react";
import Image from "next/image";
import { IoMdPerson } from "react-icons/io";
import { IoKeySharp } from "react-icons/io5";
import { BiLogOut } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import PasswordField from "./passwordField";
import { useDisclosure } from '@nextui-org/react';
import { User } from "@/utils/schema/ApiInterface";
import { dataService } from "@/utils/data/api/dataServices";
import { RootState, useAppDispatch, useAppSelector } from "../hooks/useStoreHooks";
import { AuthSlice } from "../redux/Auth/AuthSlice";
import { ErrorModel } from "../dynamic-imports/components";
import { ChangePasswordSchema, ChangeProfileSchema } from "@/utils/schema/formSchema";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";



export default function PModal({ email, name, profile }: User) {

    const router= useRouter()

    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [activeTab, setActiveTab] = useState(0);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [showModal, setShowModal] = useState(false);


    const { token, user ,x_api_key }: { token: string, user: User ,x_api_key :string } = useAppSelector((state: RootState) => state.Auth);
    const dispatch = useAppDispatch()
    // showModel();

    // change password
    const handlePasswordSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (newPassword != confirmNewPassword) {
            setErrorMessage('New and confirm password did not matched');
            onClose()
            showModel();
            return;
        }
        try {
            const validationResult: any = ChangePasswordSchema.safeParse({ newPassword, oldPassword: password, confirmPassword: confirmNewPassword })
            if (!validationResult.success) {
                setErrorMessage(JSON.parse(validationResult.error).at(0).message)
                setShowModal(true);
                setTimeout(() => {
                    closeModal()
                }, 5000)
                return;
            }
            const response = await dataService.patchData('/users/change-password', { newPassword, oldPassword: password }, token)
            if (response.success) {
                dispatch(AuthSlice.actions.logout());
                setActiveTab(0);
                onClose();
            }

        } catch (e: any) {
            setErrorMessage(e.response.data.error || e.message);
            onClose();
            showModel();
            return;
        }

    }

    // change profile
    const handleProfileSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (!name || !email) {
            setErrorMessage('Both field are required');
            onClose()
            showModel();
            return;
        }
        try {
            const validationResult: any = ChangeProfileSchema.safeParse({ name: userName })
            if (!validationResult.success) {
                setErrorMessage(JSON.parse(validationResult.error).at(0).message)
                setShowModal(true);
                setTimeout(() => {
                    closeModal()
                }, 5000)
                return;
            }
            const response = await dataService.patchData('/users', { name: userName }, token)
            if (response.success) {
                dispatch(AuthSlice.actions.logout());
                setActiveTab(0);
                onClose();
            }

        } catch (e: any) {
            setErrorMessage(e.response.data.error || e.message)
            showModel();
            return;
        }

    }

    // logout
    const handleLogOut = async () => {
        try {
            dispatch(AuthSlice.actions.logout())
            const response = await dataService.getData('/users/logout', token);
            if (response.success) {
                localStorage.removeItem("candidateId")
                localStorage.removeItem("selectedCoupon")    
                setActiveTab(0);
                onClose();
                router.push('/')
                

            }
        } catch (e: any) {
            setErrorMessage(e.response.data.error || e.message)
            showModel();
            return;
        }
    }

    // delete account
    const handleDelete = async () => {
        try {
            const response = await dataService.deleteData(`/users/${user.id}`, token);
            if (response.success) {
                dispatch(AuthSlice.actions.logout())
                setActiveTab(0);
                onClose();
            }
        } catch (e: any) {
            setErrorMessage(e.response.data.error || e.message);
            onClose();
            showModel();
        }
    }

    const closeModal = () => {
        setShowModal(false);
    };

    function showModel() {
        setShowModal(true);
        setTimeout(() => {
            closeModal()
        }, 5000)
    }

    // change profile click
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [file , setFile] = useState<any>(null)

    const handleImageClick: () => void = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };
    
    // change profile picture
    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            const file = files[0];
            const fileNameParts = file.name.split('.');
            const fileExtension = fileNameParts[fileNameParts.length - 1].toLowerCase();
            
            // Check if the file extension is either jpg, png, jpeg, gif, or bmp
            if (fileExtension === 'jpg' || fileExtension === 'png' || fileExtension === 'jpeg' || fileExtension === 'gif' || fileExtension === 'bmp') {
                setSelectedImage(file);

                try {
                    // Create a new FormData object
                    let formData = new FormData();
                    if(event.target.files)setFile(event.target.files[0])
                    formData.append('profile',file , file.name)
                    
                    // Send the formData to the server
                    const response :any = await axios.patch(`${process.env.NEXT_PUBLIC_VOTING_API_URI}/users/profile`,formData,{
                        headers:{
                            'content-type':'multipart/form-data',
                            'Authorization':`Bearer ${token}`,
                            'x-api-key':`Bearer ${x_api_key}`

                        }
                    })
                    if (response.success) {
                        setSelectedImage(file);
                    }
                } catch (error : any) {
                    setErrorMessage(error.response.data.error || error.message);
                }
            } else {
                event.target.value = '';
                setErrorMessage('Please upload an image with jpg, jpeg, png, gif, or bmp extension.');
            }
        }
    };
    
    

    return (
        <>
            <div className="flex flex-wrap gap-3">
                <Image src={profile ? process.env.NEXT_PUBLIC_AWS_URI + profile : '/image/dymmy-profile.jpg'} height={30} width={30} alt="Profile"
                    className='rounded-lg cursor-pointer w-[20px] h-[20px] sm:w-[25px] sm:h-[25px] min-h[15px] min-w-[15px] object-cover'
                    title={user && user.name} 
                    onClick={() => onOpen()} />
            </div>
            <Modal
                size="3xl"
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalContent className="">
                    <ModalBody className="px-4 sm:px-6 min-h-[85vh] sm:min-h-[100%] py-6 bg-[#FFF]">
                        {/* Your modal content */}
                        <div className="flex flex-col md:flex-row">
                            <div className=" w-[100%] md:w-[35%] pr-4 flex flex-col gap-8 pt-8 pb-6 md:py-2 border-b-1 md:border-r-1 md:border-b-0 border-[var(--c-rose-pink)]">
                                <div className="h-[6rem] w-[6rem] mx-auto relative">
                                    <Image src={ selectedImage ? URL.createObjectURL(selectedImage) : (profile ? process.env.NEXT_PUBLIC_AWS_URI + profile : "/image/home/contest.png")} 
                                    height={500} width={900} alt="Profle" className="h-full w-full rounded-full object-cover"/>
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        className="hidden"
                                        onChange={handleFileChange}
                                    />
                                    <Image
                                        src="/image/home/camera.png"
                                        alt="Camera"
                                        height={100}
                                        width={100}
                                        className="h-[1.4rem] w-[1.8rem] absolute bottom-[8%] right-0 cursor-pointer"
                                        onClick={handleImageClick}
                                    />
                                </div>
                                <ul className="flex flex-row md:flex-col gap-1">
                                    <li className={`profile-list cursor-pointer text-[var(--blue)] ${activeTab == 0 ? 'bg-[--c-d-light]' : true}`} onClick={() => { setActiveTab(0) }}>
                                        <IoMdPerson className="profile-icons text-[1.3rem]" />
                                        <p className="text-[12px] sm:text-[14px] font-[500] line-clamp-1">Profile</p>
                                    </li>
                                    <li className={`profile-list cursor-pointer text-[var(--blue)] ${activeTab == 1 ? 'bg-[--c-d-light]' : true}`} onClick={() => { setActiveTab(1) }}>
                                        <IoKeySharp className="profile-icons text-[1.3rem]" />
                                        <p className="text-[12px] sm:text-[14px] font-[500] line-clamp-1">Change Password</p>
                                    </li>
                                    <li className={`profile-list cursor-pointer text-red-600 ${activeTab == 2 ? 'bg-[--c-d-light]' : true}`} onClick={() => { setActiveTab(2) }}>
                                        <BiLogOut className="profile-icons text-[1.3rem] fill-[var(--c-secondary)]" />
                                        <p className="text-[12px] sm:text-[14px] font-[500] line-clamp-1 text-[var(--c-secondary)]">Logout</p>
                                    </li>
                                    <li className={`profile-list cursor-pointer text-red-600 ${activeTab == 3 ? 'bg-[--c-d-light]' : true}`} onClick={() => { setActiveTab(3) }}>
                                        <MdDelete className="profile-icons text-[1.3rem] fill-[var(--c-secondary)]" />
                                        <p className="text-[12px] sm:text-[14px] font-[500] line-clamp-1 text-[var(--c-secondary)]">Delete Account</p>
                                    </li>
                                </ul>
                            </div>
                            {activeTab === 0 && (
                                <div className="w-[100%] md:w-[65%] flex flex-col gap-4 md:gap-10 items-center px-0 md:px-8 py-8 sm:py-[62px]">
                                    <div className="w-full text-center flex flex-col gap-[3px]">
                                        <h1 className="card-title">Edit <span className="card-title-blue">Profile Details</span></h1>
                                        <p className="card-desc">Provide your new details to update your existing details</p>
                                    </div>

                                    <div className="w-full flex flex-col gap-3">
                                        <div>
                                            <p className="input-name">Name</p>
                                            <input
                                                onChange={(e) => setUserName(e.target.value)}
                                                className="input-box" type="text" placeholder="Your Name" />
                                        </div>
                                        <div>
                                            <p className="input-name">Email</p>
                                            <input
                                                onChange={(e) => setUserEmail(e.target.value)}
                                                value={user.email}
                                                className="input-box" type="email" placeholder="example@gmail.com" readOnly={true} />
                                        </div>

                                        <div className="w-full mt-5">
                                            <button
                                                onClick={handleProfileSubmit}
                                                className="btn py-2">Save Changes</button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 1 && (
                                <div className="w-[100%] md:w-[65%] flex flex-col gap-4 md:gap-10 items-center px-0 md:px-8 py-8 sm:py-10">
                                    <div className="w-full text-center flex flex-col gap-2">
                                        <h1 className="card-title">Edit <span className="card-title-blue">Password</span></h1>
                                        <p className="card-desc">Provide your new password to update your existing password</p>
                                    </div>

                                    <form className="w-full flex flex-col gap-3">
                                        <div>
                                            <p className="input-name">Old Password</p>
                                            <PasswordField setpassword={setPassword} />
                                        </div>
                                        <div>
                                            <p className="input-name">New Password</p>
                                            <PasswordField setpassword={setNewPassword} />
                                        </div>
                                        <div>
                                            <p className="input-name">Confirm New Password</p>
                                            <PasswordField setpassword={setConfirmNewPassword} />
                                        </div>

                                        <div className="w-full mt-5">
                                            <button
                                                type="submit"
                                                onClick={handlePasswordSubmit}
                                                className="btn py-2">Save Changes</button>
                                        </div>
                                    </form>
                                </div>
                            )}

                            {activeTab === 2 && (
                                <div className="w-[100%] md:w-[65%] flex flex-col gap-4 md:gap-10 items-center px-0  self-center relative">
                                    <div className="mx-auto text-center mt-8 md:mt-0">
                                        <h2 className="text-[14px] md:text-[1.4rem] font-[500] text-[var(--blue)] font-secular">Confirm
                                            <span className="text-[--c-secondary] text-[1.4rem]"> Log out</span> ?</h2>
                                        <h3 className="mx-auto font-[500] text-[var(--black)] text-[12px] md:text-[14px]">Click to confirm
                                            <span className="text-[12px] md:text-[14px] text-[--c-secondary]"> log out</span> </h3>
                                        <div className="flex gap-5 text-center justify-center mt-5">
                                            <button className="px-4 py-2 bg-[var(--btncolor)] text-[12px] md:text-[14px] text-white  rounded-lg font-[700]" onClick={handleLogOut}>Confirm</button>
                                            <button
                                                onClick={() => { setActiveTab(1) }}
                                                className="px-4 py-2 text-[12px] md:text-[14px] bg-[#DF383033] text-[--c-secondary] rounded-lg font-[700]" >Cancel</button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 3 && (
                                <div className="w-[100%] md:w-[65%] flex flex-col gap-4 md:gap-10 items-center px-0 self-center">
                                    <div className="mx-auto text-center mt-8 md:mt-0">
                                        <h2 className="text-[14px] md:text-[1.4rem] font-[500] text-[var(--blue)] font-secular">Confirm
                                            <span className="text-[--c-secondary] text-[1.4rem]"> Delete</span> ?</h2>
                                        <h3 className="mx-auto font-[500] text-[var(--black)] text-[12px] md:text-[14px]">Click to confirm
                                            <span className="text-[12px] md:text-[14px] text-[--c-secondary]"> delete</span> </h3>
                                        <div className="flex gap-5 text-center justify-center mt-5">
                                            <button className="px-4 py-2 bg-[var(--btncolor)] text-[12px] md:text-[14px] text-white  rounded-lg font-[700]" onClick={handleDelete}>Confirm</button>
                                            <button
                                                onClick={() => { setActiveTab(1) }}
                                                className="px-4 py-2 text-[12px] md:text-[14px] bg-[#DF383033] text-[--c-secondary] rounded-lg font-[700]" >Cancel</button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </ModalBody>
                </ModalContent>
            </Modal>
            {showModal && <ErrorModel errorMessage={errorMessage} onClose={closeModal} />}
        </>
    );
}
