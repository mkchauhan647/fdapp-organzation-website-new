import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GetAllSponsers } from './_thunk';

interface SponserState {
  all_sponsers_data: {
    isPending: boolean;
    isFulfilled: boolean;
    isRejected: boolean;
    data: any[]; // Adjust according to your data type
    fulfilledResponse: any | null;
    errorResponse: any | null;
  };
  current_selected_sponser_data: any;
}

const initialState: any = {
  all_sponsers_data: {
    isPending: false,
    isFulfilled: false,
    isRejected: false,
    data: [],
    fulfilledResponse: null,
    errorResponse: null,
  },
  current_selected_sponser_data: {},
};

export const sponsersSlice = createSlice({
  name: 'sponsers',
  initialState,
  reducers: {
    setCurrentSelectSponser: (state, action: PayloadAction<any>) => {
      state.current_selected_sponser_data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(GetAllSponsers.pending, (state) => {
        state.all_sponsers_data.isPending = true;
        state.all_sponsers_data.isFulfilled = false;
        state.all_sponsers_data.isRejected = false;
      })
      .addCase(GetAllSponsers.fulfilled, (state, action: PayloadAction<any[]>) => {
        state.all_sponsers_data.isPending = false;
        state.all_sponsers_data.isFulfilled = true;
        state.all_sponsers_data.isRejected = false;
        state.all_sponsers_data.fulfilledResponse = action.payload;
        state.all_sponsers_data.data = action.payload;
      })
      .addCase(GetAllSponsers.rejected, (state, action: PayloadAction<any>) => {
        state.all_sponsers_data.isPending = false;
        state.all_sponsers_data.isFulfilled = false;
        state.all_sponsers_data.isRejected = true;
        state.all_sponsers_data.errorResponse = action.payload;
      });
  },
});


