"use client";
import { dataService } from "@/utils/data/api/dataServices";
import { GetClientSecretInterface } from "@/utils/schema/ApiInterface";
import {
  Modal,
  ModalBody,
  ModalContent,
  useDisclosure,
} from "@nextui-org/react";
import axios from "axios";
import crypto from "crypto";
import { useEffect, useState } from "react";
import { RootState, useAppSelector } from "../hooks/useStoreHooks";

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
  const [checkout_type, set_checkout_type] = useState("checkoutcard");
  const [updated_content, set_updated_content] = useState<any>(null);

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
        return item?.BankType == checkout_type;
      });
      set_updated_content(updated_res_data);
      console.log("This is res data", updated_res_data);
    } catch (e) {
      console.log("This is error", e);
    }
  };

  const handleOpen = () => {
    onOpen();
  };

  const generateRandomHex = (num: number = 8): string => {
    return crypto.randomBytes(num).toString("hex");
  };

  const createPendingCouponTransaction = async (instrumentCode: string) => {
    alert("Hello9 ");
    couponTransactionData.instrumentCode = instrumentCode;
    couponTransactionData.idempotentKey = generateRandomHex();
    console.log(couponTransactionData);
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
        <div className="">
          <div className="grid grid-cols-6 gap-3 px-2  mt-2 max-md:gap-2 md:grid-cols-5 max-md:grid-cols-3 sm:grid-cols-2">
            {updated_content &&
              updated_content?.map((item: any, index: any) => {
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
                    <p className="text-center whitespace-break-spaces ">
                      {item?.InstitutionName}
                    </p>
                  </div>
                );
              })}
          </div>
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

      <Modal size="full" backdrop="blur" isOpen={isOpen} onClose={onClose}>
        <div className="flex items-center justify-center">
          <ModalContent className=" px-3 pb-6 lg:h-[50vh] w-[90vh]  overflow-y-scroll ">
            <>
              <div className="flex items-center justify-center py-4 gap-8">
                <div
                  onClick={() => {
                    set_checkout_type("checkoutcard");
                  }}
                  className={`${
                    checkout_type == "checkoutcard" && "text-[#FF9F31]"
                  } hover:cursor-pointer`}
                >
                  Checkoutcard
                </div>
                <div
                  onClick={() => {
                    set_checkout_type("CheckoutGateway");
                  }}
                  className={`${
                    checkout_type == "CheckoutGateway" && "text-[#FF9F31]"
                  } hover:cursor-pointer`}
                >
                  CheckoutGateway
                </div>
                <div
                  onClick={() => {
                    set_checkout_type("EBanking");
                  }}
                  className={`${
                    checkout_type == "EBanking" && "text-[#FF9F31]"
                  } hover:cursor-pointer`}
                >
                  EBanking
                </div>
                <div
                  onClick={() => {
                    set_checkout_type("MBanking");
                  }}
                  className={`${
                    checkout_type == "MBanking" && "text-[#FF9F31]"
                  } hover:cursor-pointer`}
                >
                  MBanking
                </div>
              </div>
              <ModalBody className="">
                <div className="px-5 capitalize flex">
                  {Array.isArray(updated_content) &&
                    updated_content?.length > 0 && (
                      <div className="flex">
                        <div className="grid lg:grid-cols-5 grid-cols-3 gap-6">
                          {updated_content?.map((item, index) => {
                            return (
                              <div
                                key={index}
                                onClick={() =>
                                  createPendingCouponTransaction(
                                    item?.InstrumentCode
                                  )
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
                                <p className="text-center whitespace-break-spaces ">
                                  {item?.InstitutionName}
                                </p>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                </div>

                <div></div>

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
        </div>
      </Modal>
    </>
  );
}
