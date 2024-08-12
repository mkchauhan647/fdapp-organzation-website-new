"use client";

import { dataService } from "@/utils/data/api/dataServices";
import { GetClientSecretInterface } from "@/utils/schema/ApiInterface";
import {
  useAppDispatch,
  useAppSelector,
  RootState,
} from "@/helpers/hooks/useStoreHooks";
import crypto from "crypto";
import { useState } from "react";

interface AuthState {
  token: string | null;
  user: string;
  x_api_key: any;
}

export default function NepalPaymentModal({
  couponTransactionData,
}: {
  couponTransactionData: GetClientSecretInterface;
}) {
  const [loading, setLoading,] = useState<Boolean>(false);
  const { token, user , x_api_key}: AuthState = useAppSelector(
    (state: RootState) => state.Auth
  );

  const generateRandomHex = (num: number = 8): string => {
    return crypto.randomBytes(num).toString("hex");
  };

  const handleResponse = (formHTML: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(formHTML, "text/html");
    const form = doc.querySelector("form");

    if (form) {
      const formElement = document.createElement("form");
      formElement.method = "post";
      formElement.action = form.action;
      formElement.id = "paymentForm";
      formElement.style.display = "none";

      form.querySelectorAll("input").forEach((input) => {
        const clonedInput = document.createElement("input");
        clonedInput.type = input.type;
        clonedInput.name = input.name;
        clonedInput.value = input.value;
        formElement.appendChild(clonedInput);
      });

      document.body.appendChild(formElement);
      formElement.submit();
    }
  };

  const createPendingCouponTransaction = async () => {
    dataService.setApiKey(x_api_key);
    couponTransactionData.idempotentKey = generateRandomHex();
    setLoading(true);

    try {
      const endpoint = user ? "/coupon-transaction/" : "/coupon-transaction/guest-user";
      const response = await dataService.postData(endpoint, couponTransactionData);

      if (response) {
        handleResponse(response);
        localStorage.removeItem("selectedCoupon")
        localStorage.removeItem("candidateId")
      }
    } catch (err) {
      console.log("Error creating transaction:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={createPendingCouponTransaction}
      className="px-4 py-2 bg-[var(--btncolor)] text-white rounded-lg font-[700]"
    >
      {loading ? "Redirecting to Payment ..." : "Nepal Buy Now"}
    </button>
  );
}
