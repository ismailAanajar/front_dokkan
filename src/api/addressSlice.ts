import {
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';

export const addAddress = createAsyncThunk('add-address', async ({type, data}:{type: 'shipping' | 'belling', data: any}, {rejectWithValue}) => {
  console.log({type, data});
  
})
export const setAddressAsPrimary = createAsyncThunk('set-address-as-primary', async (id:number, {rejectWithValue}) => {
  console.log({id});
  
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
