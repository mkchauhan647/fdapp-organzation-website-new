"use client";
import {
  Modal,
  ModalBody,
  ModalContent,
  useDisclosure,
} from "@nextui-org/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { GetClientSecretInterface } from "@/utils/schema/ApiInterface";
import { RootState, useAppSelector } from "../hooks/useStoreHooks";
import { dataService } from "@/utils/data/api/dataServices";
import crypto from "crypto";

// export const categorizeResponse = (data: any) => {
//   let keys: any = [];
//   if (Array.isArray(data) && data?.length > 0) {
//     data.map((current) => {
//       let key = current?.BankType;
//       if (!keys.includes(key)) {
//         keys.push(key);
//       }
//     });
//   }
//   return keys;
// };

export default function NepalPaymentModal({
  couponTransactionData,
}: {
  couponTransactionData: GetClientSecretInterface;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const [scrollBehavior, setScrollBehavior] = useState("inside");
  const [loading, setLoading] = useState(true);
  const [nepalPaymentWay, setNepalPaymentWay] = useState([]);
  const [content, setContent] = useState([]);
  const { token, x_api_key } = useAppSelector((state: RootState) => state.Auth);

  // const [instrumentId, setInstrumentId] = useState();
  const [nepalPayWay, setNepalPayWay] = useState(null);

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

  const handleOpen = () => {
    onOpen();
  };

  const generateRandomHex = (num: number = 8): string => {
    return crypto.randomBytes(num).toString("hex");
  };

  const createPendingCouponTransaction = async (instrumentCode: string) => {
    couponTransactionData.instrumentCode = instrumentCode;
    couponTransactionData.idempotentKey = generateRandomHex();
    try {
      const response = await dataService.postData(
        "/coupon-transaction",
        couponTransactionData,
        token
      );
      if (response) {
        console.log("this is data", response);
        document.open();
        document.write(response);
        document.close();
      }
    } catch (err) {
      console.log("errrs", err);
    }
  };

  const handleProcessId = async () => {
    if (loading) return;
    // try {
    //   setLoading(true);
    //   const { data } = await getProcessIdApi({
    //     Amount: `${totalAmount}`,
    //     MerchantTxnId: uniqueTxnID,
    //   });
    //   handleRedirection(data?.data?.ProcessId);
    // } catch (error) {
    //   setLoading(false);
    //   console.log('Something went wrong');
    // }
  };
  const contentValue: any = content;
  const handleBanks = (name: string) => {
    if (!Array.isArray(contentValue) && contentValue?.length > 0) {
      return <div>No Banks Found</div>;
    }

    if (content?.length > 0) {
      return (
        <div className="grid grid-cols-6 gap-3 px-2 mt-2 max-md:gap-2 md:grid-cols-5 max-md:grid-cols-3 sm:grid-cols-2">
          {content.map((item: any, index) => {
            return (
              <div
                key={index}
                onClick={() =>
                  createPendingCouponTransaction(item?.InstrumentCode)
                }
                className={`${
                  nepalPayWay === item?.InstitutionName
                    ? "border border-primary"
                    : "border border-indigo-100 "
                }  px-2 py-2 mb-2 w-full mx-auto rounded-xl flex flex-col justify-center items-center hover:cursor-pointer`}
              >
                <img
                  className="md:w-[60px] w-[50px]"
                  src={item?.LogoUrl}
                  alt={item?.InstitutionName}
                ></img>
                <p className="text-center whitespace-break-spaces">
                  {item?.InstitutionName}
                </p>
              </div>
            );
          })}
        </div>
      );
    } else {
      <div>No Banks Found </div>;
    }
  };

  useEffect(() => initNepalPayment(), []);
  return (
    <>
      <button
        onClick={() => handleOpen()}
        className="px-4 py-2 bg-[var(--btncolor)] text-white rounded-lg font-[700]"
      >
        Nepal Buy Now
      </button>

      <Modal
        size="full"
        backdrop="blur"
        isOpen={isOpen}
        onClose={onClose}
        // scrollBehavior={scrollBehavior}
      >
        <ModalContent className="bg-[var(--pagebg)] px-3 pb-6 min-h-[50vh]">
          <>
            <ModalBody className="flex items-center justify-center">
              <div className="px-5 capitalize">
                {Array.isArray(nepalPaymentWay) &&
                  nepalPaymentWay.length > 0 && (
                    <div
                      className="w-full"
                      onChange={() => {
                        setNepalPayWay(null);
                        // setInstrumentId(null);
                      }}
                    >
                      {nepalPaymentWay.map((payment, i) => (
                        <div key={i}>{handleBanks(payment)}</div>
                      ))}
                    </div>
                  )}
              </div>

              {nepalPayWay && (
                <div className="w-[90%] mx-auto">
                  <button
                    disabled={loading}
                    onClick={handleProcessId}
                    className="py-3 my-3 w-full text-xs font-medium text-white rounded bg-primary hover:bg-green-700"
                  >
                    Pay with {nepalPayWay}
                  </button>
                </div>
              )}
            </ModalBody>
          </>
        </ModalContent>
      </Modal>
    </>
  );
}
