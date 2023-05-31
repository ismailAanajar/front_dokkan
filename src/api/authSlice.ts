import axios from 'axios';

import {
  closeModal,
  openModal,
} from '@dokkan/api/modalSlice';
import {
  getUser,
  setCheckoutStep,
} from '@dokkan/api/userSlice';
import {
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';

import customAxios from './';

export const externalSignIn = createAsyncThunk('auth/externalLogin', async ({id, email}:{id: string; email: string}, {dispatch, rejectWithValue}) => {
 try {
    await axios.get("http://localhost:8000/sanctum/csrf-cookie");
   const resp = await customAxios.post<{token: string}>('auth/login-as-user', {id, email,})
   //@ts-ignore
   if (resp.data?.token) {
     dispatch(closeModal())  
     dispatch(setCheckoutStep('details')) 
     localStorage.setItem('token', resp.data.token);
     await dispatch(getUser())
   } 
   return resp.data.token;
 } catch (error) {
   rejectWithValue(error)
 }
  
})
export const signIn = createAsyncThunk('auth/singIn', async ({data }:{data:{email:string, password: string, remember:boolean}}, {dispatch, rejectWithValue}) => {
 try {
    await axios.get("http://localhost:8000/sanctum/csrf-cookie");
   const resp = await customAxios.post<{token: string}>('auth/login', data)
   //@ts-ignore
   if (resp.data?.token) {
     dispatch(closeModal())  
     dispatch(setCheckoutStep('details')) 
     localStorage.setItem('token', resp.data.token);
     await dispatch(getUser())
   } 
   return resp.data.token;
 } catch (error) {
   rejectWithValue(error)
 }
  
})
export const signUp = createAsyncThunk('auth/signUp', async ({data, action}:{data:{email:string, password: string, remember:boolean}, action?: () => void}, {rejectWithValue}) => {
  try {
    const resp = await customAxios.post('auth/register', data)
    return resp.data.message
  } catch (error) {
    return rejectWithValue(error)
  }
  
   
})
export const userActivation = createAsyncThunk('auth/user_activation', async ({token }:{token:string}, {rejectWithValue, dispatch}) => {
  try {
    const resp = await customAxios.post('auth/verify_email', {token})
    dispatch(openModal({text: 'Your email has been verified successfully'}))
    return resp.data.message
  } catch (error) {
    return rejectWithValue(error)
  }
  
   
})

export const forgetPassword = createAsyncThunk('auth/forget_password', async ({data, action}:{data:{email:string}, action: () => void}, {dispatch}) => {
  console.log(data);
   
})

export const checkResetToken = createAsyncThunk('auth/check_reset-token', async ({data, action}:{data:{token:string | string[]},action?: () => void}, {rejectWithValue}) => {
    await new Promise(resolve => {
    setTimeout(() => {
      resolve('jjj')
    }, 7000);
})

  return 'fff'
   
})
export const resetPassword = createAsyncThunk('auth/reset_password', async ({data, action}:{data:{password:string , password_confirmation: string}, action?: () => void}, {dispatch}) => {
  console.log(data);
   
})

export const logout = createAsyncThunk('auth/logout', async (_, {rejectWithValue}) => {
  
  try {
    await customAxios.post('auth/logout');  
  } catch (error) {
    rejectWithValue('log out val')
  }
   
})


type State = {
  loading: boolean;
  token: string | null | undefined;
  checkResetTokenLoading: boolean; 
  error: any;
  hadRegister: string
} 

const initialState:State = {
  loading: false,
  token: null,
  checkResetTokenLoading: true,
  error: null,
  hadRegister: ''
}

const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers:{
    clearToken: (state) => {
      state.token = null
    }
  },
  extraReducers: builder => {
    /**** Sign in */
    builder.addCase(signIn.pending, state => {
      state.loading = true
    })
    builder.addCase(signIn.fulfilled, (state, {payload}) => {
      state.loading = false;
      state.token = payload
    })
    builder.addCase(signIn.rejected, (state, {payload}:any) => {
      state.loading = false;
      state.error = payload.error
    })
    /**** Sign in */
    
    /**** Sign up */
    builder.addCase(signUp.pending, state => {
      state.loading = true
    })
    builder.addCase(signUp.fulfilled, (state, {payload}) => {
      state.loading = false
      state.hadRegister = payload
    })
    builder.addCase(signUp.rejected, (state, {payload}:any) => {
      state.loading = false;
      state.error = payload.error
    })
    /**** Sign up */

    /**** forget password */
    builder.addCase(forgetPassword.pending, state => {
      state.loading = true
    })
    builder.addCase(forgetPassword.fulfilled, state => {
      state.loading = false
    })
    builder.addCase(forgetPassword.rejected, (state, {payload}:any) => {
      state.loading = false;
      state.error = payload.error
    })
    /**** forget password */

    /**** check reset password token */
    builder.addCase(checkResetToken.pending, state => {
      state.checkResetTokenLoading = true
    })
    builder.addCase(checkResetToken.fulfilled, state => {
      state.checkResetTokenLoading = false
    })
    builder.addCase(checkResetToken.rejected, (state, {payload}:any) => {
      console.log({payload});
      
      state.checkResetTokenLoading = false;
      state.error = payload.error
    })
    /**** check reset password  */

    /**** reset password */
    builder.addCase(resetPassword.pending, state => {
      state.loading = true
    })
    builder.addCase(resetPassword.fulfilled, state => {
      state.loading = false
    })
    builder.addCase(resetPassword.rejected, (state, {payload}:any) => {
      state.loading = false;
      state.error = payload.error
    })
    /**** reset password */

    /**** logout */
    builder.addCase(logout.pending, state => {
      state.loading = true
    })
    builder.addCase(logout.fulfilled, state => {
      state.loading = false
    })
    builder.addCase(logout.rejected, (state, {payload}:any) => {
      state.loading = false;
      state.error = payload.error
    })
    /**** logout */
  }
})

export default authSlice.reducer;