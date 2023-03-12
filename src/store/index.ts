import {
  TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from 'react-redux';

import {
  auth,
  modal,
  user,
} from '@dokkan/api';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    user,
    modal,
    auth
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

// app/hooks.ts


// import type { RootState, AppDispatch } from './store'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector