import { createSlice } from "@reduxjs/toolkit";
import {
  GetAllCandidates,
  GetCandidatesByID,
  GetCandidatesByVotingCamapign
}from "./_thunks"
import { expiryTime } from "@/utils/constants/constants";



const initialState : any =  {
  all_candidates_by_campaign_id_data : {
  },
  candidates_by_id_data : {
  },
  all_candidates_data : {
    expire : null
  },

  // non-api data
  expire : null,
  current_selected_candidate_data : {}
}

export const CandidatesSlice = createSlice({
  name:'voting-app/couponsSlice',
  initialState,
  reducers : {
    setCurrentSelectCandidate : (state , action) =>{
      state.current_selected_candidate_data =  action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      
    // Get candidates by voting campaign id
    // 
    .addCase(GetCandidatesByVotingCamapign.pending, (state) => {
      state.all_candidates_by_campaign_id_data.isPending = true;
      state.all_candidates_by_campaign_id_data.isFulfilled = false;
      state.all_candidates_by_campaign_id_data.isRejected = false;
    })

    .addCase(GetCandidatesByVotingCamapign.fulfilled, (state , action) => {
      state.all_candidates_by_campaign_id_data.isPending = false;
      state.all_candidates_by_campaign_id_data.isFulfilled = true;
      state.all_candidates_by_campaign_id_data.isRejected = false;

      //send response
      state.all_candidates_by_campaign_id_data.fulfilledResponse = action.payload
      

    })

    .addCase(GetCandidatesByVotingCamapign.rejected, (state , action) => {
      state.all_candidates_by_campaign_id_data.isPending = false;
      state.all_candidates_by_campaign_id_data.isFulfilled = false;
      state.all_candidates_by_campaign_id_data.isRejected = true;

      //send response
      state.all_candidates_by_campaign_id_data.errorResponse = action.payload;
      state.all_candidates_by_campaign_id_data.expire = null
    })


    // Get all candidates
    // 
    .addCase(GetAllCandidates.pending, (state) => {
      state.all_candidates_data.isPending = true;
      state.all_candidates_data.isFulfilled = false;
      state.all_candidates_data.isRejected = false;
    })

    .addCase(GetAllCandidates.fulfilled, (state , action) => {
      state.all_candidates_data.isPending = false;
      state.all_candidates_data.isFulfilled = true;
      state.all_candidates_data.isRejected = false;

      //send response
      state.all_candidates_data.fulfilledResponse = action.payload;
      const currentTime = new Date().getTime();
      state.all_candidates_data.expire = new Date(currentTime + expiryTime).toISOString();
      
    })

    .addCase(GetAllCandidates.rejected, (state , action) => {
      state.all_candidates_data.isPending = false;
      state.all_candidates_data.isFulfilled = false;
      state.all_candidates_data.isRejected = true;

      //send response
      state.all_candidates_data.errorResponse = action.payload;
      state.all_candidates_data.expire = null

    })


    // Get candidates by id
    // 
    .addCase(GetCandidatesByID.pending, (state) => {
      state.candidates_by_id_data.isPending = true;
      state.candidates_by_id_data.isFulfilled = false;
      state.candidates_by_id_data.isRejected = false;
    })

    .addCase(GetCandidatesByID.fulfilled, (state , action) => {
      state.candidates_by_id_data.isPending = false;
      state.candidates_by_id_data.isFulfilled = true;
      state.candidates_by_id_data.isRejected = false;

      //send response
      state.candidates_by_id_data.fulfilledResponse = action.payload;

    })

    .addCase(GetCandidatesByID.rejected, (state , action) => {
      state.candidates_by_id_data.isPending = false;
      state.candidates_by_id_data.isFulfilled = false;
      state.candidates_by_id_data.isRejected = true;

      //send response
      state.candidates_by_id_data.errorResponse = action.payload;
      state.candidates_by_id_data.expire = null;
    })
  },

  
})