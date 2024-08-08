import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GetAllJudgesUsingCampaignId } from './_thunks';
import { Judge } from '@/utils/schema/ApiInterface';

const initialState: any = {
  judges: [],
  loading: false,
  error: null,
  current_selected_Judges_data: {},
  Judges_by_campaign_data: {},
};

export const judgesSlice = createSlice({
  name: 'judges',
  initialState,
  reducers: {
    setCurrentJudges: (state, action) => {
      state.current_selected_Judges_data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(GetAllJudgesUsingCampaignId.pending, (state) => {
        state.Judges_by_campaign_data.isPending = true;
        state.Judges_by_campaign_data.isFulfilled = false;
        state.Judges_by_campaign_data.isRejected = false;
        state.Judges_by_campaign_data.data = [];
      })
      .addCase(GetAllJudgesUsingCampaignId.fulfilled, (state, action) => {
        state.Judges_by_campaign_data.isFulfilled = true;
        state.Judges_by_campaign_data.isPending = false;
        state.Judges_by_campaign_data.isRejected = false;
        state.Judges_by_campaign_data.fulfilledResponse = action.payload;
      })
      .addCase(GetAllJudgesUsingCampaignId.rejected, (state, action) => {
        state.Judges_by_campaign_data.isPending = false;
        state.Judges_by_campaign_data.isFulfilled = false;
        state.Judges_by_campaign_data.isRejected = true;
        state.Judges_by_campaign_data.error = action.payload;
      });
  },
});

export default judgesSlice.reducer;
