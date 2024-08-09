"use client";

import { dataService } from "@/utils/data/api/dataServices";
import { GetClientSecretInterface } from "@/utils/schema/ApiInterface";

import crypto from "crypto";
import { useState } from "react";

export default function NepalPaymentModal({
  couponTransactionData,
}: {
  couponTransactionData: GetClientSecretInterface;
}) {
  const [loading, setLoading] = useState<Boolean>(false);

  const generateRandomHex = (num: number = 8): string => {
    return crypto.randomBytes(num).toString("hex");
  };

  const createPendingCouponTransaction = async () => {
    // couponTransactionData.instrumentCode = instrumentCode;
    couponTransactionData.idempotentKey = generateRandomHex();
    try {
      setLoading(true);
      const response = await dataService.postData(
        "/coupon-transaction/guest-user",
        couponTransactionData
      );

      if (response) {
        // Parse the HTML response to extract form fields
        const formHTML = response;
        const parser = new DOMParser();
        const doc = parser.parseFromString(formHTML, "text/html");
        const form = doc.querySelector("form");

        if (form) {
          // form element and submitng it
          const formElement = document.createElement("form");
          formElement.method = "post";
          formElement.action = form.action;
          formElement.id = "paymentForm";
          formElement.style.display = "none";

          // Appending form inputs to the form element
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
      }
    } catch (err) {
      console.log("Error creating transaction:", err);

    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={createPendingCouponTransaction}
        className="px-4 py-2 bg-[var(--btncolor)] text-white rounded-lg font-[700]"
      >
        {
          loading? "Redirecting to Payment ..." : "Nepal Buy Now"
        }
      </button>
    </>
  );
}
