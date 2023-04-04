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
          orders: [
            {
              id: 1,
              number: 20230001,
              status: 'dispatched',
              created_at: '11/5/2022',
              total: 135,
              payment_method: 'vida card',
              products: [
                {
                  id: 1,
                  title: 'product product product 1',
                  image: require('@dokkan/assets/images/product9.jpg').default.src,
                  quantity: 12,
                  price: 10
                },
                {
                  id: 2,
                  title: 'product product product 1',
                  image: require('@dokkan/assets/images/product9.jpg').default.src,
                  quantity: 12,
                  price: 10
                },
              ],
              address: {
                shipping: {
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
                belling: {
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
              }
            },
            {
              id: 2,
              number: 20230002,
              status: 'pending',
              created_at: '11/5/2022',
              total: 135,
              payment_method: 'score',
              products: [
                {
                  id: 1,
                  title: 'product product product 1',
                  image: require('@dokkan/assets/images/product9.jpg').default.src,
                  quantity: 22,
                  price: 220
                }
              ],
              address: {
                shipping: {
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
                belling: {
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
              }
            },
            {
              id: 3,
              number: 20230331,
              status: 'delivered',
              created_at: '11/5/2022',
              total: 135,
              payment_method: 'vida card',
              products: [
                {
                  id: 1,
                  title: 'product product product 1',
                  image: require('@dokkan/assets/images/product9.jpg').default.src,
                  quantity: 2,
                  price: 120
                }
              ],
              address: {
                shipping: {
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
                belling: {
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
              }
            },
          ],
          addresses: {
            shipping: [
              {
                id:1,
                first_name: 'ismail',
                last_name: 'anajar',
                email: 'ismail@gmail.com',
                phone: '5448424132',
                country: 'country1',
                city: 'agadir',
                postal_code: 45455,
                address_1: 'address1',
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
                address_1: 'address1',
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
                address_1: 'address1',
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
  checkoutStep: string;
  userInfo: UserInfo
}

const initialState:State  = {
  loading: false,
  checkoutStep: 'cart',
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
    setCheckoutStep: (state, {payload}) => {
      state.checkoutStep = payload
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
export const  {setCheckoutStep} = userSlice.actions 