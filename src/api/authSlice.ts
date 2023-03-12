import {
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';

export const singIn = createAsyncThunk('auth/singIn', async (values:{email:string, password: string, remember:boolean}, {dispatch}) => {
  console.log(values);
   
})
export const signUp = createAsyncThunk('auth/signUp', async (values:{email:string, password: string, remember:boolean}, {dispatch}) => {
  console.log(values);
   
})


type State = {
  loading: boolean
} 

const initialState:State = {
  loading: false
}

const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers:{},
  extraReducers: {}
})

export default authSlice.reducer;