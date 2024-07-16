"use client";
import { ErrorModel } from "@/helpers/dynamic-imports/components";
import { AuthSlice } from "@/helpers/redux/Auth/AuthSlice";
import PasswordField from "@/helpers/ui/passwordField";
import { dataService } from "@/utils/data/api/dataServices";
import { Register } from "@/utils/schema/formSchema";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

const RegisterBox: React.FC = () => {
  const [email, setemail] = useState<string>("");
  const [name, setname] = useState<string>("");
  const [newPassword, setnewPassword] = useState<string>("");
  const [confirmPassword, setconfirmPassword] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isChecked, setChecked] = useState<boolean>(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const closeModal = () => {
    setShowModal(false);
    setErrorMessage("");
    setError(false);
  };

  let submitHandler = async (
    e: React.MouseEvent<HTMLButtonElement>
  ): Promise<void> => {
    e.preventDefault();
    try {
      if (!isChecked) {
        setErrorMessage("Please accept terms and policy");
        setShowModal(true);
        setTimeout(() => {
          closeModal();
        }, 5000);
        return;
      }
      const validateResult: any = Register.safeParse({
        email,
        name,
        newPassword,
        confirmPassword,
      });
      if (!validateResult.success) {
        setErrorMessage(JSON.parse(validateResult.error).at(0).message);
        setShowModal(true);
        setTimeout(() => {
          closeModal();
        }, 5000);
        return;
      }
      const response = await dataService.postData("/users", {
        email,
        name,
        password: newPassword,
      });
      if (response.success) {
        const { data } = response;
        dispatch(AuthSlice.actions.login(data));
        router.push("/otp/verify");
      }
    } catch (e: any) {
      console.log("errss", e);
      setErrorMessage(
        e.response?.data?.error ? e.response.data.error : e.message
      );
      setShowModal(true);
      setTimeout(() => {
        closeModal();
      }, 5000);
    }
  };
  return (
    <>
      <form className="px-8 md:px-16 w-[100%] md:w-[30rem] py-1">
        <div className="text-center flex flex-col gap-1 justify-start w-[100%] mx-auto items-center">
          <h2 className="card-title">
            Create Your{" "}
            <span className="text-[#117CC4] font-secular font-500">
              Account
            </span>
          </h2>
          <p className="card-desc">
            Enter your details to register your account into our platform
          </p>
        </div>

        <div className="w-full flex flex-col gap-4 justify-center items-center mt-3">
          <div className="w-full">
            <label className="input-name" htmlFor="name">
              Name
            </label>
            <input
              name="name"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setname(e.target.value);
                setErrorMessage("");
                setError(false);
              }}
              type="name"
              placeholder="Your Name"
              className={`input-box focus:outline-none focus:border-blue-500 ${
                error ? "error" : true
              }`}
            />
          </div>

          <div className="w-full">
            <label className="input-name" htmlFor="email">
              Email
            </label>
            <input
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setemail(e.target.value);
                setErrorMessage("");
                setError(false);
              }}
              type="email"
              placeholder="example@gmail.com"
              name="email"
              className={`input-box focus:outline-none focus:border-blue-500 ${
                error ? "error" : true
              }`}
            />
          </div>

          <div className="w-full">
            <label className="input-name" htmlFor="newpassword">
              New Password
            </label>
            <div className="relative">
              <PasswordField
                setpassword={setnewPassword}
                setError={setError}
                setErrorMessage={setErrorMessage}
                error={error}
              />
            </div>
          </div>

          <div className="w-full">
            <label className="input-name" htmlFor="confirmpassword">
              Confirm Password
            </label>
            <div className="relative">
              <PasswordField
                setpassword={setconfirmPassword}
                setError={setError}
                setErrorMessage={setErrorMessage}
                error={error}
              />
            </div>
          </div>

          <div className="flex items-center gap-3 w-full">
            <input
              className="terms-policy"
              type="checkbox"
              id="checkbox"
              name="checkbox"
              required={true}
              onChange={() => {
                setChecked((prev) => !prev);
              }}
            />
            <p className="text-sm font-semibold text-gray-400 -mt-1 cursor-pointer">
              Agree our{" "}
              <span className="text-[#1075B8]">
                <Link href="/termscondition">terms and conditions</Link>
              </span>
            </p>
          </div>
        </div>

        <div className="w-full text-center mt-7 mb-3 ">
          <button onClick={submitHandler} className="btn py-2">
            Register
          </button>
        </div>
        {showModal && (
          <ErrorModel errorMessage={errorMessage} onClose={closeModal} />
        )}
        <p className="text-red-400">{errorMessage}</p>
      </form>
    </>
  );
};

export default RegisterBox;
