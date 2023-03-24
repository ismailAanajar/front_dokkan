import {
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';

import { UserInfo } from './types';

export const getUser = createAsyncThunk('getUser', async (_,{rejectWithValue}) => {
   const data = await new Promise(resolve => {
      setTimeout(() => {
        resolve({
          name: 'ismail anajar',
          cart: [],
          wishlist: [],
          orders: [],
          addresses: {
            shipping: [
              {
                id:1,
                first_name: 'ismail',
                last_name: 'anajar',
                email: 'ismail@gmail.com',
                phone: '5448424132',
                country: 'morocco',
                city: 'agadir',
                postal_code: 45455,
                isPrimary: false
              },
              {
                id:2,
                first_name: 'ismail',
                last_name: 'anajar',
                email: 'ismail@gmail.com',
                phone: '5448424132',
                country: 'morocco',
                city: 'agadir',
                postal_code: 45455,
                isPrimary: true
              },
              {
                id:3,
                first_name: 'ismail',
                last_name: 'anajar',
                email: 'ismail@gmail.com',
                phone: '5448424132',
                country: 'morocco',
                city: 'agadir',
                postal_code: 45455,
                isPrimary: false
              },
            ],
            belling: [
              {
                id: 1,
                first_name: 'ismail',
                last_name: 'anajar',
                email: 'ismail@gmail.com',
                phone: '5448424132',
                country: 'morocco',
                city: 'agadir',
                postal_code: 45455,
                isPrimary: true
              },
            ]
          }
        })
      }, 3000);
    })

   return data as UserInfo; 
})

type State = {
  loading: boolean;
  userInfo: UserInfo
}

const initialState:State  = {
  loading: false,
  userInfo: {
    name: '',
    cart: [],
    wishlist: [],
    orders: [],
    addresses: {
      shipping: [],
      belling: [],
    }
  }
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {

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
export const  {} = userSlice.actions 