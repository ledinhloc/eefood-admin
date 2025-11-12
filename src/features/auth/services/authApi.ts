import { api } from '@/core/api/api';
import type {
  LoginRequest,
  LoginResponse,
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
  }),
  overrideExisting: false,
});

export const { useLoginMutation } = authApi;
