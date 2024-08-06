const SuccessPage = ({responseData}:any) => {

  return (

    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Your Transaction</h1>
        {responseData ? (
          <div>
            <h3>Transaction Success!</h3>
            <p className="mb-4">
              <strong>Gateway Transaction ID:</strong> {responseData.GatewayTransactionld}
            </p>
            <p className="mb-4">
              <strong>Transaction ID:</strong> {responseData.Transactionld}
            </p>
            <p className="mb-4">
              <strong>Amount:</strong> {responseData.Amount}
            </p>
            <p className="mb-4">
              <strong>Bank Name:</strong> {responseData.BankName}
            </p>
            <p className="mb-4">
              <strong>Payment Type:</strong> {responseData.PaymentType}
            </p>
            <p className="mb-4">
              <strong>Status:</strong> {responseData.Status}
            </p>
            <p className="mb-4">
              <strong>Service Charge:</strong> {responseData.ServiceCharge}
            </p>
            <p className="mb-4">
              <strong>Transaction Remarks:</strong> {responseData.TransactionRemarks}
            </p>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default SuccessPage;