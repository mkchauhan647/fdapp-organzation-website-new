import React, { useEffect } from "react";
import { useFormik } from "formik";
import { object, string } from "yup";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Coupon } from "@/utils/schema/ApiInterface";
import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from "../hooks/useStoreHooks";
import { dataService } from "@/utils/data/api/dataServices";
import { Button } from "antd";
import { addCouponToCart } from "../redux/coupons/CouponsSlice";
interface CoupanInputsProps {
  coupon: Coupon;
  candidateId: string;
  campaignID: string;
}

const CoupanInputs: React.FC<CoupanInputsProps> = ({
  coupon,
  candidateId,
  campaignID,
}) => {
  const router = useRouter();

  const { x_api_key, token, user } = useAppSelector(
    (state: RootState) => state.Auth
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dataService.setApiKey(x_api_key);
  }, [dispatch]);

  console.log(user);

  const formik = useFormik({
    initialValues: {
      fullName: user?.name || "",
      email: user?.email || "",
      coupan: coupon ? coupon?.votes.toString() : "",
    },
    validationSchema: object({
      fullName: string()
        .required("Full name is required")
        .min(2, "Full name must be at least 2 characters"),
      email: string()
        .email("Invalid email address")
        .required("Email address is required"),
      coupan: string().required("Coupon is required"),
    }),
    onSubmit: (values) => {
      const fullname = values.fullName
      const email = values.email
      // const queryParams = new URLSearchParams({
      //   fullName: values.fullName,
      //   email: values.email,
      //   candidateId,
      //   campaignID,
      //   coupon: encodeURIComponent(JSON.stringify(coupon)),
      // }).toString();
      dispatch(
        addCouponToCart({
          coupon: {
            ...coupon, fullname,  email
          },
          candidateId,
        })
      );

      router.push(`/coupons/verifyPage`);
    },
  });

  return (
    <div className="w-full">
      <form onSubmit={formik.handleSubmit} className="py-6 ">
        <div className="mb-4 w-full">
          <label className="block opacity-100 mb-2 text-base">
            Enter your full name
          </label>
          <input
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter your full name"
            type="text"
            name="fullName"
            value={formik.values.fullName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.fullName && formik.errors.fullName ? (
            <div className="text-red-500 text-base mt-2">
              <>{formik.errors.fullName}</>
            </div>
          ) : null}
        </div>
        <div className="mb-4">
          <label className="block opacity-100 mb-2 text-base">
            Enter your email address
          </label>
          <input
            className="w-full text-base p-2 border border-gray-300 rounded"
            placeholder="Enter your email address"
            type="text"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            autoComplete="off"
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="text-red-500 text-base mt-2">
              <>{formik.errors.email}</>
            </div>
          ) : null}
        </div>
        <div className=" flex">
          <button
            type="submit"
            className=" p-3 rounded-md  bg-[var(--c-l-primary)] text-white flex items-center justify-center w-auto font-medium "
            >
            Continue To Payment
          </button>
        </div>
        <input type="hidden" name="csrt" value="4839605274748214208" />
      </form>
    </div>
  );
};

export default CoupanInputs;
