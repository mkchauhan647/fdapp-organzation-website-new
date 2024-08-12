import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GetCouponsByID, GetCouponsByVotingCampaignID } from "./_thunks";

const initialState: any = {
  all_coupons_by_campaign_id_data: {},
  coupons_by_id_data: {},
  selectedCoupon: JSON.parse(localStorage.getItem("selectedCoupon") || "null") || null,
  candidateId: localStorage.getItem("candidateId") || null,

  // non-api
  current_coupon_transaction_data: null,
};

export const CouponsSlice = createSlice({
  name: "voting-app/couponsSlice",
  initialState,
  reducers: {
    addCoupnTransaction: (state, action) => {
      if (action.payload) {
        state.current_coupon_transaction_data = action.payload;
      }
    },
    removeCouponTransaction: (state) => {
      state.current_coupon_transaction_data = null;

      localStorage.removeItem("selectedCoupon");
      localStorage.removeItem("candidateId");
    },

    // storeCouponTolocale: (
    //   state,
    //   action: PayloadAction<{ coupon: any; candidateId: string }>
    // ) => {
    //   state.selectedCoupon = action.payload.coupon;
    //   state.candidateId = action.payload.candidateId;

    //    // Save to localStorage
    //    localStorage.setItem(
    //     "selectedCoupon",
    //     JSON.stringify(state.selectedCoupon)
    //   );
    //   localStorage.setItem("candidateId", state.candidateId);
    // },

    addCouponToCart: (
      state,
      action: PayloadAction<{ coupon: any; candidateId: string }>
    ) => {
      state.selectedCoupon = action.payload.coupon;
      state.candidateId = action.payload.candidateId;

           // Save to localStorage
       localStorage.setItem(
        "selectedCoupon",
        JSON.stringify(state.selectedCoupon)
      );
      localStorage.setItem("candidateId", state.candidateId);
    },
  },
  extraReducers: (builder) => {
    builder

      // Get coupons by campaign id
      //
      .addCase(GetCouponsByVotingCampaignID.pending, (state) => {
        state.all_coupons_by_campaign_id_data.isPending = true;
        state.all_coupons_by_campaign_id_data.isFulfilled = false;
        state.all_coupons_by_campaign_id_data.isRejected = false;
      })

      .addCase(GetCouponsByVotingCampaignID.fulfilled, (state, action) => {
        state.all_coupons_by_campaign_id_data.isPending = false;
        state.all_coupons_by_campaign_id_data.isFulfilled = true;
        state.all_coupons_by_campaign_id_data.isRejected = false;

        //send response
        state.all_coupons_by_campaign_id_data.fulfilledResponse =
          action.payload;
      })

      .addCase(GetCouponsByVotingCampaignID.rejected, (state, action) => {
        state.all_coupons_by_campaign_id_data.isPending = false;
        state.all_coupons_by_campaign_id_data.isFulfilled = false;
        state.all_coupons_by_campaign_id_data.isRejected = true;

        //send response
        state.all_coupons_by_campaign_id_data.errorResponse = action.payload;
      })

      // Get coupons by id
      //
      .addCase(GetCouponsByID.pending, (state) => {
        state.coupons_by_id_data.isPending = true;
        state.coupons_by_id_data.isFulfilled = false;
        state.coupons_by_id_data.isRejected = false;
      })

      .addCase(GetCouponsByID.fulfilled, (state, action) => {
        state.coupons_by_id_data.isPending = false;
        state.coupons_by_id_data.isFulfilled = true;
        state.coupons_by_id_data.isRejected = false;

        //send response
        state.coupons_by_id_data.fulfilledResponse = action.payload;
      })

      .addCase(GetCouponsByID.rejected, (state, action) => {
        state.coupons_by_id_data.isPending = false;
        state.coupons_by_id_data.isFulfilled = false;
        state.coupons_by_id_data.isRejected = true;

        //send response
        state.coupons_by_id_data.errorResponse = action.payload;
      });
  },
});

export const { addCouponToCart, addCoupnTransaction, removeCouponTransaction } =
  CouponsSlice.actions;
