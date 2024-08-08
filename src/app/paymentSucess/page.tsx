"use client";

import { PaymentSuccessPage } from "@/helpers/dynamic-imports/components";
import { PublicLayout } from "@/helpers/dynamic-imports/views";
import Image from "next/image";
import { useSearchParams } from "next/navigation"; // useSearchParams for the app directory
import { useEffect, useState } from "react";
import errorImage from "../../../public/image/payment/payment-error.png";

const PaymentResultPage = () => {
  const searchParams = useSearchParams();
  const [paymentDetails, setPaymentDetails] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const GatewayTransactionId = searchParams.get("GatewayTransactionId");
    const TransactionId = searchParams.get("TransactionId");
    const Amount = searchParams.get("Amount");
    const BankName = searchParams.get("BankName");
    const PaymentType = searchParams.get("PaymentType");
    const Status = searchParams.get("Status");
    const ServiceCharge = searchParams.get("ServiceCharge");
    const TransactionRemarks = searchParams.get("TransactionRemarks");

    if (!GatewayTransactionId || !TransactionId) {
      setErrorMessage("Transaction Not Found !!!");
      return;
    }

    setPaymentDetails({
      GatewayTransactionId,
      TransactionId,
      Amount,
      BankName,
      PaymentType,
      Status,
      ServiceCharge,
      TransactionRemarks,
    });
  }, [searchParams]);

  return (
    <PublicLayout>
      {paymentDetails ? (
        <PaymentSuccessPage paymentDetails={paymentDetails} />
      ) : (
        <div className=" flex items-center justify-center flex-col gap-6">
          <Image
            className=" object-contain"
            src={errorImage}
            alt="Payment Error"
            width={500}
            height={600}
          />
          <p className=" text-3xl font-medium">{errorMessage} </p>
        </div>
      )}
    </PublicLayout>
  );
};

export default PaymentResultPage;
