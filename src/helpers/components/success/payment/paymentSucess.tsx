import { IoIosInformationCircle } from "react-icons/io";
import { TiTick } from "react-icons/ti";

interface Props {
  paymentDetails: {
    GatewayTransactionId: number;
    TransactionId: number;
    Amount: number;
    BankName: string;
    PaymentType: string;
    Status: string;
    ServiceCharge: number;
    TransactionRemarks: string;
  };
}

const SuccessPage = ({ paymentDetails }: Props) => {
  const paymentStatus =
    paymentDetails.Status === "pass" ? "bg-green-500" : "bg-red-700";
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-lg w-full">
        {paymentDetails ? (
          <div>
            <div className="flex items-center justify-center mb-3 flex-col gap-2">
              <div
                className={`${paymentStatus} w-full flex items-center justify-center p-4 mb-6 rounded-lg`}
              >
                {paymentDetails.Status === "pass" ? (
                  <div className=" flex items-center flex-col justify-center gap-2 text-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      x="0px"
                      y="0px"
                      width="100"
                      height="100"
                      viewBox="0 0 48 48"
                    >
                      <path
                        fill="#c8e6c9"
                        d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"
                      ></path>
                      <path
                        fill="#4caf50"
                        d="M34.586,14.586l-13.57,13.586l-5.602-5.586l-2.828,2.828l8.434,8.414l16.395-16.414L34.586,14.586z"
                      >
                        {" "}
                      </path>
                    </svg>
                    <p className="text-3xl font-semibold">Payment Success </p>
                    <p>You transaction Completed Sucessfully !!</p>
                  </div>
                ) : (
                  <div className=" flex flex-col items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      x="0px"
                      y="0px"
                      width="100"
                      height="100"
                      viewBox="0 0 48 48"
                    >
                      <linearGradient
                        id="wRKXFJsqHCxLE9yyOYHkza_fYgQxDaH069W_gr1"
                        x1="9.858"
                        x2="38.142"
                        y1="9.858"
                        y2="38.142"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop offset="0" stop-color="#f44f5a"></stop>
                        <stop offset=".443" stop-color="#ee3d4a"></stop>
                        <stop offset="1" stop-color="#e52030"></stop>
                      </linearGradient>
                      <path
                        fill="url(#wRKXFJsqHCxLE9yyOYHkza_fYgQxDaH069W_gr1)"
                        d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"
                      ></path>
                      <path
                        d="M33.192,28.95L28.243,24l4.95-4.95c0.781-0.781,0.781-2.047,0-2.828l-1.414-1.414	c-0.781-0.781-2.047-0.781-2.828,0L24,19.757l-4.95-4.95c-0.781-0.781-2.047-0.781-2.828,0l-1.414,1.414	c-0.781,0.781-0.781,2.047,0,2.828l4.95,4.95l-4.95,4.95c-0.781,0.781-0.781,2.047,0,2.828l1.414,1.414	c0.781,0.781,2.047,0.781,2.828,0l4.95-4.95l4.95,4.95c0.781,0.781,2.047,0.781,2.828,0l1.414-1.414	C33.973,30.997,33.973,29.731,33.192,28.95z"
                        opacity=".05"
                      ></path>
                      <path
                        d="M32.839,29.303L27.536,24l5.303-5.303c0.586-0.586,0.586-1.536,0-2.121l-1.414-1.414	c-0.586-0.586-1.536-0.586-2.121,0L24,20.464l-5.303-5.303c-0.586-0.586-1.536-0.586-2.121,0l-1.414,1.414	c-0.586,0.586-0.586,1.536,0,2.121L20.464,24l-5.303,5.303c-0.586,0.586-0.586,1.536,0,2.121l1.414,1.414	c0.586,0.586,1.536,0.586,2.121,0L24,27.536l5.303,5.303c0.586,0.586,1.536,0.586,2.121,0l1.414-1.414	C33.425,30.839,33.425,29.889,32.839,29.303z"
                        opacity=".07"
                      ></path>
                      <path
                        fill="#fff"
                        d="M31.071,15.515l1.414,1.414c0.391,0.391,0.391,1.024,0,1.414L18.343,32.485	c-0.391,0.391-1.024,0.391-1.414,0l-1.414-1.414c-0.391-0.391-0.391-1.024,0-1.414l14.142-14.142	C30.047,15.124,30.681,15.124,31.071,15.515z"
                      ></path>
                      <path
                        fill="#fff"
                        d="M32.485,31.071l-1.414,1.414c-0.391,0.391-1.024,0.391-1.414,0L15.515,18.343	c-0.391-0.391-0.391-1.024,0-1.414l1.414-1.414c0.391-0.391,1.024-0.391,1.414,0l14.142,14.142	C32.876,30.047,32.876,30.681,32.485,31.071z"
                      ></path>
                    </svg>
                    <p className="text-2xl font-semibold text-white">
                      Payment Fails{" "}
                    </p>
                  </div>
                )}
              </div>
            </div>
            <p className="mb-2">
              <strong>Gateway Transaction ID:</strong>{" "}
              {paymentDetails.GatewayTransactionId}
            </p>
            <p className="mb-2">
              <strong>Transaction ID:</strong> {paymentDetails.TransactionId}
            </p>
            <p className="mb-2">
              <strong>Amount:</strong> {paymentDetails.Amount}
            </p>
            <p className="mb-2">
              <strong>Bank Name:</strong> {paymentDetails.BankName}
            </p>
            <p className="mb-2">
              <strong>Payment Type:</strong> {paymentDetails.PaymentType}
            </p>
            <p className="mb-2">
              <strong>Status:</strong> {paymentDetails.Status}
            </p>
            <p className="mb-2">
              <strong>Service Charge:</strong> {paymentDetails.ServiceCharge}
            </p>
            <p className="mb-2">
              <strong>Transaction Remarks:</strong>{" "}
              {paymentDetails.TransactionRemarks}
            </p>
          </div>
        ) : (
          <p className="text-red-500">{"Processing payment result..."}</p>
        )}
      </div>
    </div>
  );
};

export default SuccessPage;
