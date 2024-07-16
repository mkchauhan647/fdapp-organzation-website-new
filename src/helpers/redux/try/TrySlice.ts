import { createSlice } from "@reduxjs/toolkit";
import {
   GetAllProducts
} from "./_thunks";

const initialState: any = {
  all_products_data: {
    isPending: false,
    isFulfilled: false,
    isRejected: false,
    fulfilledResponse: null,
    errorResponse: null
  }
};

export const ProductsSlice = createSlice({
  name: 'voting-app/ProductsSlice',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      // Get all products
      .addCase(GetAllProducts.pending, (state) => {
        state.all_products_data = {
          ...state.all_products_data,
          isPending: true,
          isFulfilled: false,
          isRejected: false
        };
      })
      .addCase(GetAllProducts.fulfilled, (state, action) => {
        state.all_products_data = {
          ...state.all_products_data,
          isPending: false,
          isFulfilled: true,
          fulfilledResponse: action.payload
        };
      })
      .addCase(GetAllProducts.rejected, (state, action) => {
        state.all_products_data = {
          ...state.all_products_data,
          isPending: false,
          isRejected: true,
          errorResponse: action.payload
        };
      });
  },
});
