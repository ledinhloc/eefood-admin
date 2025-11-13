import { api } from '@/core/api/api';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { AuthState, User } from '../types/auth.types';
import { normalizeGender } from '@/utils/normalizeGender.ts';

// Helper function: lấy user từ local hoặc session
const getUserFromStorage = (): User | null => {
  const userStr =
    localStorage.getItem('user') || sessionStorage.getItem('user');
  try {
    return userStr ? JSON.parse(userStr) : null;
  } catch {
    return null;
  }
};

// Helper function: lấy token từ storage
const getToken = (key: string): string | null => {
  return localStorage.getItem(key) || sessionStorage.getItem(key);
};

// Initial state
const initialState: AuthState = {
  user: getUserFromStorage(),
  accessToken: getToken('accessToken'),
  refreshToken: getToken('refreshToken'),
  isAuthenticated: Boolean(getToken('accessToken')),
  email: null,
  otpType: null,
  otpCode: '',
  isLoading: false,
  error: null,
};

// Slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{
        user: User;
        accessToken: string;
        refreshToken: string;
        rememberMe?: boolean;
      }>
    ) => {
      const {
        user,
        accessToken,
        refreshToken,
        rememberMe = false,
      } = action.payload;
      state.user = user;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.isAuthenticated = true;
      state.error = null;

      localStorage.setItem('rememberMe', String(rememberMe));

      // Nếu rememberMe → lưu vào localStorage, ngược lại lưu vào sessionStorage
      const storage = rememberMe ? localStorage : sessionStorage;
      const tempStorage = rememberMe ? sessionStorage : localStorage;

      storage.setItem('accessToken', accessToken);
      storage.setItem('refreshToken', refreshToken);
      storage.setItem('user', JSON.stringify(user));

      // Xóa bản cũ khỏi storage kia
      tempStorage.removeItem('accessToken');
      tempStorage.removeItem('refreshToken');
      tempStorage.removeItem('user');
    },

    // Cập nhật user
    setUser: (state, action: PayloadAction<User>) => {
       const normalizedUser = {
         ...action.payload,
         gender: normalizeGender(action.payload.gender),
       };
       state.user = normalizedUser;

      if (localStorage.getItem('user')) {
        localStorage.setItem('user', JSON.stringify(action.payload));
      } else {
        sessionStorage.setItem('user', JSON.stringify(action.payload));
      }
    },

    // Đăng xuất
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      state.error = null;

      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
      sessionStorage.removeItem('accessToken');
      sessionStorage.removeItem('refreshToken');
      sessionStorage.removeItem('user');
    },

    // Loading & error handling
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    clearError: (state) => {
      state.error = null;
    },

    // Cập nhật token mới (ví dụ khi refreshToken được dùng)
    updateAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
      if (localStorage.getItem('accessToken')) {
        localStorage.setItem('accessToken', action.payload);
      } else {
        sessionStorage.setItem('accessToken', action.payload);
      }
    },
    updateRefreshToken: (state, action: PayloadAction<string>) => {
      state.refreshToken = action.payload;
      if (localStorage.getItem('refreshToken')) {
        localStorage.setItem('refreshToken', action.payload);
      } else {
        sessionStorage.setItem('refreshToken', action.payload);
      }
    },
    setOtpData: (
      state,
      action: PayloadAction<{
        email?: string | null;
        otpCode?: string | null;
        otpType?: 'REGISTER' | 'FORGOT_PASSWORD' | null;
      }>
    ) => {
      const { email, otpCode, otpType } = action.payload;
      if (email !== undefined) state.email = email;
      if (otpCode !== undefined) state.otpCode = otpCode;
      if (otpType !== undefined) state.otpType = otpType;
    },
    clearOtpData: (state) => {
      state.otpCode = null;
      state.otpType = null;
      state.email = null;
    },
  },
});

export const {
  setCredentials,
  setUser,
  logout,
  setLoading,
  setError,
  clearError,
  updateAccessToken,
  updateRefreshToken,
  setOtpData,
  clearOtpData,
} = authSlice.actions;

// Reset API cache
export const resetApiState = api.util.resetApiState;

export default authSlice.reducer;
