

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
 * App Data , includes all campaign , candidates by id ,candidates by voting campaign
 *
 **/

export const GetAllCandidates = createAsyncThunk(
  'GetAllCandidatesThunk',
  async(_,thunkAPI) => {
    try{
      return await dataService.getData("/candidates")
    }catch(error:any){
      return thunkAPI.rejectWithValue(getReduxErrorMsg(error))
    }
  }
)


export const GetCandidatesByID = createAsyncThunk(
  'GetCandidatesByID',
  async(slug :string,thunkAPI) =>{
    try{
      return await dataService.getData(`/candidates/${slug}`)
    }catch(error:any){
      return thunkAPI.rejectWithValue(getReduxErrorMsg(error))
    }
  }
)

export const GetCandidatesByVotingCamapign = createAsyncThunk(
  'GetCandidatesByVotingCamapign',
  async(slug :string,thunkAPI) => {
    try{
      return await dataService.getData(`/candidates/voting-campaigns/${slug}`)
    }catch(error:any){
      return thunkAPI.rejectWithValue(getReduxErrorMsg(error));
    }
  }
)
