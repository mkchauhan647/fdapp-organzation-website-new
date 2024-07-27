import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalBody,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import {
  ESEWA_SCD,
  ESEWA_TEST_PID,
  ESEWA_URL,
} from "@/utils/constants/constants";
import { Payment } from "@/utils/methods/payment";
import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from "../hooks/useStoreHooks";
import {
  Coupon,
  Distribution,
  GetClientSecretInterface,
} from "@/utils/schema/ApiInterface";
import { generateRandomHex } from "@/utils/methods/common";
import { useRouter, useSearchParams } from "next/navigation";
import { CouponsSlice } from "../redux/coupons/CouponsSlice";
import PaymentModal from "./stripePaymentModal";
import NepalPaymentModal from "./NepalPaymentModel";

interface ParamsType {
  [key: string]: string | number;
}

export default function Confirm({
  isDisabled,
  paymentMethod,
  votesPerCandidate,
  coupon,
}: {
  isDisabled?: boolean;
  paymentMethod: "ESEWA" | "STRIPE" | "NPS";
  votesPerCandidate: { [candidateId: string]: number };
  coupon: Coupon;
}) {
  const { x_api_key, token } = useAppSelector((state: RootState) => state.Auth); // Access state.Candidates
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const router = useRouter();
  const randomHex = generateRandomHex();

  const distribution = Object.entries(votesPerCandidate).map(
    ([candidateId, votes]) => ({
      candidateId,
      votes,
    })
  );
  const CouponTransactionData: GetClientSecretInterface = {
    couponId: coupon.id,
    idempotentKey: randomHex,
    paymentService: paymentMethod,
    votingCampaignStageId: searchParams.get("id")!,
    distribution,
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [params, setParams] = useState<ParamsType>({
    amt: 10,
    psc: 0,
    pdc: 0,
    txAmt: 0,
    tAmt: 10,
    pid: ESEWA_TEST_PID,
    scd: ESEWA_SCD,
    su: "http://localhost:3000/success",
    fu: "http://localhost:3000/error",
  });

  const handleOpen = () => {
    !isDisabled && onOpen();
  };

  function handleSubmit(e: any) {
    dispatch(CouponsSlice.actions.addCoupnTransaction(CouponTransactionData));
    e.preventDefault();
    if (paymentMethod === "ESEWA") {
      Payment.Esewa(params);
    }
  }

  return (
    <>
      <button
        onClick={handleOpen}
        className={`py-2 px-6 bg-[var(--btncolor)] text-white rounded-lg font-[500] openpayment ${
          isDisabled ? "disable" : true
        }`}
        disabled={isDisabled}
      >
        Buy
      </button>

      <Modal size="full" backdrop="blur" isOpen={isOpen} onClose={onClose}>
        <ModalContent className="px-5 py-5">
          <ModalBody className="flex items-center justify-center">
            <div className="w-[100%] md:w-[60%] mx-auto text-center">
              <h3 className="text-xl md:text-3xl font-[500] text-[var(--blue)] font-secular">
                Are you sure you want to buy?
              </h3>
              <p className="w-[100%] md:w-[40%] mx-auto font-[500] text-[var(--black)]">
                Clicking Confirm will send a purchase request from your account.
              </p>
              <div className="flex gap-5 text-center justify-center mt-5">
                {paymentMethod === "STRIPE" ? (
                  <PaymentModal couponTransactionData={CouponTransactionData} />
                ) : paymentMethod === "NPS" ? (
                  <NepalPaymentModal
                    couponTransactionData={CouponTransactionData}
                  />
                ) : (
                  <button
                    className="px-4 py-2 bg-[var(--btncolor)] text-white rounded-lg font-[700]"
                    onClick={handleSubmit}
                  >
                    Confirm
                  </button>
                )}

                {/* {paymentMethod === "STRIPE" ? (
                  <PaymentModal couponTransactionData={CouponTransactionData} />
                ) : (
                  <button
                    className="px-4 py-2 bg-[var(--btncolor)] text-white rounded-lg font-[700]"
                    onClick={handleSubmit}
                  >
                    Confirm abc
                  </button>
                )}
                {paymentMethod === "NPS" ? (
                  <NepalPaymentModal
                    couponTransactionData={CouponTransactionData}
                  />
                ) : (
                  <button
                    className="px-4 py-2 bg-[var(--btncolor)] text-white rounded-lg font-[700]"
                    onClick={handleSubmit}
                  >
                    Confirm
                  </button>
                )} */}
                <button
                  className="px-4 py-2 bg-[#DF383033] text-[#DF3830] rounded-lg font-[700]"
                  onClick={onClose}
                >
                  Cancel
                </button>
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
