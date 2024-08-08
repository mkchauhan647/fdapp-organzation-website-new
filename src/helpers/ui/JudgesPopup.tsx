import Image from "next/image";
import React, { useState } from "react";

interface Props {
  judge: {
    name: string;
    image: string;
    description: string;
    post: string;
  };
  isOpen: boolean;
  onClose: () => void;
}

export default function JudgesPopup({ judge, isOpen, onClose }: Props) {
  if (!isOpen) return null;

  return (
    <div
      id="popup-modal"
      tabIndex={-1}
      className="fixed inset-0 z-50 flex items-center justify-center w-auto h-full bg-black bg-opacity-50"
    >
      <div className="relative p-4 w-full max-w-[45rem] bg-white rounded-lg shadow dark:bg-gray-700">
        <button
          type="button"
          className="absolute top-3 right-3 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
          onClick={onClose}
        >
          <svg
            className="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
          <span className="sr-only">Close modal</span>
        </button>
        <div className="p-4 md:p-5 text-center">
          <div className=" flex justify-between  w-full gap-10">

            <div className="image w-1/2 flex flex-col gap-3">
              <Image
                className="rounded-md object-contain "
                alt="judge-image"
                width={300}
                height={300}
                loading="lazy"
                src={process.env.NEXT_PUBLIC_AWS_URI + judge.image}
              />
              <div>
                <p className=" font-medium">{judge.name}</p>
              </div>
            </div>

              <div className="w-1/2 descrption flex flex-col gap-4 ">
                <div className=" text-left">
                  <h2 className=" text-3xl font-medium">Description</h2>
                  <p className="   text-base rounded-full text-gray-500 ml-1 ">
                    {judge.post}
                  </p>
                </div>
                <p className=" text-left">{judge.description}</p>
            </div>


          </div>
        </div>
      </div>
    </div>
  );
}
