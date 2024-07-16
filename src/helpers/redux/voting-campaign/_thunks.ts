

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
 * App Data , includes all campaign , upcomming campaign and campaign by id
 *
 **/

export const GetAllCampaigns = createAsyncThunk(
  'GetAllCampaignsThunk',
  async(_,thunkAPI) => {
    try{
      return await dataService.getData("/voting-campaign")
    }catch(error:any){
      return thunkAPI.rejectWithValue(getReduxErrorMsg(error))
    }
  }
)

export const GetUpcommingCampaign = createAsyncThunk(
  'GetUpcommingCampaign',
  async(_,thunkAPI) => {
    try{
      return await dataService.getData("/voting-campaign/upcomming")
    }catch(error:any){
      return thunkAPI.rejectWithValue(getReduxErrorMsg(error));
    }
  }
)

export const GetCampaignByID = createAsyncThunk(
  'GetCampaignByID',
  async(slug : string,thunkAPI) =>{
    try{
      return await dataService.getData(`/voting-campaign/${slug}`)
    }catch(error:any){
      return thunkAPI.rejectWithValue(getReduxErrorMsg(error))
    }
  }
)

export const GetRecentlyFinishedCampaigns = createAsyncThunk(
  'GetRecentlyFinishedCampaigns',
  async(_,thunkAPI) =>{
    try{
      return await dataService.getData(`/voting-campaign/recently-finished`)
    }catch(error:any){
      return thunkAPI.rejectWithValue(getReduxErrorMsg(error))
    }
  }
)
