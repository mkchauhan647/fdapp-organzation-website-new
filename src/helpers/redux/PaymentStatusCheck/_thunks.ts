

import { dataService } from "@/utils/data/api/dataServices";
import { getReduxErrorMsg } from "@/utils/methods/reduxMethods";
import { createAsyncThunk } from "@reduxjs/toolkit";



export const GetTransactionDetails = createAsyncThunk(
    'GetUserTransactionDetails',
    async(npsMerchantTxnId :string,thunkAPI) => {
      try{
        return await dataService.getData(`/check-payment-status?npsMerchantTxnId=${npsMerchantTxnId}`)
      }catch(error:any){
        return thunkAPI.rejectWithValue(getReduxErrorMsg(error));
      }
    }
  )