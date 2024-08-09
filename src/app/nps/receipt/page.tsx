"use client";

import { PaymentPage } from "@/helpers/dynamic-imports/components";
import { PublicLayout } from "@/helpers/dynamic-imports/views";
import Image from "next/image";
import { useSearchParams } from "next/navigation"; // useSearchParams for the app directory
import { useEffect, useState } from "react";
import errorImage from "../../../../public/image/payment/payment-error.png";

const PaymentResultPage = () => {
  const searchParams = useSearchParams();
  const [MerchantTxnId, setMerchantTxnId] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const npsMerchantTxnId = searchParams.get("npsMerchantTxnId");
    if (!npsMerchantTxnId) {
      setErrorMessage("Transaction Not Found !!!");
      return;
    }
    setMerchantTxnId(npsMerchantTxnId);
  }, [searchParams]);


  return (
    <PublicLayout>
      {MerchantTxnId ? (
        <PaymentPage MerchantTxnId={MerchantTxnId} />
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
