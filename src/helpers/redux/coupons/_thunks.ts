

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
 * App Data , includes all coupons according to voting campaign , coupons by id
 **/


export const GetCouponsByID = createAsyncThunk(
  'GetCouponsByID',
  async(slug :string,thunkAPI) =>{
    try{
      return await dataService.getData(`/coupons/${slug}`)
    }catch(error:any){
      return thunkAPI.rejectWithValue(getReduxErrorMsg(error))
    }
  }
)



export const GetCouponsByVotingCampaignID = createAsyncThunk(
  'GetVotingStagesByVotingCampaignID',
  async(slug : string,thunkAPI) => {
    try{
      return await dataService.getData(`/coupons/voting-campaigns/${slug}`)
    }catch(error:any){
      return thunkAPI.rejectWithValue(getReduxErrorMsg(error));
    }
  }
)