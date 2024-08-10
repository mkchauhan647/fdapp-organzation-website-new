

import { dataService } from "@/utils/data/api/dataServices";
import { getReduxErrorMsg } from "@/utils/methods/reduxMethods";
import { createAsyncThunk } from "@reduxjs/toolkit";



export const GetTransactionDetails = createAsyncThunk(
    'GetUserTransactionDetails',
    async(npsMerchantTxnId :string,thunkAPI) => {
      try{
        const res =  await dataService.getData(`/nps/check-payment-status?npsMerchantTxnId=${npsMerchantTxnId}`)
        return res.data;

      }catch(error:any){
        return thunkAPI.rejectWithValue(getReduxErrorMsg(error));
      }
    }
  )