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
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { useEffect, useState } from "react";
import { GetClientSecretInterface } from "@/utils/schema/ApiInterface";
import StripeForm from "../components/stripeForm/stripeForm";
import { AuthSlice } from "../redux/Auth/AuthSlice";

const stripeInstance = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY as string
);

type intentResponse = {
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
  isNewReacord: boolean;
  uniqno: number;
};

export default function PaymentModal({
  couponTransactionData,
}: {
  couponTransactionData: GetClientSecretInterface;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { token, x_api_key } = useAppSelector((state: RootState) => state.Auth);
  const { current_coupon_transaction_data } = useAppSelector(
    (state: RootState) => state.Coupons
  );
  const [loading, setLoading] = useState(true);
  const [responseIntent, setIntentResponse] = useState<intentResponse | null>(
    null
  );

  const dispatch = useAppDispatch();

  async function getXApiKey() {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_VOTING_IDENTITY_URI}/x-api-key/${orgID}`
    );
    console.log(response?.data.data.token);
    return response?.data.data.token;
  }

  useEffect(() => {
    async function fetchIntent(): Promise<void> {
      try {
        if (!x_api_key) {
          const x_api = await getXApiKey();
          dataService.setApiKey(x_api);
        } else {
          dataService.setApiKey(x_api_key);
        }

        console.log("Heyss");
        console.log(couponTransactionData);
        const response = await dataService.postData(
          "/coupon-transaction",
          couponTransactionData,
          token
        );
        setIntentResponse(response.data);
        setLoading(false);
      } catch (error: any) {
        if (error) {
          // dispatch(AuthSlice.actions.logout())
          onClose();
        }
      }
    }
    fetchIntent();
  }, []);

  const handleOpen = () => {
    onOpen();
  };

  return (
    <>
      <button
        onClick={() => handleOpen()}
        className="px-4 py-2 bg-[var(--btncolor)] text-white rounded-lg font-[700]"
      >
        Buy Now
      </button>

      <Modal size="4xl" backdrop="blur" isOpen={isOpen} onClose={onClose}>
        <ModalContent className="bg-[var(--pagebg)] px-3 pb-6 min-h-[50vh]">
          {(onClose) => (
            <>
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
                  <section className="">
                    <div className="mx-auto">
                      {!loading && responseIntent && (
                        <Elements
                          options={{
                            clientSecret: responseIntent.clientSecret as string,
                            appearance: { theme: "stripe" },
                          }}
                          stripe={stripeInstance}
                        >
                          <StripeForm />
                        </Elements>
                      )}
                    </div>
                  </section>
                )}
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
