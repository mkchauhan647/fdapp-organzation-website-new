import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GetTransactionDetails } from "./_thunks";

// Define the initial state
interface PaymentState {
    paymentStatus: string;
    paymentData: any; 
}

const initialState: PaymentState = {
    paymentStatus: "",
    paymentData: null
};

// Create the slice
export const paymentSlice:any = createSlice({
  name: "payment",
  initialState,

  reducers: {
    setPaymentStatus: (state, action: PayloadAction<string>) => {
      state.paymentStatus = action.payload;
    },
    setPaymentData: (state, action: PayloadAction<any>) => {
      state.paymentData = action.payload;
    },
  
  },
});

export const { setPaymentStatus, setPaymentData } = paymentSlice.actions;
