import { createSlice } from "@reduxjs/toolkit";
import {
  GetActiveCampaignStages,
  GetCampaignStagesByID,
  GetAllCampaignsStages,
  GetCandidatesByVotingStages,
  GetUpcommingCampaignStages,
  GetVotingStagesByVotingCampaignID
} from "./_thunks";

const initialState:any = {
  active_campaign_stages_data : {},
  campaign_stages_by_id_data : {},
  all_campaign_stages_Data : {},
  candidates_by_voting_stages_data :{},
  upcomming_campaign_stages_data : {},
  voting_stages_by_campaign_id_data : {},

  // non-api data
  current_selected_campaign_stages : ''
}

export const VotingCampaignStagesSlice = createSlice({
  name:"voting-app/VotingCampaignStagesSlice",
  initialState,
  reducers:{
    setCurrentVotingCampaignStages:(state , action) =>{
      state.current_selected_campaign_stages = action.payload
    }
  },
  extraReducers:(builder)=> {
    builder

    // Active campaign stages data
    // 
      .addCase(GetActiveCampaignStages.pending, (state) => {
        state.active_campaign_stages_data.isPending = true;
        state.active_campaign_stages_data.isFulfilled = false;
        state.active_campaign_stages_data.isRejected = false;
      })

      .addCase(GetActiveCampaignStages.fulfilled, (state , action) => {
        state.active_campaign_stages_data.isPending = false;
        state.active_campaign_stages_data.isFulfilled = true;
        state.active_campaign_stages_data.isRejected = false;

        //send response
        state.active_campaign_stages_data.fulfilledResponse = action.payload;

      })

      .addCase(GetActiveCampaignStages.rejected, (state , action) => {
        state.active_campaign_stages_data.isPending = false;
        state.active_campaign_stages_data.isFulfilled = false;
        state.active_campaign_stages_data.isRejected = true;

        //send response
        state.active_campaign_stages_data.errorResponse = action.payload;

      })



      // candidate stage by id
      // 
    .addCase(GetCampaignStagesByID.pending, (state) => {
      state.campaign_stages_by_id_data.isPending = true;
      state.campaign_stages_by_id_data.isFulfilled = false;
      state.campaign_stages_by_id_data.isRejected = false;
    })

    .addCase(GetCampaignStagesByID.fulfilled, (state , action) => {
      state.campaign_stages_by_id_data.isPending = false;
      state.campaign_stages_by_id_data.isFulfilled = true;
      state.campaign_stages_by_id_data.isRejected = false;

      //send response
      state.campaign_stages_by_id_data.fulfilledResponse = action.payload;

    })

    .addCase(GetCampaignStagesByID.rejected, (state , action) => {
      state.campaign_stages_by_id_data.isPending = false;
      state.campaign_stages_by_id_data.isFulfilled = false;
      state.campaign_stages_by_id_data.isRejected = true;

      //send response
      state.campaign_stages_by_id_data.errorResponse = action.payload;

    })


    // get all campaign
    // 
    .addCase(GetAllCampaignsStages.pending, (state) => {
      state.all_campaign_stages_Data.isPending = true;
      state.all_campaign_stages_Data.isFulfilled = false;
      state.all_campaign_stages_Data.isRejected = false;
    })

    .addCase(GetAllCampaignsStages.fulfilled, (state , action) => {
      state.all_campaign_stages_Data.isPending = false;
      state.all_campaign_stages_Data.isFulfilled = true;
      state.all_campaign_stages_Data.isRejected = false;

      //send response
      state.all_campaign_stages_Data.fulfilledResponse = action.payload;

    })

    .addCase(GetAllCampaignsStages.rejected, (state , action) => {
      state.all_campaign_stages_Data.isPending = false;
      state.all_campaign_stages_Data.isFulfilled = false;
      state.all_campaign_stages_Data.isRejected = true;

      //send response
      state.all_campaign_stages_Data.errorResponse = action.payload;

    })



    // get all candidates by voting stage
    // 
    .addCase(GetCandidatesByVotingStages.pending, (state) => {
      state.candidates_by_voting_stages_data.isPending = true;
      state.candidates_by_voting_stages_data.isFulfilled = false;
      state.candidates_by_voting_stages_data.isRejected = false;
    })

    .addCase(GetCandidatesByVotingStages.fulfilled, (state , action) => {
      state.candidates_by_voting_stages_data.isPending = false;
      state.candidates_by_voting_stages_data.isFulfilled = true;
      state.candidates_by_voting_stages_data.isRejected = false;

      //send response
      state.candidates_by_voting_stages_data.fulfilledResponse = action.payload;

    })

    .addCase(GetCandidatesByVotingStages.rejected, (state , action) => {
      state.candidates_by_voting_stages_data.isPending = false;
      state.candidates_by_voting_stages_data.isFulfilled = false;
      state.candidates_by_voting_stages_data.isRejected = true;

      //send response
      state.candidates_by_voting_stages_data.errorResponse = action.payload;

    })


    // get all upcomming stages data
    // 
    .addCase(GetUpcommingCampaignStages.pending, (state) => {
      state.upcomming_campaign_stages_data.isPending = true;
      state.upcomming_campaign_stages_data.isFulfilled = false;
      state.upcomming_campaign_stages_data.isRejected = false;
    })

    .addCase(GetUpcommingCampaignStages.fulfilled, (state , action) => {
      state.upcomming_campaign_stages_data.isPending = false;
      state.upcomming_campaign_stages_data.isFulfilled = true;
      state.upcomming_campaign_stages_data.isRejected = false;

      //send response
      state.upcomming_campaign_stages_data.fulfilledResponse = action.payload;

    })

    .addCase(GetUpcommingCampaignStages.rejected, (state , action) => {
      state.upcomming_campaign_stages_data.isPending = false;
      state.upcomming_campaign_stages_data.isFulfilled = false;
      state.upcomming_campaign_stages_data.isRejected = true;

      //send response
      state.upcomming_campaign_stages_data.errorResponse = action.payload;

    })


    // get all voting stages by campaign id
    // 
    .addCase(GetVotingStagesByVotingCampaignID.pending, (state) => {
      state.voting_stages_by_campaign_id_data.isPending = true;
      state.voting_stages_by_campaign_id_data.isFulfilled = false;
      state.voting_stages_by_campaign_id_data.isRejected = false;
    })

    .addCase(GetVotingStagesByVotingCampaignID.fulfilled, (state , action) => {
      state.voting_stages_by_campaign_id_data.isPending = false;
      state.voting_stages_by_campaign_id_data.isFulfilled = true;
      state.voting_stages_by_campaign_id_data.isRejected = false;

      //send response
      state.voting_stages_by_campaign_id_data.fulfilledResponse = action.payload;

    })

    .addCase(GetVotingStagesByVotingCampaignID.rejected, (state , action) => {
      state.voting_stages_by_campaign_id_data.isPending = false;
      state.voting_stages_by_campaign_id_data.isFulfilled = false;
      state.voting_stages_by_campaign_id_data.isRejected = true;

      //send response
      state.voting_stages_by_campaign_id_data.errorResponse = action.payload;

    });
  },
})

