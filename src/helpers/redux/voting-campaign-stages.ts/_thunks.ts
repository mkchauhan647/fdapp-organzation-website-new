

import { dataService } from "@/utils/data/api/dataServices";
import { getReduxErrorMsg } from "@/utils/methods/reduxMethods";
import { createAsyncThunk } from "@reduxjs/toolkit";

/**
 * @Title
 * Get all homepage data
 *
 * @API
 * Process.env.NEXT_PUBLIC_VOTING_API
 *
 * @Description
 * App Data , includes campaignstages , upcomming stages , active stages , campaignstages by id ,
 * candidates by voting id , voting stages by voting campaign
 *
 **/

export const GetAllCampaignsStages = createAsyncThunk(
  'GetAllCampaignsStagesThunk',
  async(_,thunkAPI) => {
    try{
      return await dataService.getData("/voting-campaign-stages/")
    }catch(error:any){
      return thunkAPI.rejectWithValue(getReduxErrorMsg(error))
    }
  }
)

export const GetUpcommingCampaignStages = createAsyncThunk(
  'GetUpcommingCampaignStages',
  async(_,thunkAPI) => {
    try{
      return await dataService.getData("/voting-campaign-stages/upcomming")
    }catch(error:any){
      return thunkAPI.rejectWithValue(getReduxErrorMsg(error));
    }
  }
)

export const GetActiveCampaignStages = createAsyncThunk(
  'GetActiveCampaignStages',
  async(_,thunkAPI) => {
    try{
      return await dataService.getData("/voting-campaign-stages/active")
    }catch(error:any){
      return thunkAPI.rejectWithValue(getReduxErrorMsg(error));
    }
  }
)

export const GetCampaignStagesByID = createAsyncThunk(
  'GetCampaignStagesByID',
  async(slug :string,thunkAPI) =>{
    try{
      return await dataService.getData(`/voting-campaign-stages/${slug}`)
    }catch(error:any){
      return thunkAPI.rejectWithValue(getReduxErrorMsg(error))
    }
  }
)

export const GetCandidatesByVotingStages = createAsyncThunk(
  'GetCandidatesByVotingStages',
  async(slug:string,thunkAPI) => {
    try{
      return await dataService.getData(`/candidates/voting-campaigns-stages/${slug}`)
    }catch(error:any){
      return thunkAPI.rejectWithValue(getReduxErrorMsg(error));
    }
  }
)

export const GetVotingStagesByVotingCampaignID = createAsyncThunk(
  'GetVotingStagesByVotingCampaignID',
  async(id:string,thunkAPI) => {
    try{
      return await dataService.getData(`/voting-campaign-stages/voting-campaigns/${id}`)
    }catch(error:any){
      return thunkAPI.rejectWithValue(getReduxErrorMsg(error));
    }
  }
)