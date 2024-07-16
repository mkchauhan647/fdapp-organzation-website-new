import { createSlice } from "@reduxjs/toolkit";
import {
  GetAllNews
}from "./_thunks"



const initialState : any =  {
  all_news_data:{},
  
  // non-api data
  current_selected_news_data : {}
}

export const NewsSlice = createSlice({
  name:'voting-app/newsSlice',
  initialState,
  reducers : {
    setCurrentSelectNews : (state , action) =>{
      state.current_selected_news_data =  action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      
    // Get all news
    // 
    .addCase(GetAllNews.pending, (state) => {
      state.all_news_data.isPending = true;
      state.all_news_data.isFulfilled = false;
      state.all_news_data.isRejected = false;
    })

    .addCase(GetAllNews.fulfilled, (state , action) => {
      state.all_news_data.isPending = false;
      state.all_news_data.isFulfilled = true;
      state.all_news_data.isRejected = false;

      //send response
      state.all_news_data.fulfilledResponse = action.payload;

    })

    .addCase(GetAllNews.rejected, (state , action) => {
      state.all_news_data.isPending = false;
      state.all_news_data.isFulfilled = false;
      state.all_news_data.isRejected = true;

      //send response
      state.all_news_data.errorResponse = action.payload;

    })
  },

  
})