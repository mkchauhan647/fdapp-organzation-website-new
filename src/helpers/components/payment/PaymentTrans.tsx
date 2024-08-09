import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from "@/helpers/hooks/useStoreHooks";
import { useEffect, useState } from "react";
import { dataService } from "@/utils/data/api/dataServices";
import { GetTransactionDetails } from "@/helpers/redux/PaymentStatusCheck/_thunks";
import { Transactions } from "@/helpers/dynamic-imports/ui";
import PendingTrans from "./Status/Pending";
import RejectedTrans from "./Status/Rejected";
import { Error } from "@/helpers/dynamic-imports/components";
interface Props {
  MerchantTxnId: string;
}

const PaymentPage = ({ MerchantTxnId }: Props) => {
  const [TransactionDetails, setTransactionDetails] = useState();
  const { x_api_key } = useAppSelector((state: RootState) => state.Auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dataService.setApiKey(x_api_key);
    dispatch(GetTransactionDetails(MerchantTxnId));
  }, []);

  const { status, data, error } = useAppSelector(
    (state: RootState) => state.paymentStatus
  );

  if (status.isPending) return <PendingTrans/>
  if (status.isFulfilled) {
    const trans = data;
    setTransactionDetails(trans);
  }

  if (status.isRejected) return <Error/>;

  return (

    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-lg w-full">
        {TransactionDetails ? (
          <Transactions paymentDetails={TransactionDetails} />
        ) : (
          <p className="text-red-500">{"Transaction Details Not Found"}</p>
        )}
    
      </div>
    </div>
  );
};

export default PaymentPage;
