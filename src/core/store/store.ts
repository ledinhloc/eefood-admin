import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import uiReducer from './slices/uiSlice.ts';
import authReducer from '@/features/auth/slices/authSlice.ts';
import postReducer from '@/features/posts/slices/postSlice';
import { api } from '../api/api';
export const store = configureStore({
  reducer: {
    ui: uiReducer,
    auth: authReducer,
    post: postReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;