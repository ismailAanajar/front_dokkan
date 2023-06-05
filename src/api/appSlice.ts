import {
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';

import customAxios from './';

type State = {
  loading: boolean;
  template: any;
  forms: any;
  translate: any,
  error: any
}

export const getAppConfig = createAsyncThunk('appConfig', async ({locale}: {locale?:string},{rejectWithValue}) => {
  // const {locale:l} = useRouter();

  try {
    const config = await customAxios.get('app/config');
    return config.data;
    
  } catch (error:any) {
    return rejectWithValue(error?.message);
  }
})

const initialState: State = {
  loading: false,
  template: null,
  forms: null,
  translate: null,
  error: null
}

const appSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = false
    }
  },
  extraReducers: builder => {
    builder
      .addCase(getAppConfig.pending, state => {
        state.loading = true;
      })
      .addCase(getAppConfig.fulfilled, (state, {payload}:any) => {
        
        state.template = payload.template
        state.forms = payload.forms
        state.translate = payload.translate
      })
      .addCase(getAppConfig.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  }
})


export default appSlice.reducer;
export const  {setLoading} = appSlice.actions 