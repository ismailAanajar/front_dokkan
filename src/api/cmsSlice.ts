import { createSlice } from '@reduxjs/toolkit';

type State = {
  c;s
  } | null; 
}

const initialState: State = {
  isOpen: false,
  content: {
    comp: null,
    text: null,
    props: null
  }
}


const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, {payload}:{payload:{comp?: keyof typeof components, text?: string  | null, props?: any}}) => {
      state.isOpen = true;
      state.content = payload;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.content = null
    }
  }
})

export default modalSlice.reducer;
export const {openModal, closeModal } = modalSlice.actions;
