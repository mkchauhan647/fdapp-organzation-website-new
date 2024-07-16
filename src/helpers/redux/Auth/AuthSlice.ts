import { createSlice } from "@reduxjs/toolkit";

const initialState : any = {
  token : null,
  user : null,
  expire : null,
  x_api_key : null,
  reset_password_token : null
}

export const AuthSlice  = createSlice(
  {
    name:"voting-app/user-auth",
    initialState,
    reducers:{
      login: (state, action) => {
        const { token, user } = action.payload;
        if (token && user) {
          state.token = token;
          state.user = user;
          state.expire = new Date(new Date().getTime() + 100000).toISOString()
        } 
      },
      setXApiKey : (state , action) => {
        const {x_api_key} = action.payload;
        state.x_api_key = x_api_key;
      },
      logout:(state)=>{
        state.token = null,
        state.user = null,
        state.x_api_key = null
      },
      setResetPasswordToken : (state , action) => {
        state.reset_password_token = action.payload
      },
      removeResetPasswordToken : (state) => {
        state.reset_password_token = null
      }
    }
  }
)