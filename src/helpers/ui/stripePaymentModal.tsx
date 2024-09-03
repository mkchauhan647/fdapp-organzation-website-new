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
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setPaymentData, setPaymentStatus } from "../redux/PaymentStatusCheck/paymentSlice";

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
  const { token, user, x_api_key } = useAppSelector(
    (state: RootState) => state.Auth
  );
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [responseIntent, setIntentResponse] = useState<intentResponse | null>(
    null
  );

  async function getXApiKey() {
    console.log("ok");
    const response = await axios.get(
      ` ${process.env.NEXT_PUBLIC_VOTING_IDENTITY_URI}/x-api-key/${orgID}`
    );
    console.log(response?.data.data.token);
    return response?.data.data.token;
  }
  const newCouponTransaction = { ...couponTransactionData };
  delete newCouponTransaction.email;

  useEffect(() => {
    const fetchIntent = async (): Promise<void> => {
      try {
        console.log(await getXApiKey())
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

        dispatch(setPaymentStatus("success")); // Update payment status
        dispatch(setPaymentData(response.data));
      } catch (error:any) {
        console.log(error.message);
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchIntent();
  }, []);
  const handleOpen = () => {
    console.log("ok");
    onOpen();
  };

  return (
    <>
      <button
        onClick={() => handleOpen()}
        className="px-4 py-2  bg-[var(--c-l-primary)] text-white rounded-lg font-[700]"
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
