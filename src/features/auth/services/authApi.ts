import { api } from '@/core/api/api';
import type {
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
  VerifyOtpRequest,
  VerifyOtpResponse,
} from '@/features/auth/types/auth.types';

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // Đăng nhập
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        data: credentials,
      }),
    }),

    register: builder.mutation<RegisterResponse, RegisterRequest>({
      query: (userData) => ({
        url: '/auth/register',
        method: 'POST',
        data: userData,
      }),
    }),

    verifyOtp: builder.mutation<VerifyOtpResponse, VerifyOtpRequest>({
      query: (otpData) => ({
        url: '/auth/verify-otp',
        method: 'POST',
        data: otpData,
      }),
    }),

    // Forgot password
    forgotPassword: builder.mutation<
      ForgotPasswordResponse,
      ForgotPasswordRequest
    >({
      query: (emailData) => ({
        url: '/auth/forgot-password/request',
        method: 'POST',
        data: emailData,
      }),
    }),
    resetPassword: builder.mutation<
      ResetPasswordResponse,
      ResetPasswordRequest
    >({
      query: (data) => ({
        url: '/auth/forgot-password/reset',
        method: 'POST',
        data: data,
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useVerifyOtpMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = authApi;
