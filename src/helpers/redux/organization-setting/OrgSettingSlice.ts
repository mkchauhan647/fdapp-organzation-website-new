import { createSlice } from "@reduxjs/toolkit";
import { GetAllOrgSetting } from "./_thunk";



const initialState : any =  {
  all_org_setting_data : {},

  // non-api data
  current_selected_org_setting : {}
}

export const OrgSettingSlice = createSlice({
  name:'voting-app/couponsSlice',
  initialState,
  reducers : {
    setCurrentSelectOrgSetting : (state , action) =>{
      state.current_selected_org_setting =  action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      
    


    // Get all Org settings
    // 
    .addCase(GetAllOrgSetting.pending, (state) => {
      state.all_org_setting_data.isPending = true;
      state.all_org_setting_data.isFulfilled = false;
      state.all_org_setting_data.isRejected = false;
    })

    .addCase(GetAllOrgSetting.fulfilled, (state , action) => {
      state.all_org_setting_data.isPending = false;
      state.all_org_setting_data.isFulfilled = true;
      state.all_org_setting_data.isRejected = false;

      //send response
      state.all_org_setting_data.fulfilledResponse = action.payload;

    })

    .addCase(GetAllOrgSetting.rejected, (state , action) => {
      state.all_org_setting_data.isPending = false;
      state.all_org_setting_data.isFulfilled = false;
      state.all_org_setting_data.isRejected = true;

      //send response
      state.all_org_setting_data.errorResponse = action.payload;

    })
  },

  
})