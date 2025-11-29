import { api } from '@/core/api/api';
import type {
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  LoginRequest,
  LoginResponse,
  ProfileResponse,
  RefreshTokenRequest,
  RefreshTokenResponse,
  RegisterRequest,
  RegisterResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
  UpdateProfileRequest,
  UpdateProfileResponse,
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
    getProfile: builder.query<ProfileResponse, void>({
      query: () => ({
        url: '/users/me',
        method: 'GET',
      }),
      providesTags: ['Profile'],
    }),
    // Update user profile
    updateProfile: builder.mutation<
      UpdateProfileResponse,
      UpdateProfileRequest
    >({
      query: (profileData) => ({
        url: '/users/update',
        method: 'PUT',
        data: profileData,
      }),
      invalidatesTags: ['Profile'],
    }),
    refreshToken: builder.mutation<RefreshTokenResponse, RefreshTokenRequest>({
      query: (tokenData) => ({
        url: '/auth/refresh',
        method: 'POST',
        data: tokenData,
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
  useGetProfileQuery,
  useUpdateProfileMutation,
  useRefreshTokenMutation
} = authApi;  
