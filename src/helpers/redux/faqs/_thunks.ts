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

export const GetAllFAQ = createAsyncThunk(
  'GetAllFAQThunk',
  async(_,thunkAPI) => {
    try{
      return await dataService.getData("/faq")
    }catch(error:any){
      return thunkAPI.rejectWithValue(getReduxErrorMsg(error))
    }
  }
)