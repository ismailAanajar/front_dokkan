import {
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';

import customAxios from './';
import { Product } from './types';

export const getProducts = createAsyncThunk('get-products', async (filter:{search?: string; category_id?: number; brand_id?: string, price_min?: number, price_max?: number} | undefined, {rejectWithValue}) => {
  const resp = await customAxios.get('/products', {params:filter})

  return resp.data;
  
})
export const addReview = createAsyncThunk('add-review', async (data:{productId: number; review: string, rate: number}, {rejectWithValue}) => {
  console.log(data);
  
})
export const addToCart = createAsyncThunk('add-to-cart', async ({productId, quantity}:{productId: number, quantity?: number}, {rejectWithValue}) => {
  try {
    await customAxios.post('addToCart', {productId, quantity})
  } catch (error) {
   rejectWithValue('add cart error') 
  }
  
})
export const updateCart = createAsyncThunk('update-cart', async ({productId, quantity}:{productId: number, quantity?: number}, {rejectWithValue}) => {
  try {
    await customAxios.post('updateCart', {productId, quantity})
  } catch (error) {
   rejectWithValue('add cart error') 
  }
  
})
export const removeFromCart = createAsyncThunk('remove-from-cart', async ({productId}:{productId: number}, {rejectWithValue}) => {
  
  
})
export const addToWishlist = createAsyncThunk('add-to-wishlist', async ({productId}:{productId: number}, {rejectWithValue}) => {
  try {
    await customAxios.post('addToWishlist', {productId})
  } catch (error) {
    rejectWithValue('wishlist err')
  }
  
})
export const removeFromWishlist = createAsyncThunk('remove-from-wishlist', async ({productId}:{productId: number}, {rejectWithValue}) => {
  
  try {
    await customAxios.post('removeFromWishlist', {productId});
    return ;
  } catch (error) {
    rejectWithValue('remove wishlist')
  }
  
})

type State = {
  data: {
    products:Product[] | null
  } ;
  loading: boolean;
  error: any
}
const initialState: State = {
  data: {
    products: null
  },
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
      state.data = payload
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
