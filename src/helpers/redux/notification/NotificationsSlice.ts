import { createSlice } from "@reduxjs/toolkit";
import  {
   GetNotifications
} from "./_thunks"


const initialState : any =  {
  all_notifications_data : null
}

export const NotificationsSlice = createSlice({
  name : 'voting-app/NotificationsSlice',
  initialState,
  reducers :{
    addVoting : (state , action) => {
      state.all_notifications_data = action.payload;
    }
  },
  extraReducers:(builder)=> {
    builder

    // Get all notifications
    // 
    .addCase(GetNotifications.pending, (state) => {
      state.all_notifications_data.isPending = true;
      state.all_notifications_data.isFulfilled = false;
      state.all_notifications_data.isRejected = false;
    })

    .addCase(GetNotifications.fulfilled, (state , action) => {
      state.all_notifications_data.isPending = false;
      state.all_notifications_data.isFulfilled = true;
      state.all_notifications_data.isRejected = false;

      //send response
      state.all_notifications_data.fulfilledResponse = action.payload;

    })

    .addCase(GetNotifications.rejected, (state , action) => {
      state.all_notifications_data.isPending = false;
      state.all_notifications_data.isFulfilled = false;
      state.all_notifications_data.isRejected = true;

      //send response
      state.all_notifications_data.errorResponse = action.payload;

    })
  },
})

