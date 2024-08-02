import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

interface CoupanInputsProps {
  coupon: any;
  candidateId: string;
}

const CoupanInputs: React.FC<CoupanInputsProps> = ({ coupon, candidateId }) => {
  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
    },
    validationSchema: Yup.object({
    //   numberOfVotes: Yup.number()
    //     .required("Number of votes is required")
    //     .min(1, "Number of votes must be at least 1"),
      fullName: Yup.string()
        .required("Full name is required")
        .min(2, "Full name must be at least 2 characters"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email address is required"),
    }),
    onSubmit: (values) => {
      // Handle form submission
      console.log("Form values:", values);
      alert("Form submission" + JSON.stringify(values));
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
            <div className="text-red-500 text-sm mt-2">{formik.errors.fullName}</div>
          ) : null}
        </div>
        <div className="mb-4">
          <label className="block opacity-100 mb-2">Enter your email address</label>
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
            <div className="text-red-500 text-sm mt-2">{formik.errors.email}</div>
          ) : null}
        </div>
        <div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            Submit
          </button>
        </div>
        <input type="hidden" name="csrt" value="4839605274748214208" />
      </form>
    </div>
  );
};

export default CoupanInputs;
