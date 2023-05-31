import {
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';

import customAxios from './';
import { UserInfo } from './types';

export const getUser = createAsyncThunk('getUser', async (_,{rejectWithValue}) => {

  const user = await customAxios.get('profile');

   return user.data.userInfo as UserInfo; 
})

type State = {
  loading: boolean;
  checkoutStep: string;
  userInfo: UserInfo
}

const initialState:State  = {
  loading: false,
  checkoutStep: 'cart',
  userInfo: {
    id: null,
    email: null,
    name: '',
    first_name: '',
    last_name: '',
    image: '',
    cart: {
      total: null,
      items: []
    },
    wishlist: [],
    orders: [],
    addresses: {
      shipping: [],
      billing: [],
    }
  }
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCheckoutStep: (state, {payload}) => {
      state.checkoutStep = payload
    },
    clearUser: (state) => {
      state.userInfo = {
            id: null,
            email: null,
            name: '',
            first_name: '',
            last_name: '',
            image: '',
            cart: {
              total: null,
              items: []
            },
            wishlist: [],
            orders: [],
            addresses: {
              shipping: [],
              billing: [],
            }
      }
    }
  },
  extraReducers: builder => {
    builder
      .addCase(getUser.pending, state => {
        state.loading = true;
      })
      .addCase(getUser.fulfilled, (state, {payload}) => {
        
        state.userInfo = payload
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loading = false
      })
  }
})


export default userSlice.reducer;
export const  {setCheckoutStep, clearUser} = userSlice.actions 