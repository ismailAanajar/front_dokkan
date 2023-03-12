import {
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';

export const signIn = createAsyncThunk('auth/singIn', async (values:{email:string, password: string, remember:boolean}, {dispatch}) => {
  console.log(values);
   
})
export const signUp = createAsyncThunk('auth/signUp', async (values:{email:string, password: string, remember:boolean}, {dispatch}) => {
  console.log(values);
   
})
export const forgetPassword = createAsyncThunk('auth/forget_password', async (values:{email:string}, {dispatch}) => {
  console.log(values);
   
})
export const checkResetToken = createAsyncThunk('auth/check_reset-token', async (token:string | string[], {dispatch}) => {
  console.log(token);
   
})
export const resetPassword = createAsyncThunk('auth/reset_password', async (values:{password:string , password_confirmation: string}, {dispatch}) => {
  console.log(values);
   
})


type State = {
  loading: boolean;
  error: any
} 

const initialState:State = {
  loading: false,
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
    builder.addCase(signIn.fulfilled, state => {
      state.loading = false
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

    /**** reset password */
    builder.addCase(checkResetToken.pending, state => {
      state.loading = true
    })
    builder.addCase(checkResetToken.fulfilled, state => {
      state.loading = false
    })
    builder.addCase(checkResetToken.rejected, (state, {payload}:any) => {
      state.loading = false;
      state.error = payload.error
    })
    /**** reset password */

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