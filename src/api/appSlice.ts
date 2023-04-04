import {
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';

type State = {
  loading: boolean;
  template: any;
  forms: any
}

export const getAppConfig = createAsyncThunk('appConfig', async (_,{rejectWithValue}) => {
   const data = new Promise(resolve => {
      setTimeout(() => {
        resolve({ template: {
            '--color-primary': '#ff1d52',
            '--color-primary-light': '#ffe1e6',
            '--color-secondary': '#0f3460',
          },
          forms: {
            login: [
                  {
                    id:1,
                    label: 'email',
                    name: 'email',
                    type: 'email',
                    icon: 'Envelope',
                    require: true
                  },
                  {
                    id:2,
                    label: 'password',
                    name: 'password',
                    type: 'password',
                    icon: 'Lock',
                    require: true
                  },
                  {
                    id:3,
                    label: 'remember',
                    name: 'remember',
                    type: 'checkbox',
                  },
            ],
            register: [
              {
                id:1,
                label: 'full name',
                name: 'fullName',
                type: 'text',
                icon: 'User',
                require: true
              },
              {
                id:2,
                label: 'email',
                name: 'email',
                type: 'email',
                icon: 'Envelope',
                require: true
              },
              {
                id:6,
                label: 'phone',
                name: 'phone',
                type: 'text',
                icon: 'Envelope',
                require: true
              },
              {
                id:3,
                label: 'password',
                name: 'password',
                type: 'password',
                icon: 'Lock',
                require: true
              },
              {
                id:4,
                name: 'password_confirmation',
                label: 'confirm password',
                type: 'password',
                icon: 'Lock',
                require: true
              },
              {
                id:5,
                label: 'by sign up you are agree to <a href="#">Terms&condition</a>',
                name: 'privacy',
                type: 'checkbox',
                require: true
              },
            ],
            forget: [
              {
                    id:1,
                    label: 'email',
                    name: 'email',
                    type: 'email',
                    icon: 'Envelope',
              },
            ],
            reset: [
              {
                id:1,
                label: 'new password',
                name: 'password',
                type: 'password',
                icon: 'Lock',
              },
              {
                id:2,
                label: 'confirm password',
                name: 'password_confirmation',
                type: 'password',
                icon: 'Lock',
              },
            ],
            addresses: {
              shipping: [
                      {
                        id:1,
                        label: 'first name',
                        name: 'first_name',
                        type: 'text',
                        require: true
                      },
                      {
                        id:21,
                        label: 'last name',
                        name: 'last_name',
                        type: 'text',
                        require: true
                      },
                      {
                        id:32,
                        label: 'email address',
                        name: 'email',
                        type: 'email',
                        require: true
                      },
                      {
                        id:4,
                        label: 'phone number',
                        name: 'phone',
                        type: 'text',
                        require: true
                      },
                      {
                        id:5,
                        label: 'country',
                        name: 'country',
                        type: 'select',
                        require: true
                      },
                      {
                        id:6,
                        label: 'city',
                        name: 'city',
                        type: 'text',
                        require: true
                      },
                      {
                        id:7,
                        label: 'postal_code',
                        name: 'postal_code',
                        type: 'number',
                        require: true
                      },
                      {
                        id:8,
                        label: 'address 1',
                        name: 'address_1',
                        type: 'text',
                      },
                      {
                        id:9,
                        label: 'address 2',
                        name: 'address_2',
                        type: 'text',
                        require: true
                      },
              ], 
              belling: [
                      {
                        id:1,
                        label: 'first name',
                        name: 'first_name',
                        type: 'text',
                        require: true
                      },
                      {
                        id:21,
                        label: 'last name',
                        name: 'last_name',
                        type: 'text',
                        require: true
                      },
                      {
                        id:32,
                        label: 'email address',
                        name: 'email',
                        type: 'email',
                        require: true
                      },
                      {
                        id:4,
                        label: 'phone number',
                        name: 'phone',
                        type: 'text',
                        require: true
                      },
                      {
                        id:5,
                        label: 'country',
                        name: 'country',
                        type: 'select',
                        require: true
                      },
                      {
                        id:6,
                        label: 'city',
                        name: 'city',
                        type: 'text',
                        require: true
                      },
                      {
                        id:7,
                        label: 'postal_code',
                        name: 'postal_code',
                        type: 'number',
                        require: true
                      },
                      {
                        id:8,
                        label: 'address 1',
                        name: 'address_1',
                        type: 'text',
                        require: true
                      },
              ], 
            }
          }
        })
      }, 8000);
    });

   return data; 
})

const initialState: State = {
  loading: false,
  template: null,
  forms: null
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
      })
      // .addCase(getAppConfig.rejected, (state, action) => {
      //   state.loading = false
      // })
  }
})


export default appSlice.reducer;
export const  {setLoading} = appSlice.actions 