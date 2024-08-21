import { dataService } from "@/utils/data/api/dataServices";
import { getReduxErrorMsg } from "@/utils/methods/reduxMethods";
import { createAsyncThunk } from "@reduxjs/toolkit";

/**
 * @Title
 * Get all sponsors data
 *
 * @API
 * Process.env.NEXT_PUBLIC_VOTING_API
 *
 * @Description
 * Fetches all sponsors from the API
 **/

export const GetAllSponsers = createAsyncThunk(
  'sponsors/getAll',
  async (_, thunkAPI) => {
    try {
      const res = await dataService.getData("/sponsers");
      console.log("Sponsor data: ", res);
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(getReduxErrorMsg(error));
    }
  }
);
