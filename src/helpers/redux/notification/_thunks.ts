

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
 * App Data , includes all notification by user data
 *
 **/

export const GetNotifications = createAsyncThunk(
  'GetAllNotifications',
  async(token,thunkAPI) =>{
    try{
      return await dataService.getData(`/notification/`)
    }catch(error:any){
      return thunkAPI.rejectWithValue(getReduxErrorMsg(error))
    }
  }
)