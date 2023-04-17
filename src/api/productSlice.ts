import {
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';

import { Product } from './types';

export const getProducts = createAsyncThunk('get-products', async (filter:{category?: number; brand?: string, price_from?: number} | undefined, {rejectWithValue}) => {
  console.log(filter);

  return []
  
})
export const addReview = createAsyncThunk('add-review', async (data:{productId: number; review: string, rate: number}, {rejectWithValue}) => {
  console.log(data);
  
})
export const addToCart = createAsyncThunk('add-to-cart', async (data:{productId: number}, {rejectWithValue}) => {
  console.log(data);
  
})
export const removeFromCart = createAsyncThunk('remove-from-cart', async (data:{productId: number}, {rejectWithValue}) => {
  console.log(data);
  
})
export const addToWishlist = createAsyncThunk('add-to-wishlist', async (data:{productId: number}, {rejectWithValue}) => {
  console.log(data);
  
})
export const removeFromWishlist = createAsyncThunk('add-to-wishlist', async (data:{productId: number}, {rejectWithValue}) => {
  console.log(data);
  
})

type State = {
  products: Product[];
  loading: boolean;
  error: any
}
const initialState: State = {
  products: [],
  loading: false,
  error: null
}

const productSlice = createSlice({
  name: 'review',
  initialState,
  reducers:{},
  extraReducers: builder => {
    builder.addCase(getProducts.pending, state => {
      state.loading = true;
    })
    builder.addCase(getProducts.fulfilled, (state, {payload}:any) => {
      state.loading = false;
      state.products = payload
    })
    builder.addCase(getProducts.rejected, (state, {payload}:any) => {
      state.loading = false;
      state.error = payload.error
    })
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

export default productSlice.reducer;
