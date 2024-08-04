import React from "react";
import { useFormik } from "formik";
import { object, string } from "yup";
import { useRouter } from "next/navigation";
import Coupan from "./Coupan";
import Link from "next/link";

interface CoupanInputsProps {
  coupon: any;
  candidateId: string;
  campaignID: string;
}

const CoupanInputs: React.FC<CoupanInputsProps> = ({
  coupon,
  candidateId,
  campaignID,
}) => {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
    },
    validationSchema: object({
      //   numberOfVotes: Yup.number()
      //     .required("Number of votes is required")
      //     .min(1, "Number of votes must be at least 1"),
      fullName: string()
        .required("Full name is required")
        .min(2, "Full name must be at least 2 characters"),
      email: string()
        .email("Invalid email address")
        .required("Email address is required"),
    }),
    onSubmit: (values) => {
      const queryParams = new URLSearchParams({
        fullName: values.fullName,
        email: values.email,
        couponPrice: coupon.pricing,
        couponName: coupon.votes,
        candidateId: candidateId,
        campaignID: campaignID,
      }).toString();

      router.push(`/coupons/verifyPage?${queryParams}`);

      console.log("Form values:", values);
      alert("Form submission" + campaignID);
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit} className="py-6">
        {/* <div className="mb-4">
          <label className="block opacity-100 mb-2">Enter number of votes</label>
          <input
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter number of votes"
            type="number"
            name="numberOfVotes"
            value={formik.values.numberOfVotes}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.numberOfVotes && formik.errors.numberOfVotes ? (
            <div className="text-red-500 text-sm">{formik.errors.numberOfVotes}</div>
          ) : null}
        </div> */}
        {coupon ? (
          <div className="mb-4">
            <label className="block mb-2">Amount to pay:</label>
            <div className="text-gray-500 py-2 text-2xl font-extrabold">
              {coupon.pricing} NPR
            </div>
          </div>
        ) : null}
        <div className="mb-4">
          <label className="block opacity-100 mb-2">Enter your full name</label>
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
            <div className="text-red-500 text-sm mt-2">
              {formik.errors.fullName}
            </div>
          ) : null}
        </div>
        <div className="mb-4">
          <label className="block opacity-100 mb-2">
            Enter your email address
          </label>
          <input
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter your email address"
            type="text"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            autoComplete="off"
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="text-red-500 text-sm mt-2">
              {formik.errors.email}
            </div>
          ) : null}
        </div>
        <div className="">
          <button
            type="submit"
            className="bg-blue-500 flex-shrink text-white py-2 px-4 rounded"
          >
            Submit
          </button>
            <span className=" ml-4">Or</span>
            <Link href={"/login"} className="px-6 py-3 text-lg underline ">
              Continue with Login
          </Link>
        </div>
        <input type="hidden" name="csrt" value="4839605274748214208" />
      </form>
    </div>
  );
};

export default CoupanInputs;
