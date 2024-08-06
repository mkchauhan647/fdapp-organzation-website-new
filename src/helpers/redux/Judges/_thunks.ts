import { dataService } from "@/utils/data/api/dataServices";
import { getReduxErrorMsg } from "@/utils/methods/reduxMethods";
import { createAsyncThunk } from "@reduxjs/toolkit";

/**
 * @Title
 * Get all Judges data
 *
 * @API
 * Process.env.NEXT_PUBLIC_VOTING_API
 *
 * @Description
 * App Data, includes all judges by campaign id
 *
 **/

export const GetAllJudgesUsingCampaignId = createAsyncThunk(
  'judges/getAllJudges',
  async (votingCampaignId:string, thunkAPI) => {
    try {
      const response = await dataService.getData(`judge?votingCampaignId=${votingCampaignId}`);
      return response.data; 
    } catch (error: any) {
      return thunkAPI.rejectWithValue(getReduxErrorMsg(error));
    }
  }
);