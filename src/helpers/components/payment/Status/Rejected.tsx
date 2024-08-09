import React from "react";

interface RejectedTransProps {
  error: string | null; 
}

const RejectedTrans: React.FC<RejectedTransProps> = ({ error }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-lg w-full">
        <div>Error: {error ? error : "An unknown error occurred"}</div>
      </div>
    </div>
  );
};

export default RejectedTrans;
