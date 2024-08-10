"use client";

import { PaymentPage } from "@/helpers/dynamic-imports/components";
import { PublicLayout } from "@/helpers/dynamic-imports/views";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import errorImage from "../../../../public/image/payment/payment-error.png";
import { divider } from "@nextui-org/react";

const PaymentResultPage = () => {
  const searchParams = useSearchParams();
  const [merchantTxnId, setMerchantTxnId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const npsMerchantTxnId = searchParams.get("npsMerchantTxnId");
    if (!npsMerchantTxnId) {
      setErrorMessage("Transaction Not Found !!!");
    } else {
      setMerchantTxnId(npsMerchantTxnId);
    }
  }, [searchParams]);

  return (
    <PublicLayout>
      {merchantTxnId ? (
        <PaymentPage MerchantTxnId={merchantTxnId} />
      ) : (
        <div className="flex items-center justify-center flex-col gap-6">
          <Image
            className="object-contain"
            src={errorImage}
            alt="Payment Error"
            width={500}
            height={600}
          />
          <p className="text-3xl font-medium">{errorMessage}</p>
        </div>
      )}
    </PublicLayout>
  );
};

export default PaymentResultPage;
