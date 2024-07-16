import { createSlice } from "@reduxjs/toolkit";
import {
  GetAllFAQ
}from "./_thunks"



const initialState : any =  {
  all_faq_data : {},

  // non-api data
  current_selected_candidate_faq : {}
}

export const FAQSlice = createSlice({
  name:'voting-app/couponsSlice',
  initialState,
  reducers : {
    setCurrentSelectFAQ : (state , action) =>{
      state.current_selected_candidate_faq =  action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      
    


    // Get all candidates
    // 
    .addCase(GetAllFAQ.pending, (state) => {
      state.all_faq_data.isPending = true;
      state.all_faq_data.isFulfilled = false;
      state.all_faq_data.isRejected = false;
    })

    .addCase(GetAllFAQ.fulfilled, (state , action) => {
      state.all_faq_data.isPending = false;
      state.all_faq_data.isFulfilled = true;
      state.all_faq_data.isRejected = false;

      //send response
      state.all_faq_data.fulfilledResponse = action.payload;

    })

    .addCase(GetAllFAQ.rejected, (state , action) => {
      state.all_faq_data.isPending = false;
      state.all_faq_data.isFulfilled = false;
      state.all_faq_data.isRejected = true;

      //send response
      state.all_faq_data.errorResponse = action.payload;

    })
  },

  
})