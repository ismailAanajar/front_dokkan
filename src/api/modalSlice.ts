import { createSlice } from '@reduxjs/toolkit';

import { components } from '../components/Modal/index';

type State = {
  isOpen: boolean;
  ComponentName:  keyof typeof components | null  
}

const initialState: State = {
  isOpen: false,
  ComponentName: null
}


const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, {payload}:{payload:{name: keyof typeof components}}) => {
      state.isOpen = true;
      state.ComponentName = payload.name;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.ComponentName = null
    }
  }
})

export default modalSlice.reducer;
export const {openModal, closeModal } = modalSlice.actions;
