"use client";

import { dataService } from "@/utils/data/api/dataServices";
import { GetClientSecretInterface } from "@/utils/schema/ApiInterface";
import { Modal, ModalBody, ModalContent, useDisclosure } from "@nextui-org/react";
import axios from "axios";
import crypto from "crypto";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";


interface PaymentSolution {
  InstrumentCode: string;
  InstitutionName: string;
  LogoUrl: string;
  BankType: string;
}

export default function NepalPaymentModal({
  couponTransactionData,
}: {
  couponTransactionData: GetClientSecretInterface;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [nepalPaymentWay, setNepalPaymentWay] = useState<PaymentSolution[]>([])
  const [content, setContent] = useState([]);
  const [checkout_type, set_checkout_type] = useState("checkoutcard");
  const [updated_content, set_updated_content] = useState<PaymentSolution[]>([]);
  const [nepalPayWay, setNepalPayWay] = useState<string | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<string | null>(null);


  const router = useRouter();

  const initNepalPayment = () => {
    axios
      .get("https://api.easyvotingapp.com/v1/payment-solutions/instruments")
      .then(async (response: any) => {
        if (response.data.success) {
          setNepalPaymentWay(response.data.data);
          setContent(response.data.data);
        }
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchPaymentWay();
  }, [checkout_type]);

  const fetchPaymentWay = async () => {
    try {
      const response = await axios.get(
        "https://api.easyvotingapp.com/v1/payment-solutions/instruments"
      );
      const resData = response?.data?.data;
      const updated_res_data = resData?.filter((item: any) => {
        return item?.BankType === checkout_type;
      });
      set_updated_content(updated_res_data);
    } catch (e) {
      console.log("Error fetching payment ways:", e);
    }
  };

  const generateRandomHex = (num: number = 8): string => {
    return crypto.randomBytes(num).toString("hex");
  };

  const createPendingCouponTransaction = async (instrumentCode: string) => {
    couponTransactionData.instrumentCode = instrumentCode;
    couponTransactionData.idempotentKey = generateRandomHex();
    try {
      const response = await dataService.postData(
        "/coupon-transaction/guest-user",
        couponTransactionData
      );

      if (response) {
        // Parse the HTML response to extract form fields
        const formHTML = response; // Assuming response is HTML content
        const parser = new DOMParser();
        const doc = parser.parseFromString(formHTML, 'text/html');
        const form = doc.querySelector('form');

        if (form) {
          // Create a form element and submit it
          const formElement = document.createElement('form');
          formElement.method = 'post';
          formElement.action = form.action;
          formElement.id = 'paymentForm';
          formElement.style.display = 'none';

          // Append form inputs to the form element
          form.querySelectorAll('input').forEach(input => {
            const clonedInput = document.createElement('input');
            clonedInput.type = input.type;
            clonedInput.name = input.name;
            clonedInput.value = input.value;
            formElement.appendChild(clonedInput);
          });

          document.body.appendChild(formElement);
          formElement.submit();
          
          // Poll the payment status after submitting
          pollPaymentStatus(couponTransactionData.idempotentKey, response.data.GatewayTxnId);
        }
      }
    } catch (err) {
      console.log("Error creating transaction:", err);
    }
  };

  const pollPaymentStatus = (merchantTxnId: string, gatewayTxnId: string) => {
    const interval = setInterval(async () => {
      try {
        const response = await axios.get(
          `https://api.easyvotingapp.com/v1/nps-response-uri?MerchantTxnld=${merchantTxnId}&GatewayTxnld=${gatewayTxnId}`
        );
        if (response.data.success) {
          // Payment was successful
          setPaymentStatus('success');
          clearInterval(interval);
          router.push(`/paymentSucess?response=${encodeURIComponent(JSON.stringify(response.data))}`);
        } else {
          // Payment still pending or failed
          console.log('Payment status:', response.data.status);
          alert("Payment Failed")
        }
      } catch (err) {
        console.log("Error fetching payment status:", err);
      }
    }, 5000); // Poll every 5 seconds
  };

  const handleBanks = (name: string) => {
    if (!Array.isArray(content) || content.length === 0) {
      return <div>No Banks Found</div>;
    }

    return (
      <div className="grid grid-cols-6 gap-3 px-2 mt-2 max-md:gap-2 md:grid-cols-5 max-md:grid-cols-3 sm:grid-cols-2">
        {updated_content &&
          updated_content.map((item: PaymentSolution, index: any) => (
            <div
              key={index}
              onClick={() =>
                createPendingCouponTransaction(item?.InstrumentCode)
              }
              className={`${
                nepalPayWay === item?.InstitutionName
                  ? "border border-primary"
                  : "border border-indigo-100"
              } px-2 py-2 mb-2 w-full mx-auto rounded-xl flex flex-col justify-center items-center hover:cursor-pointer`}
            >
              <img
                className="md:w-[60px] w-[50px]"
                src={item?.LogoUrl}
                alt={item?.InstitutionName}
              />
              <p className="text-center whitespace-break-spaces">
                {item?.InstitutionName}
              </p>
            </div>
          ))}
      </div>
    );
  };

  useEffect(() => initNepalPayment(), []);

  return (
    <>
      <button
        onClick={onOpen}
        className="px-4 py-2 bg-[var(--btncolor)] text-white rounded-lg font-[700]"
      >
        Nepal Buy Now
      </button>

      <Modal size="full" backdrop="blur" isOpen={isOpen} onClose={onClose}>
        <div className="flex items-center justify-center">
          <ModalContent className="px-3 pb-6 lg:h-[50vh] w-[90vh] overflow-y-scroll">
            <div className="flex items-center justify-center py-4 gap-8">
              <div
                onClick={() => set_checkout_type("checkoutcard")}
                className={`${
                  checkout_type === "checkoutcard" && "text-[#FF9F31]"
                } hover:cursor-pointer`}
              >
                Checkoutcard
              </div>
              <div
                onClick={() => set_checkout_type("CheckoutGateway")}
                className={`${
                  checkout_type === "CheckoutGateway" && "text-[#FF9F31]"
                } hover:cursor-pointer`}
              >
                CheckoutGateway
              </div>
              <div
                onClick={() => set_checkout_type("EBanking")}
                className={`${
                  checkout_type === "EBanking" && "text-[#FF9F31]"
                } hover:cursor-pointer`}
              >
                EBanking
              </div>
              <div
                onClick={() => set_checkout_type("MBanking")}
                className={`${
                  checkout_type === "MBanking" && "text-[#FF9F31]"
                } hover:cursor-pointer`}
              >
                MBanking
              </div>
            </div>
            <ModalBody>
              {Array.isArray(updated_content) &&
                updated_content.length > 0 &&
                handleBanks("This is banks")}
            </ModalBody>
          </ModalContent>
        </div>
      </Modal>
    </>
  );
}
