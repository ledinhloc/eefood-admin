import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { PostItem, PostQueryParams } from '../types/post.types';

interface PostState {
  currentPost: PostItem | null;
  filters: PostQueryParams;
  isUpdating: boolean;
  error: string | null;
}

const initialState: PostState = {
  currentPost: null,
  filters: {
    page: 1,
    size: 5,
  },
  isUpdating: false,
  error: null,
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setCurrentPost: (state, action: PayloadAction<PostItem | null>) => {
      state.currentPost = action.payload;
    },
    setFilters: (state, action: PayloadAction<PostQueryParams>) => {
      state.filters = action.payload;
    },
    updateFilters: (state, action: PayloadAction<Partial<PostQueryParams>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    setUpdating: (state, action: PayloadAction<boolean>) => {
      state.isUpdating = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    resetFilters: (state) => {
      state.filters = {
        page: 1,
        size: 5,
      };
    },
  },
});

export const {
  setCurrentPost,
  setFilters,
  updateFilters,
  setUpdating,
  setError,
  clearError,
  resetFilters,
} = postSlice.actions;

export default postSlice.reducer;
