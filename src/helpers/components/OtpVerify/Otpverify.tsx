"use client";
import { ErrorModel } from "@/helpers/dynamic-imports/components";
import { RootState, useAppSelector } from "@/helpers/hooks/useStoreHooks";
import { dataService } from "@/utils/data/api/dataServices";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";

const OTPverify: React.FC = () => {
  const { push } = useRouter();
  const { x_api_key } = useAppSelector((state: RootState) => state.Auth);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);

  const [otp, setOtp] = useState<string[]>(["", "", "", ""]);
  const refs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const handleChange = (index: number, value: string) => {
    if (value.length === 1 && index < 3) {
      refs[index + 1].current?.focus();
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    console.log("otps", otp);
  };

  const handleKeyDown = (
    index: number,
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Backspace" && index > 0 && otp[index] === "") {
      refs[index - 1].current?.focus();
    }
  };
  //

  const submitHandler = async (
    e: React.MouseEvent<HTMLButtonElement>
  ): Promise<void> => {
    e.preventDefault();

    otp.forEach((otpCode) => {
      if (otpCode == "") {
        setErrorMessage("Please all digit of otp");
        showModel();
        return;
      }
    });
    try {
      const ArrayOTPtoString = otp.join("");
      dataService.setApiKey(x_api_key);
      const response = await dataService.patchData("/users/verify", {
        OTP: ArrayOTPtoString,
      });
      if (response.error) {
        setErrorMessage(response.error);
        showModel();
        return;
      }
      if (response.success) {
        push("/");
      }
    } catch (error: any) {
      setErrorMessage(error.response.data.error || error.message);
      showModel();
      return;
    }
  };

  function closeModal() {
    setShowModal(false);
  }

  function showModel() {
    setShowModal(true);
    setTimeout(() => {
      closeModal();
    }, 5000);
  }

  return (
    <>
      <div className="flex justify-center py-10">
        <div className="px-16 py-5 shadow-lg rounded-md border-2 w-[30rem]">
          <div className="w-full flex justify-center my-5">
            <Image
              src="/image/loginimg/verify.png"
              height={200}
              width={120}
              alt="img"
            />
          </div>
          <form>
            <div className=" text-center  flex flex-col justify-start w-full mx-auto items-center mb-8">
              <h1 className="card-title">
                Enter{" "}
                <span className="text-[#117CC4] font-secular font-500">
                  Verification Code
                </span>
              </h1>
              <p className="card-desc">
                We have send OTP to you through Email Notification
              </p>
            </div>
            <div className="w-full flex flex-col justify-center items-center">
              <div className="flex justify-center gap-2">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={refs[index]}
                    type="tel"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => {
                      handleChange(index, e.target.value);
                      e.target.style.opacity = "1";
                    }}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="otp-input opacity-[.5] text-[#fff] text-[16px] font-[500] caret-[#000]"
                  />
                ))}
              </div>
            </div>
            <div className="text-center mt-7">
              <button
                onClick={submitHandler}
                type="submit"
                className="btn py-2"
              >
                Verify
              </button>
            </div>
            <div className="w-full text-center mt-5">
              <span className="w-[70%] mx-auto">
                Did not recieve code? <br />{" "}
                <Link href="/otp/send" className="text-[#1075B8]">
                  Resend Code
                </Link>{" "}
              </span>
            </div>
          </form>
          {showModal && (
            <ErrorModel errorMessage={errorMessage} onClose={closeModal} />
          )}
        </div>
      </div>
    </>
  );
};

export default OTPverify;
