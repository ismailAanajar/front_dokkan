import {
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';

export const addReview = createAsyncThunk('add-review', async (data:{productId: number; review: string, rate: number}, {rejectWithValue}) => {
  
})

type State = {
  loading: boolean;
  error: any
}
const initialState: State = {
  loading: false,
  error: null
}

const reviewSlice = createSlice({
  name: 'review',
  initialState,
  reducers:{},
  extraReducers: builder => {
    builder.addCase(addReview.pending, state => {
      state.loading = true;
    })
    builder.addCase(addReview.fulfilled, state => {
      state.loading = false;
    })
    builder.addCase(addReview.rejected, (state, {payload}:any) => {
      state.loading = false;
      state.error = payload.error
    })
  } 
})

export default reviewSlice.reducer;
