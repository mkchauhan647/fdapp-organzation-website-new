"use client";

import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from "@/helpers/hooks/useStoreHooks";
import { orgID } from "@/utils/constants/constants";
import { dataService } from "@/utils/data/api/dataServices";
import {
  Modal,
  ModalBody,
  ModalContent,
  useDisclosure,
} from "@nextui-org/react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { useEffect, useState } from "react";
import { GetClientSecretInterface } from "@/utils/schema/ApiInterface";
import StripeForm from "../components/stripeForm/stripeForm";

const stripeInstance = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY as string
);

interface IntentResponse {
  clientSecret: string;
  dataValues: {
    amount: string;
    couponId: string;
    currency: string;
    id: string;
    inserted: string;
    organizationID: string;
    paymentService: "ESEWA" | "STRIPE";
    status: string;
    transactionId: null;
    updated: string;
    votingCampaignStageId: string;
  };
  isNewRecord: boolean;
  uniqno: number;
}

export default function PaymentModal({
  couponTransactionData,
}: {
  couponTransactionData: GetClientSecretInterface;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { token, user, x_api_key } = useAppSelector(
    (state: RootState) => state.Auth
  );
  const { current_coupon_transaction_data } = useAppSelector(
    (state: RootState) => state.Coupons
  );
  const [loading, setLoading] = useState(true);
  const [intentResponse, setIntentResponse] = useState<IntentResponse | null>(
    null
  );

  const dispatch = useAppDispatch();

  const getXApiKey = async (): Promise<string> => {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_VOTING_IDENTITY_URI}/x-api-key/${orgID}`
    );
    return response?.data.data.token;
  };

  const newCouponTransaction = {...couponTransactionData};
  delete newCouponTransaction.email;

  useEffect(() => {
    const fetchIntent = async (): Promise<void> => {
      try {
        const apiKey = x_api_key || (await getXApiKey());
        dataService.setApiKey(apiKey);

        const endpoint = user
          ? "/coupon-transaction/"
          : "/coupon-transaction/guest-user";

        const response = await dataService.postData(
          endpoint,
          newCouponTransaction,
          user ? token : undefined
        );

        setIntentResponse(response.data);
      } catch (error) {
        // Handle error appropriately
      } finally {
        setLoading(false);
      }
    };

    fetchIntent();
  }, [newCouponTransaction, user, token, x_api_key]);

  const handleOpen = () => {
    onOpen();
  };

  return (
    <>
      <button
        onClick={handleOpen}
        className="px-4 py-2 bg-[var(--c-l-primary)] text-white rounded-lg font-bold"
      >
        Buy Now
      </button>

      <Modal size="4xl" backdrop="blur" isOpen={isOpen} onClose={onClose}>
        <ModalContent className="bg-[var(--pagebg)] px-3 pb-6 min-h-[50vh]">
          <ModalBody className="flex items-center justify-center">
            {loading ? (
              <div className="max-w-xl mx-auto">
                <div className="spinner-box mx-auto">
                  <div className="pulse-container">
                    <div className="pulse-bubble pulse-bubble-1"></div>
                    <div className="pulse-bubble pulse-bubble-2"></div>
                    <div className="pulse-bubble pulse-bubble-3"></div>
                  </div>
                </div>
              </div>
            ) : (
              intentResponse && (
                <Elements
                  options={{
                    clientSecret: intentResponse.clientSecret,
                    appearance: { theme: "stripe" },
                  }}
                  stripe={stripeInstance}
                >
                  <StripeForm />
                </Elements>
              )
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
