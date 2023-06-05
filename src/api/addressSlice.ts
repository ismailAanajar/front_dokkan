import {
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';

import customAxios from './';
import { getUser } from './userSlice';

export const addAddress = createAsyncThunk('add-address', async ({type, data, action}:{type: 'shipping' | 'billing', data: any, action?: 'create' | 'update'}, {rejectWithValue}) => {
  console.log({type, data, action});
  
})
export const setAddressAsPrimary = createAsyncThunk('set-address-as-primary', async ({id, type}:{id:number; type: 'billing' | 'shipping'}, {rejectWithValue, dispatch}) => {
  try {
    await customAxios.post('address/select', {address_id:id, type})
    dispatch(getUser())
  } catch (error) {
    rejectWithValue(error)
  }
  
})

type State = {
  loading: boolean;
  error: any
}
const initialState: State = {
  loading: false,
  error: null
}

const addAddressSlice = createSlice({
  name: 'review',
  initialState,
  reducers:{},
  extraReducers: builder => {
    builder.addCase(addAddress.pending, state => {
      state.loading = true;
    })
    builder.addCase(addAddress.fulfilled, state => {
      state.loading = false;
    })
    builder.addCase(addAddress.rejected, (state, {payload}:any) => {
      state.loading = false;
      state.error = payload.error
    })
  } 
})

export default addAddressSlice.reducer;
