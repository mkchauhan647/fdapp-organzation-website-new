"use client";
import { setPaymentData, setPaymentStatus } from "@/helpers/redux/PaymentStatusCheck/paymentSlice";
import { PaymentIntent, StripeError } from '@stripe/stripe-js'

import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
interface PaymentResult {
  error: StripeError | null;
  paymentIntent: PaymentIntent | null;
}
function StripeForm() {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [Error, setError] = useState("");
  const dispatch = useDispatch();
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    
    setLoading(true);
    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "https://user.fdapp.co.uk/success",
      },
    });
  
    console.log(result)
    if (result.error) {
      console.log(result.error.message);
      setLoading(false);
      setError(result?.error?.message || "");
      // router.push('/error') // Handle error appropriately
    } else {
       // Access paymentIntent only if no error
    
        dispatch(setPaymentStatus("success")); // Update payment status
        dispatch(setPaymentData(result));
        router.push('/success'); // Redirect to success page
      
    }
  };

  return (
    <form id="stripe-payment-form" onSubmit={handleSubmit}>
      <p className="text-red-700 mb-5">
        {Error && <span> Error: {Error}</span>}
      </p>
    
      <PaymentElement />
      <div className="w-1/3">
        <button
          className="bg-[var(--c-primary)] text-white rounded mt-4 py-2 px-4 w-fit"
          disabled={!stripe}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </div>
    </form>
  );
}

export default StripeForm;
