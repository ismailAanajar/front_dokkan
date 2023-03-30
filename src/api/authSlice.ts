import { closeModal } from '@dokkan/api/modalSlice';
import { setCheckoutStep } from '@dokkan/api/userSlice';
import {
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';

export const signIn = createAsyncThunk('auth/singIn', async ({data, action}:{data:{email:string, password: string, remember:boolean}, action?: string}, {dispatch, rejectWithValue}) => {
 try {
   
  if (action) {
    eval(action)()
  }
  console.log({data, action});
  dispatch(closeModal())  
  dispatch(setCheckoutStep('details'))  
 } catch (error) {
   rejectWithValue(error)
 }
  
  return {token: 'lldldldvoifjvfn'}
   
})
export const signUp = createAsyncThunk('auth/signUp', async ({data, action}:{data:{email:string, password: string, remember:boolean}, action?: () => void}, {dispatch}) => {
  console.log(data);
  
   
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


type State = {
  loading: boolean;
  token: string | null;
  checkResetTokenLoading: boolean; 
  error: any
} 

const initialState:State = {
  loading: false,
  token: null,
  checkResetTokenLoading: true,
  error: null
}

const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers:{},
  extraReducers: builder => {
    /**** Sign in */
    builder.addCase(signIn.pending, state => {
      state.loading = true
    })
    builder.addCase(signIn.fulfilled, (state, {payload}) => {
      state.loading = false;
      state.token = payload.token
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
    builder.addCase(signUp.fulfilled, state => {
      state.loading = false
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
  }
})

export default authSlice.reducer;