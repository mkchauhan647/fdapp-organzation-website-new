import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GetTransactionDetails } from "./_thunks";

// Define the initial state
interface PaymentStatusState {
  status: {
    isPending: boolean;
    isFulfilled: boolean;
    isRejected: boolean;
  };
  data: any | null;
  error: string | null;
  current_Trans: any;
}

const initialState: PaymentStatusState = {
  status: {
    isPending: false,
    isFulfilled: false,
    isRejected: false,
  },
  data: null,
  error: null,
  current_Trans: {},
};

// Create the slice
export const paymentStatusSlice:any = createSlice({
  name: "paymentStatus",
  initialState,
  reducers: {
    setCurrentTrans: (state, action: PayloadAction<any>) => {
      state.current_Trans = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(GetTransactionDetails.pending, (state) => {
        state.status.isPending = true;
        state.status.isFulfilled = false;
        state.status.isRejected = false;
      })
      .addCase(GetTransactionDetails.fulfilled, (state, action: PayloadAction<any>) => {
        state.status.isPending = false;
        state.status.isFulfilled = true;
        state.status.isRejected = false;
        state.data = action.payload; // Set the fetched data
        state.error = null;
      })
      .addCase(GetTransactionDetails.rejected, (state, action: PayloadAction<any>) => {
        state.status.isPending = false;
        state.status.isFulfilled = false;
        state.status.isRejected = true;
        state.error = action.payload; // Set the error message
      });
  },
});

