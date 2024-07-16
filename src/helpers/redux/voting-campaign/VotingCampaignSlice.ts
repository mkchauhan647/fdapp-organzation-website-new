import { createSlice } from "@reduxjs/toolkit";

import {
  GetAllCampaigns,
  GetCampaignByID,
  GetUpcommingCampaign
}from "./_thunks"

const initialState : any ={
  all_campaign_data : {
    expire : null
  },
  campaign_by_id : {},
  all_upcomming_campaign : {
    expire : null
  },

  // non-api data
  current_selected_voting_campaign : ''
}

export const VotingCampaignSlice = createSlice({
  name : 'voting-app/VotingCampaignSlice',
  initialState,
  reducers : {
    setCurrentVotingCamp : (state , action) =>{
      state.current_selected_campaign_stages = action.payload
    }
  },
  extraReducers : (builder) => {
    builder

    // Active campaign  data
    // 
    .addCase(GetAllCampaigns.pending, (state) => {
      state.all_campaign_data.isPending = true;
      state.all_campaign_data.isFulfilled = false;
      state.all_campaign_data.isRejected = false;
    })

    .addCase(GetAllCampaigns.fulfilled, (state , action) => {
      state.all_campaign_data.isPending = false;
      state.all_campaign_data.isFulfilled = true;
      state.all_campaign_data.isRejected = false;

      //send response
      state.all_campaign_data.fulfilledResponse = action.payload;

    })

    .addCase(GetAllCampaigns.rejected, (state , action) => {
      state.all_campaign_data.isPending = false;
      state.all_campaign_data.isFulfilled = false;
      state.all_campaign_data.isRejected = true;

      //send response
      state.all_campaign_data.errorResponse = action.payload;

    })


    // Get campaign by id
    // 
    .addCase(GetCampaignByID.pending, (state) => {
      state.campaign_by_id.isPending = true;
      state.campaign_by_id.isFulfilled = false;
      state.campaign_by_id.isRejected = false;
    })

    .addCase(GetCampaignByID.fulfilled, (state , action) => {
      state.campaign_by_id.isPending = false;
      state.campaign_by_id.isFulfilled = true;
      state.campaign_by_id.isRejected = false;

      //send response
      state.campaign_by_id.fulfilledResponse = action.payload;

    })

    .addCase(GetCampaignByID.rejected, (state , action) => {
      state.campaign_by_id.isPending = false;
      state.campaign_by_id.isFulfilled = false;
      state.campaign_by_id.isRejected = true;

      //send response
      state.campaign_by_id.errorResponse = action.payload;

    })

    
    // Get all upcomming campaign
    // 
    .addCase(GetUpcommingCampaign.pending, (state) => {
      state.all_upcomming_campaign.isPending = true;
      state.all_upcomming_campaign.isFulfilled = false;
      state.all_upcomming_campaign.isRejected = false;
    })

    .addCase(GetUpcommingCampaign.fulfilled, (state , action) => {
      state.all_upcomming_campaign.isPending = false;
      state.all_upcomming_campaign.isFulfilled = true;
      state.all_upcomming_campaign.isRejected = false;

      //send response
      state.all_upcomming_campaign.fulfilledResponse = action.payload;

    })

    .addCase(GetUpcommingCampaign.rejected, (state , action) => {
      state.all_upcomming_campaign.isPending = false;
      state.all_upcomming_campaign.isFulfilled = false;
      state.all_upcomming_campaign.isRejected = true;

      //send response
      state.all_upcomming_campaign.errorResponse = action.payload;

    })
  },
})