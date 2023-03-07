import { createSlice } from '@reduxjs/toolkit';

type UserState = {
  name: string | null
}

const initialState: UserState = {
  name: null
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {

  }
})


export default userSlice.reducer;
export const  {} = userSlice.actions 