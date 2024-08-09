"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Login } from "@/utils/schema/formSchema";
import { ErrorModel } from "@/helpers/dynamic-imports/components";
import { dataService } from "@/utils/data/api/dataServices";
import { AuthSlice } from "@/helpers/redux/Auth/AuthSlice";
import { useDispatch } from "react-redux";
import { useRouter, useSearchParams } from "next/navigation";
import { User } from "@/utils/schema/ApiInterface";
import { successToast } from "@/utils/lib/toastify";

const LoginBox: React.FC = () => {
  1;
  const dispatch = useDispatch(); //redux action call
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect_url");

  // form fields and error
  const [email, setemail] = useState<string>("");
  const [password, setpassword] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  const closeModal = () => {
    setShowModal(false);
  };

  function showModel() {
    setShowModal(true);
    setError(false);
    setTimeout(() => {
      closeModal();
    }, 5000);
  }

  function togglePasswordVisibility(e: any): void {
    e.preventDefault();
    setIsPasswordVisible((prevState) => !prevState);
  }

  const submitHandler = async (
    e: React.MouseEvent<HTMLButtonElement>
  ): Promise<void> => {
    e.preventDefault();
    try {
      const ValidationResult: any = Login.safeParse({ email, password });

      if (!ValidationResult.success) {
        setErrorMessage(JSON.parse(ValidationResult.error).at(0).message);
        showModel();
        return;
      }

      const response = await dataService.postData("/users/login", {
        email,
        password,
      });
      if (response.success) {
        const { token, user }: { token: string; user: User } = response.data;
        dispatch(AuthSlice.actions.login({ token, user }));
        successToast("Sucessfully logged in");
        router.push("/");
        if (user.isVerified) {
          if (redirectUrl) {
            location.href = decodeURIComponent(redirectUrl);
          }
        } else {
          console.log("User is not verified");
          const sendOtpResponse = await dataService.getData(
            "users/send-verification-token"
          );
          if (sendOtpResponse.success) {
            console.log("Otp sent successfully");
            router.push("/otp/verify");
          }
        }
      } else {
        setError(response.message);
        setErrorMessage(response.message);
        return;
      }
    } catch (e: any) {
      setError(e.message);
      setErrorMessage(e.response?.data.error || e.message);
      showModel();
    }
  };

  const GoogleLogin = () => {
    const redirectGoogleUrl = process.env.NEXT_PUBLIC_VOTING_API_GOOGLE_AUTH_URI;
    window.open(redirectGoogleUrl);
  };

  return (
    <>
      <div className="px-[20px] md:px-[47px] w-[unset] md:w-[24rem] py-1 box-content mx-auto">
        
        <form>
        <div className="text-center flex flex-col justify-start w-[100%] mx-auto items-center">
          <h2 className="text-[var(--c-secondary)] text-[22px] md:text-[1.4rem] font-bold">
            Welcome To
            <span className="text-[var(--c-primary)] text-[22px] md:text-[1.4rem] font-secular font-500 ml-2">
              FDAPP
            </span>
          </h2>
          <p className="card-desc text-[18px] mt-[10px]">
            Platform to support & Explore different Voting Campaigns
          </p>
        </div>

        <div className="flex flex-col gap-2 justify-center items-center w-full mt-[25px]">
          <div className="w-full">
            <span className="input-name text-[14px] mb-[0.5rem]">Email</span>
            <input
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setemail(e.target.value);
                setError(false);
                setErrorMessage("");
              }}
              type="email"
              placeholder="example@gmail.com"
              className={`input-box text-[14px] focus:outline-none focus:border-blue-500 ${
                error ? "error" : ""
              }`}
            />
            {error && !email && (
              <span>
                <p className="text-red-600 text-sm">
                  You have to enter vaid Email!
                </p>
              </span>
            )}
          </div>

          <div className="w-full relative" x-data="{show : true}">
            <span className="input-name text-[14px] mb-[0.5rem]">Password</span>
            <div className="relative">
              <input
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setpassword(e.target.value);
                  setError(false);
                  setErrorMessage("");
                }}
                type={isPasswordVisible ? "text" : "password"}
                placeholder="XXXXXXX"
                className={`input-box text-[14px] focus:outline-none focus:border-blue-500 ${
                  error ? "error" : ""
                }`}
              />
              <button
                className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-600"
                onClick={togglePasswordVisibility}
              >
                {isPasswordVisible ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="#E47105"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="#E47105"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                    />
                  </svg>
                )}
              </button>
            </div>
            {error && !password && (
              <span>
                <p className="text-red-600 text-sm">
                  You have to enter vaid password!
                </p>
              </span>
            )}
          </div>

          <div className="flex justify-between items-center w-full">
            <div className="flex space-x-2">
              <input
                className=""
                type="checkbox"
                id="checkbox"
                name="checkbox"
              />
              <h3 className="text-sm font-semibold -mt-1 cursor-pointer">
                Remember Me
              </h3>
            </div>
            <Link
              href="/forget-password/otp/send"
              className="text-sm font-medium text-[var(--blue)]"
            >
              Forgot Password ?
            </Link>
          </div>
        </div>

        <div className="text-center mt-4">
          <button onClick={submitHandler} type="submit" className="btn py-4">
            Login
          </button>
        </div>
        </form>

        <div className="text-center flex flex-col">
          <div className="flex justify-center items-center gap-2 my-4">
            <span className="w-full h-[1.5px] bg-slate-200"></span>
            <p className="font-bold">or</p>
            <span className="w-full h-[1.5px] bg-slate-200"></span>
          </div>
          <div className="text-center mb-7 mx-auto w-full">
            <button
              onClick={GoogleLogin}
              className=" w-full flex justify-center items-center gap-3 py-2 rounded-md border shadow-sm border-[#a5a5a585] text-black bg-white hover:shadow-md font-medium "
            >
              <span>
                <FcGoogle />
              </span>
              <p>Continue With Google</p>
            </button>
          </div>
        </div>
        {showModal && (
          <ErrorModel errorMessage={errorMessage} onClose={closeModal} />
        )}
      </div>
    </>
  );
};

export default LoginBox;
